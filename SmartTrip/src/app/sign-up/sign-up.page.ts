import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {take} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(public navCtrl: NavController, public http: HttpClient) {}
  user = {
    username: '',
    email: '',
    password: ''
  };

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
  signUp(){
    this.http.post(`${environment.serverRoot}/user`, this.user).pipe(
      take(1)
    ).subscribe(
      response => console.log("Response:", JSON.stringify(response, undefined, '  '))
    );
  }

}
