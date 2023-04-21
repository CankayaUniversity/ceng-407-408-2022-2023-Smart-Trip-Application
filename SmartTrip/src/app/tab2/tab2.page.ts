import {Component, ElementRef, ViewChild} from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ModalController} from "@ionic/angular";
import { FacilityReviewPage } from "../facility-review/facility-review.page";
import {NavController} from "@ionic/angular";
import { MenuController } from "@ionic/angular";
import * as url from "url";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('map')  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: 39.8336837,
    lng: 32.5844109,
  };
  markerId:string;

  constructor(private menu: MenuController, public modalController: ModalController, public navCtrl: NavController ) {}

  ngAfterViewInit(){
    this.createMap();

  }
  async createMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'capacitor-google-maps',
        element: this.mapRef.nativeElement,
        apiKey: environment.google_maps_api_key,
        config: {
          center: this.center,
          zoom: 13,
          streetViewControl: false,
          disableDefaultUI: true,
          mapId:'558f75b3b5a5e8bd'
        },
      });
      //this.addMarker(this.center.lat, this.center.lng);
      this.addListeners();
    } catch(e) {
      console.log(e);
    }
  }

  async onTriggerSheetClick(){
    const modal = await this.modalController.create(
      {
        component: FacilityReviewPage,
        initialBreakpoint: 0.8,
        breakpoints: [0, 0.8],
        cssClass: 'facilityReview'
      });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }

  async addMarker(lat: any, lng: any){
    if(this.markerId) this.removeMarker();
    this.onTriggerSheetClick();
    this.markerId = await this.newMap.addMarker({
      coordinate:{
        lat:lat,
        lng:lng,
      },
      draggable:true
    });
  }

  async removeMarker(id?: string) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  async addListeners() {
    // Handle marker click
    await this.newMap.setOnMarkerClickListener((event) => {
      console.log('setOnMarkerClickListener', event);
      this.removeMarker(event.markerId);
    });

    await this.newMap.setOnMapClickListener((event) => {
      console.log('setOnMapClickListener', event);
      //this.onTriggerSheetClick();
      this.addMarker(event.latitude, event.longitude);
    });
/*
    await this.newMap.setOnMyLocationButtonClickListener((event) => {
      console.log('setOnMyLocationButtonClickListener', event);
      this.addMarker(event.mapId, event.mapId);
    });
*/
    await this.newMap.setOnMyLocationClickListener((event) => {
      console.log('setOnMyLocationClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });
  }

  openEnd() {
    this.menu.close();

  }
  goToProfileSetupPage(){
    this.navCtrl.navigateForward('profile-setup-finalize');
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
