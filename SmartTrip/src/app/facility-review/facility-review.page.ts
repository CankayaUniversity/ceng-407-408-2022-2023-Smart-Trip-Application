import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { WriteReviewPage } from "../write-review/write-review.page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { take } from "rxjs";

interface Facility {
  id: string;
  facilityName: string;
  latitude: string;
  longitude: string;
  isAvm: string;
  userId: string;
  timestamp: string;
  additionalComment: string;
  rating: string;
  comments: string[];
  hasToilet: string;
  hasDisabled: string;
  hasBabycare: string;
  hasMosque: string;
}

@Component({
  selector: 'app-facility-review',
  templateUrl: './facility-review.page.html',
  styleUrls: ['./facility-review.page.scss'],
})
export class FacilityReviewPage implements OnInit {
  facilityName: string = '';
  dataName: string;
  dataLatitude: string;
  dataLongitude: string;
  public form: FormGroup;
  rating: number;

  reviews: { username: string; comment: string; icon: string }[];

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    public navCtrl: NavController,
    public http: HttpClient
  ) {
    this.rating = 0;
  }

  ngOnInit() {
    this.facilityName = this.dataName;

    this.form = this.fb.group({
      rating2: [this.rating] // Convert facility.rating to a number
    });
  }

  ionViewWillEnter() {
    this.http
      .get(`${environment.serverRoot}/facility/by_geolocation/` + this.dataLatitude + '/' + this.dataLongitude)
      .pipe(take(1))
      .subscribe(
        (response) => {
          const facility = JSON.parse(JSON.stringify(response)) as Facility;
          const rate = Math.round(Number(facility.rating) / facility.comments.length);

          if (rate > 5) {
            this.rating = 5;
          } else {
            this.rating = rate;
          }
          console.log(rate);
          this.form.patchValue({ rating2: this.rating }); // Update the form control value

          this.reviews = facility.comments
            .slice(1) // Exclude the first element
            .map((comment) => {
              const parts: string[] = comment.split("/");
              const username: string = parts[0];
              const commentText: string = parts[1];
              return {
                username: username,
                comment: commentText,
                icon: "assets/images/defaultprofilepicture.png",
              };
            });

            this.changeRequirements(facility);

        },
        (error) => {
          console.log('Error:', error);
        }
      );
  }
  toilet : string = 'assets/icon/toilet.png';
  disabled : string = 'assets/icon/disabled.png';
  babycare : string = 'assets/icon/babycare.png';
  mosque : string = 'assets/icon/mosque.png';


  changeRequirements(facility:any){
    const rate = (facility.comments.length - 1) / 2;
    if(Number(facility.hasToilet) >= rate ){
      this.toilet='assets/icon/toiletWhite.png';
    }
    else{
      this.toilet = 'assets/icon/toilet.png';
    }
    if(Number(facility.hasDisabled) >= rate){
      this.disabled ='assets/icon/disabledWhite.png';
    }
    else{
      this.disabled = 'assets/icon/disabled.png';
    }
    if(Number(facility.hasBabycare) >= rate){
      this.babycare ='assets/icon/babycareWhite.png'
    }
    else{
      this.babycare ='assets/icon/babycare.png'
    }
    if(Number(facility.hasMosque) >= rate){
      this.mosque = 'assets/icon/mosqueWhite.png'
    }
    else{
      this.mosque = 'assets/icon/mosque.png'
    }
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  async onTriggerReviewClick() {
    const modal = await this.modalController.create({
      component: WriteReviewPage,
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.8],
      cssClass: 'writeReview',
      componentProps: {
        dataLat: this.dataLatitude,
        dataLng: this.dataLongitude,
      },
    });
    modal.present();
    return this.modalController.dismiss(null, 'cancel');
    const { data, role } = await modal.onWillDismiss();
  }


}
