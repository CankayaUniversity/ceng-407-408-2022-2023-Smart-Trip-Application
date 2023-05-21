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
  errorMessage: string = '';
  toggleError: boolean = false;
  toggleValue: boolean = false;

  ngOnInit() {
  }

  goToSignUpWith(){
    this.errorMessage = ' ';
    this.toggleError = false;
    this.navCtrl.navigateForward('tab3');
  }
  goToProfileSetup(){
    this.navCtrl.navigateForward('profile-setup');
  }
  goToSignInPage(){
    this.navCtrl.navigateForward('tab1');
  }
  signUp(){
    if(this.toggleValue){
      this.toggleError = false;
      this.http.post(`${environment.serverRoot}/user`, this.user).pipe(
        take(1)
      ).subscribe(
        response => {
          console.log("Response:", JSON.stringify(response, undefined, '  '));
          this.navCtrl.navigateForward('profile-setup');
        },
        error => {
          console.log("Error:", error);
          this.errorMessage = 'Please fill in the required fields!';
        }
      );
    }
    if (!this.toggleValue) {
      this.toggleError = true;
      return;
    }
  }
}
