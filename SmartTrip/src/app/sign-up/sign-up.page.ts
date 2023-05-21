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
  goToSignInPage(){
    this.navCtrl.navigateForward('tab1');
  }
  signUp(){
    this.http.post(`${environment.serverRoot}/user`, this.user).pipe(
      take(1)
    ).subscribe(
      response => {
        console.log("Response:", JSON.stringify(response, undefined, '  '));
        if(this.toggleValue){
          this.navCtrl.navigateForward(['profile-setup',
            {data:this.user.username}]);
        }else{
          this.errorMessage = ' ';
          this.toggleError = true;
          return;
        }
      },
      error => {
        console.log("Error:", error);
        this.errorMessage = 'Please fill in the required fields!';
      }
    );
  }
}
