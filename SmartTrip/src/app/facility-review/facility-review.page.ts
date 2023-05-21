import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { WriteReviewPage } from "../write-review/write-review.page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-facility-review',
  templateUrl: './facility-review.page.html',
  styleUrls: ['./facility-review.page.scss'],
})
export class FacilityReviewPage implements OnInit {
  facilityTitle: string = '';
  data: string;
  rating3: number;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    public navCtrl: NavController,
  ) {
    this.rating3 = 0;
    this.form = this.fb.group({
      rating1: ['', Validators.required],
      rating2: [4]
    });
  }

  ngOnInit() {
    this.facilityTitle = this.data;
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
        cssClass: 'writeReview'
      });
    modal.present();
    return this.modalController.dismiss(null, 'cancel');
    const { data, role } = await modal.onWillDismiss();
  }

}
