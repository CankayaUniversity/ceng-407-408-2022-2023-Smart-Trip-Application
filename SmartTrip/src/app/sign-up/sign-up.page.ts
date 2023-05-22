import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {take} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(public navCtrl: NavController,
              public http: HttpClient) { }
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
  goToOpenPage(){
    this.errorMessage = ' ';
    this.toggleError = false;
    this.navCtrl.navigateForward('');
  }
  goToSignInPage(){
    this.navCtrl.navigateForward('tab1');
  }
  signUp() {
    this.http.get(`${environment.serverRoot}/user`).pipe(
      take(1)
    ).subscribe(
      (response) => {
        this.errorMessage = ' ';
        const users = Object.values(response);

        const foundUserMail = users.find((user) => user.email === this.user.email);
        const foundUserName = users.find((user) => user.username === this.user.username);

        if (foundUserMail) {
          // Sign up error
          this.errorMessage = 'Email is already registered!';
        }
        else if(foundUserName) {
          // Sign up error
          this.errorMessage = 'Username is already registered!';
        }
        else {
          // mail successful
          if(this.toggleValue){
            this.http.post(`${environment.serverRoot}/user`, this.user).pipe(
              take(1)
            ).subscribe(
              (response) => {
                console.log("Response:", JSON.stringify(response, undefined, '  '));
                this.navCtrl.navigateForward(['profile-setup', { data: this.user.username }]);
              },
              (error) => {
                console.log("Error:", error);
                this.errorMessage = 'Please fill in the required fields!';
              }
            );
          } else {
            this.errorMessage = ' ';
            this.toggleError = true;
            return;
          }
        }
      },
      (error) => {
        console.log('Error:', error);
        this.errorMessage = 'An error occurred';
      }
    );
  }
}
