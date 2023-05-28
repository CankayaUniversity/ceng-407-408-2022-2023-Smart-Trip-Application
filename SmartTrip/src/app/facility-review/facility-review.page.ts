import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { WriteReviewPage } from "../write-review/write-review.page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

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
  rating3: number;
  public form: FormGroup;
  rating : number;
  reviews: { username: string; comment: string; icon: string }[] = [
    {
      username: "kullanici1",
      comment: "Tuvalet kağıdı ve sabun vardı.",
      icon: "assets/images/defaultprofilepicture.png"
    },
    {
      username: "kullanici2",
      comment: "Her şey iyiydi",
      icon: "assets/images/defaultprofilepicture.png"
    },
    {
      username: "kullanici3",
      comment: "Her şey temassızdı.",
      icon: "assets/images/defaultprofilepicture.png"
    },
    {
      username: "kullanici4",
      comment: "Gitmenizi öneririm.",
      icon: "assets/images/defaultprofilepicture.png"
    },
    {
      username: "kullanici5",
      comment: "Her şey iyiydi.",
      icon: "assets/images/defaultprofilepicture.png"
    },
    {
      username: "kullanici6",
      comment: "Hijyene çok dikkat edilmiş.",
      icon: "assets/images/defaultprofilepicture.png"
    }
  ];

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    public navCtrl: NavController,
    public http: HttpClient
  ) {
    this.rating = 4;
    this.rating3 = 0;
    this.form = this.fb.group({
      rating1: ['', Validators.required],
      rating2: [this.rating]
    });
  }

  ngOnInit() {
    this.facilityName = this.dataName;
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  async onTriggerReviewClick(){
    const modal = await this.modalController.create(
      {
        component: WriteReviewPage,
        initialBreakpoint: 0.9,
        breakpoints: [0, 0.8],
        cssClass: 'writeReview',
        componentProps:{
          dataLat: this.dataLatitude,
          dataLng: this.dataLongitude,
        }
      });
    modal.present();
    return this.modalController.dismiss(null, 'cancel');
    const { data, role } = await modal.onWillDismiss();
  }

}
