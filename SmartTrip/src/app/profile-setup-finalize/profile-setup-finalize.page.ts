import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-profile-setup-finalize',
  templateUrl: './profile-setup-finalize.page.html',
  styleUrls: ['./profile-setup-finalize.page.scss'],
})
export class ProfileSetupFinalizePage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goToHomePage(){
    this.navCtrl.navigateForward('tab2');
  }

}
