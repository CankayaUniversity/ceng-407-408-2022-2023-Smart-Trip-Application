import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { FacilityReviewPage } from "../facility-review/facility-review.page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { IonTextarea } from '@ionic/angular';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.page.html',
  styleUrls: ['./write-review.page.scss'],
})
export class WriteReviewPage implements OnInit {
  @ViewChild('commentArea', { static: false }) commentArea: IonTextarea;
  rating3: number;
  public form: FormGroup;
  dataLat: string;
  dataLng: string;
  comment: string = '';
  items: string[];
  constructor(private fb: FormBuilder,
              private modalController: ModalController,
              public navCtrl: NavController,
              public http: HttpClient) {
    this.items =
      [ 'Hijyene çok dikkat edilmiş.',
        'Tuvalet kağıdı ve sabun vardı.',
        'Gitmenizi öneririm.',
        'Her şey iyiydi.',
        'Sıcak soğuk su ayarı iyiydi.',
        'Her şey temassızdı.',
        'Daha iyi olabilirdi.',
        'İdare eder.',
        'Kötü kokuyordu.',
        'Kesinlikle gitmeyin!'
      ];
    this.rating3 = 0;
  }
  facility: {
    location: string,
    user: string,
    Timestamp: string,
    rating: string,
    AdditionalComment: string,
    comments: string[]
  } = {
    location: '',
    user: '',
    Timestamp: '',
    rating: '',
    AdditionalComment: '',
    comments: []
  };
  ngOnInit() {
    //this.facility.comments.push(this.dataLat);
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

   onTriggerSheetClick(){
     this.logComment();
     this.cancel();
  }
  logComment() {
    this.facility.comments.push(this.comment);
    this.facility.comments.forEach(comment => {
      console.log(comment);
    });
  }
  setComment(item: string) {

    this.comment = item;
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
