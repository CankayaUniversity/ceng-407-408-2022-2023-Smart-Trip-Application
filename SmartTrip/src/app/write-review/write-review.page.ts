import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {NavController} from "@ionic/angular";
import {FacilityReviewPage} from "../facility-review/facility-review.page";

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.page.html',
  styleUrls: ['./write-review.page.scss'],
})
export class WriteReviewPage implements OnInit {

  constructor(private modalController: ModalController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  async onTriggerSheetClick(){
    this.cancel();
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

}
