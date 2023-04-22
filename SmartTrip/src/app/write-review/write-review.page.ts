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
