import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {take} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              private userService: UserService) { }
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
    this.http.post(`${environment.serverRoot}/user`, {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
    }).pipe(
      take(1),
    ).subscribe(
      response => {
        console.log(response);

        // Signup successful
        console.log('Signup successful');
        this.navCtrl.navigateForward(['tab1']);
      },
      error => {
        console.log('Error:', error);
        this.errorMessage = 'Registration failed';
      }
    );
  }
}
