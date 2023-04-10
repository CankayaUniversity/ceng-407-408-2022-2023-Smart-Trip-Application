import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goToSignInPage(){
    this.navCtrl.navigateForward('tab1');
  }

}
