import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.page.html',
  styleUrls: ['./profile-setup.page.scss'],
})
export class ProfileSetupPage implements OnInit {
  dataComing : any;
  constructor(public navCtrl: NavController, private route: ActivatedRoute) {
    this.dataComing = this.route.snapshot.params['data'];
  }

  ngOnInit() {
  }
  goToSignUpPage(){
    this.navCtrl.navigateForward('sign-up');
  }

  goToHomePage(){
    this.navCtrl.navigateForward('tab2');
  }

}
