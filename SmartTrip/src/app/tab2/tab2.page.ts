import {Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ModalController} from "@ionic/angular";
import { FacilityReviewPage } from "../facility-review/facility-review.page";
import { NavController } from "@ionic/angular";
import { MenuController } from "@ionic/angular";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  markerId:string;
  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  toggled: boolean;
  toast: HTMLIonToastElement;
  toastVisible: boolean = false;
  toastTimeout: any;

  constructor(public zone: NgZone,
              public geolocation: Geolocation,
              private menu: MenuController,
              public modalController: ModalController,
              public navCtrl: NavController,
              private route: ActivatedRoute,
              public http: HttpClient,
              private toastController: ToastController) {
    this.toggled= true;
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];

  }

  async presentToast() {
    if (this.toastVisible) {
      return; // Exit the function if a toast is already visible
    }

    this.toastVisible = true;

    this.toast = await this.toastController.create({
      message: 'Please select the facility you want to go to first.',
      duration: 2000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            this.toastVisible = false; // Reset the flag when toast is closed
          }
        },
      ],
    });
    await this.toast.present();

    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false; // Reset the flag when toast duration expires
    }, this.toast.duration);
  }

  ngOnDestroy() {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout); // Clear the timeout when the component is destroyed
    }
  }

  openNavigation() {
    if(this.facility.latitude == "" && this.facility.longitude == ""){
      this.presentToast();
    }else{
      const url = `https://www.google.com/maps/dir/?api=1&destination=${this.facility.latitude},${this.facility.longitude}`;
      window.open(url, '_system');
    }

  }


  facility: {
    facilityName: string,
    latitude: string,
    longitude: string,
    IsAvm:string,
    userId: string,
    Timestamp: string,
    AdditionalComment: string,
    rating: string,
    comments: string[],
    hasToilet: string,
    hasDisabled: string,
    hasBabycare: string,
    hasMosque: string
  } = {
    facilityName: '',
    latitude: '',
    longitude: '',
    IsAvm:'',
    userId: '',
    Timestamp: '',
    AdditionalComment: '',
    rating: '',
    comments: [],
    hasToilet: '',
    hasDisabled: '',
    hasBabycare: '',
    hasMosque: ''
  };

  ionViewDidEnter(){
    // let infoWindow = new google.maps.InfoWindow({map: map});
    //Set latitude and longitude of some place
    //this.tryGeolocation();
    var mapOptions = {
      zoom: 13,
      center: {lat: 39.8336837, lng: 32.5844109},
      streetViewControl: false,
      disableDefaultUI: true,
      mapId:'558f75b3b5a5e8bd'
    };
    this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);
    this.tryGeolocation();
  }

  tryGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        let pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        let marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          title: 'I am here!',
          icon: {
            url: 'assets/icon/current.png', // Set the path to your icon image
            scaledSize: new google.maps.Size(50, 50) // Set the desired size of the icon
          }
        });

        this.markers.push(marker);
        this.map.setCenter(pos);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }


  updateSearchResults() {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions: any[], status: any) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }
  selectSearchResult(item: { place_id: any; }){
    this.toggled = true;
    this.clearMarkers();
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results:any, status: string) => {
      if(status === 'OK' && results[0]){
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '500',
          types: ['gas_station'],
        }, (near_places:any) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            for (var i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
            }
          });
        })
      }
    })
  }
  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  selectFacility(place:any){
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: place.name,

    });

    this.markers.push(marker);
    this.map.setCenter(place.geometry.location);
    this.zoomToFacility(marker);
  }
  showDefaultBar() {
    this.toggled = false;
  }


  zoomToFacility(marker:any) {
    marker.addListener("click", () => {
      this.onTriggerSheetClick(marker);
      this.map.setZoom(15);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      this.map.setCenter(marker.position as google.maps.LatLng);
    });
  }
  ngAfterViewInit(){

  }

  async onTriggerSheetClick(marker: any) {
    this.facility.facilityName = marker.title;
    this.facility.latitude = String(marker.getPosition()?.lat());
    this.facility.longitude = String(marker.getPosition()?.lng());
    this.facility.IsAvm = "0";
    this.facility.userId = "0";
    this.facility.Timestamp = String(Date.now());
    this.facility.AdditionalComment = "0";
    this.facility.rating = "0";
    this.facility.comments = [""];
    this.facility.hasToilet = "0";
    this.facility.hasDisabled = "0";
    this.facility.hasBabycare = "0";
    this.facility.hasMosque = "0";

    console.log(this.facility.facilityName, this.facility.latitude, this.facility.longitude, this.facility.IsAvm, this.facility.userId, this.facility.Timestamp, this.facility.AdditionalComment, this.facility.rating, this.facility.comments, this.facility.hasToilet, this.facility.hasDisabled, this.facility.hasBabycare, this.facility.hasMosque);
    const modal = await this.modalController.create(
      {
        component: FacilityReviewPage,
        initialBreakpoint: 0.8,
        breakpoints: [0, 0.8],
        cssClass: 'facilityReview',
        componentProps: {
          dataName: this.facility.facilityName,
          dataLatitude: this.facility.latitude,
          dataLongitude: this.facility.longitude
        }
      });

    this.http
      .get(`${environment.serverRoot}/facility/by_geolocation/` + this.facility.latitude + '/' + this.facility.longitude)
      .pipe(take(1))
      .subscribe(
        (response) => {
          const found = response;

          if (found) {
            console.log(this.facility.latitude, this.facility.longitude, ": this facility is already in the dataset");
          }
        },
        (error) => {
          console.log('Error:', error);
          this.http
            .post(`${environment.serverRoot}/facility`, this.facility)
            .pipe(take(1))
            .subscribe(
              (response) => {
                console.log(response);
              },
              (error) => {
                console.log("Error:", error);
                // Handle error accordingly
              }
            );
        }
      );
    await modal.present();
  }

    /*
      async addMarker(lat: any, lng: any){
        if(this.markerId) this.removeMarker();
        this.onTriggerSheetClick();
        this.markerId = await this.map.addMarker({
          coordinate:{
            lat:lat,
            lng:lng,
          },
          draggable:true
        });
      }

      async removeMarker(id?: string) {
        await this.map.removeMarker(id ? id : this.markerId);
      }

      async addListeners() {
        // Handle marker click
        await this.map.setOnMarkerClickListener((event:any) => {
          console.log('setOnMarkerClickListener', event);
          this.removeMarker(event.markerId);
        });

        await this.map.setOnMapClickListener((event:any) => {
          console.log('setOnMapClickListener', event);
          //this.onTriggerSheetClick();
          this.addMarker(event.latitude, event.longitude);
        });
    /!*
        await this.newMap.setOnMyLocationButtonClickListener((event) => {
          console.log('setOnMyLocationButtonClickListener', event);
          this.addMarker(event.mapId, event.mapId);
        });
    *!/
        await this.map.setOnMyLocationClickListener((event:any) => {
          console.log('setOnMyLocationClickListener', event);
          this.addMarker(event.latitude, event.longitude);
        });
      }
    */

  openEnd() {
    this.menu.close();

  }
  goToProfileSetupPage(){
    this.navCtrl.navigateForward(['profile-setup-finalize']);
  }

  public toilet = 'assets/icon/toilet.png';
  public disabled = 'assets/icon/disabled.png';
  public babycare = 'assets/icon/babycare.png';
  public mosque = 'assets/icon/mosque.png';
  selectToilet(){
    if(this.toilet=='assets/icon/toilet.png')
    {
      this.toilet='assets/icon/toiletWhite.png';
    }else{
      this.toilet = 'assets/icon/toilet.png';
    }
  }
  selectDisabled(){
    if(this.disabled=='assets/icon/disabled.png')
    {
      this.disabled='assets/icon/disabledWhite.png';
    }else{
      this.disabled = 'assets/icon/disabled.png';
    }
  }
  selectBabycare(){
    if(this.babycare=='assets/icon/babycare.png')
    {
      this.babycare='assets/icon/babycareWhite.png';
    }else{
      this.babycare = 'assets/icon/babycare.png';
    }
  }
  selectMosque(){
    if(this.mosque=='assets/icon/mosque.png')
    {
      this.mosque='assets/icon/mosqueWhite.png';
    }else{
      this.mosque = 'assets/icon/mosque.png';
    }
  }
}
