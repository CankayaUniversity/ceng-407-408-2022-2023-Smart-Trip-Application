import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { WriteReviewPage } from "../write-review/write-review.page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

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
  dataComing: any;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public http: HttpClient
  ) {
    this.rating = 5;
    this.rating3 = 0;
    this.form = this.fb.group({
      rating1: ['', Validators.required],
      rating2: [this.rating]
    });
    //this.dataComing = this.route.snapshot.params['dataLocation'];
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
