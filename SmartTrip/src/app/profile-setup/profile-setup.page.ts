import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.page.html',
  styleUrls: ['./profile-setup.page.scss'],
})
export class ProfileSetupPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  goToSignUpPage(){
    this.navCtrl.navigateForward('sign-up');
  }

  goToHomePage(){
    this.navCtrl.navigateForward('tab2');
  }

}
