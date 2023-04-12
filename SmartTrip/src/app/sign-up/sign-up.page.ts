import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
  }

  goToSignUpWith(){
    this.navCtrl.navigateForward('tab3');
  }
  goToProfileSetup(){
    this.navCtrl.navigateForward('profile-setup');
  }
  goToSignInPage(){
    this.navCtrl.navigateForward('tab1');
  }

}
