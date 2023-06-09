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
  toilet : string = 'assets/icon/toilet.png';
  disabled : string = 'assets/icon/disabled.png';
  babycare : string = 'assets/icon/babycare.png';
  mosque : string = 'assets/icon/mosque.png';

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
          let rate = 0;
          if(Number(facility.rating) > 0 ){
            rate = Math.ceil(Number(facility.rating) / facility.comments.length);
          }
          console.log(rate);
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
              const parts: string[] = comment.split("-");
              const username: string = parts[0];
              const commentText: string = parts[1];
              const iconPart:string = parts[2];
              return {
                username: username,
                comment: commentText,
                icon: iconPart,
              };
            });

            this.changeRequirements(facility);

        },
        (error) => {
          console.log('Error:', error);
        }
      );
  }

  changeRequirements(facility:any){
    const rate = (facility.comments.length - 1) / 2;
    this.toilet = (Number(facility.hasToilet) > rate) ? 'assets/icon/toiletWhite.png' : 'assets/icon/toilet.png';
    this.disabled = (Number(facility.hasDisabled) > rate) ? 'assets/icon/disabledWhite.png' : 'assets/icon/disabled.png';
    this.babycare = (Number(facility.hasBabycare) > rate) ? 'assets/icon/babycareWhite.png' : 'assets/icon/babycare.png';
    this.mosque = (Number(facility.hasMosque) > rate) ? 'assets/icon/mosqueWhite.png' : 'assets/icon/mosque.png';
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  async onTriggerReviewClick() {
    const modal = await this.modalController.create({
      component: WriteReviewPage,
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.9],
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
