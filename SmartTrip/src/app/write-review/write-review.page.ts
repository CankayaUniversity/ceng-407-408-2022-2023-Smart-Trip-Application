import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { FacilityReviewPage } from "../facility-review/facility-review.page";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { IonTextarea } from '@ionic/angular';
import {environment} from "../../environments/environment";
import {take} from "rxjs";
import { UserService, User } from '../services/user.service'; // Import the UserService and User interface

interface Facility {
  id : string,
  facilityName: string,
  latitude: string,
  longitude: string,
  isAvm:string,
  userId: string,
  timestamp: string,
  additionalComment: string,
  rating: string,
  comments: string[],
  hasToilet: string,
  hasDisabled: string,
  hasBabycare: string,
  hasMosque: string
}

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.page.html',
  styleUrls: ['./write-review.page.scss'],
})

export class WriteReviewPage implements OnInit {
  @ViewChild('commentArea', { static: false }) commentArea: IonTextarea;
  rating: number;
  public form: FormGroup;
  dataLat: string;
  dataLng: string;
  dataLongitude: string;
  dataLatitude: string;
  comment: string = '';
  commentWithUsername: string ='';
  items: string[];

  tlt:number = 0;
  dis:number = 0;
  bc: number = 0;
  msq: number = 0;

  constructor(private fb: FormBuilder,
              private modalController: ModalController,
              public navCtrl: NavController,
              public http: HttpClient,
              private userService: UserService // Inject the UserService
  ) {
    this.items =
      [ 'Hijyene çok dikkat edilmiş.',
        'Tuvalet kağıdı ve sabun vardı.',
        'Pişman olmazsınız.',
        'Çok temiz ve bakımlıydı.',
        'Lavabo ve aynalar tertemizdi.',
        'Her şey iyiydi.',
        'Sıcak-soğuk su ayarı iyiydi.',
        'Gayet temizdi.',
        'Temassız sistem kullanılmış.',
        'Daha iyi olabilirdi.',
        'İdare eder.',
        'Çok pisti.',
        'Hiç bir temizlik yapılmamış.',
        'Kötü kokuyordu.',
        'Kesinlikle gitmeyin!'
      ];
    this.form = this.fb.group({
      userRating: [this.rating]
    });
  }
  username: string;
  icon:string;
  ngOnInit() {
    //this.facility.comments.push(this.dataLat);
    this.dataLatitude = this.dataLat;
    this.dataLongitude = this.dataLng;

    // Access the username from the UserService
    const user: User = this.userService.getUser();
    this.username = user.username;
    this.icon = user.icon;
    console.log(this.icon);
    console.log(this.dataLatitude, this.dataLongitude);
  }
  commentError: boolean = false;
  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  onTriggerSheetClick(){
    this.logComment();
    if (this.comment.trim() === '') {
      this.commentError = true; // Show the comment error message
      return;
    }
    this.cancel();
  }
  clearCommentError() {
    this.commentError = false; // Clear the comment error message
  }

  logComment() {

    this.http
      .get(`${environment.serverRoot}/facility/by_geolocation/` + this.dataLatitude + '/' + this.dataLongitude)
      .pipe(take(1))
      .subscribe(
        (response) => {
          const facility = JSON.parse(JSON.stringify(response)) as Facility;
          this.commentWithUsername = this.username + "-" + this.comment + "-" + this.icon;
          facility.comments.push(this.commentWithUsername);
          const currentRating = Number(facility.rating) + Number(this.form.value.userRating);
          facility.rating = currentRating.toString(); // Convert the sum of ratings to a string
          facility.hasToilet = (Number(facility.hasToilet) + this.tlt).toString();
          facility.hasDisabled = (Number(facility.hasDisabled) + this.dis).toString();
          facility.hasBabycare = (Number(facility.hasBabycare) + this.bc).toString();
          facility.hasMosque = (Number(facility.hasMosque) + this.msq).toString();

          if (this.comment.trim() === '') {
            this.commentError = true; // Set the commentError flag to true
            return;
          }
          this.commentError = false;

          this.http
            .put(`${environment.serverRoot}/facility/`, facility)
            .pipe(take(1))
            .subscribe(
              (response) => {
                console.log('Facility güncellendi:', response);
              },
              (error) => {
                console.log('Hata:', error);
              }
            );
        },
        (error) => {
          console.log('Hata:', error);
          // İşlem yapılırken hata oluşursa uygun şekilde işleyin
        }
      );
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
      this.tlt = 1;
    }else{
      this.toilet = 'assets/icon/toilet.png';
      this.tlt = 0;
    }
  }
  selectDisabled(){
    if(this.disabled=='assets/icon/disabled.png')
    {
      this.disabled='assets/icon/disabledWhite.png';
      this.dis = 1;
    }else{
      this.disabled = 'assets/icon/disabled.png';
      this.dis = 0;
    }
  }

   selectBabycare(){
    if(this.babycare=='assets/icon/babycare.png')
    {
      this.babycare='assets/icon/babycareWhite.png';
      this.bc = 1;
    }else{
      this.babycare = 'assets/icon/babycare.png';
      this.bc = 0;
    }
  }
  selectMosque(){
    if(this.mosque=='assets/icon/mosque.png')
    {
      this.mosque='assets/icon/mosqueWhite.png';
      this.msq = 1;
    }else{
      this.mosque = 'assets/icon/mosque.png';
      this.msq = 0;
    }
  }

  preventModalScroll(event: { preventDefault: () => void; }) {
    event.preventDefault(); // Prevent scrolling
console.log('deneme');
    // Select the modal element based on its class name or ID
    const modalElement = document.querySelector('.modal');

    if (modalElement) {
      // Add CSS classes to prevent scrolling
      modalElement.classList.add('fixed-modal');
      modalElement.classList.add('no-scroll');
    }
  }

}
