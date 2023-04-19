import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import {WriteReviewPage} from "../write-review/write-review.page";

@Component({
  selector: 'app-facility-review',
  templateUrl: './facility-review.page.html',
  styleUrls: ['./facility-review.page.scss'],
})
export class FacilityReviewPage implements OnInit {

  constructor(private modalController: ModalController, public navCtrl: NavController) { }

  ngOnInit() {
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
