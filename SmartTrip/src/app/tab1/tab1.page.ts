import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public navCtrl: NavController,  public http: HttpClient, private userService: UserService) {}

  user = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  ngOnInit() {}

  goToOpenPage(){
    this.errorMessage = ' ';
    this.navCtrl.navigateForward('');
  }
  goToPasswordPage(){
    this.navCtrl.navigateForward('forgot-password');
  }

  signIn() {
      this.http.post<{access_token: string}>(`${environment.serverRoot}/login`, {
        username: this.user.email,
        password: this.user.password,
      }).pipe(
        take(1),
      ).subscribe(
        response => {
          console.log(response);
          const accessToken = response.access_token;
          this.userService.setAccessToken(accessToken);

          // Login successful
          console.log('Login successful');
          this.navCtrl.navigateForward(['tab2']);
        },
        error => {
          console.log('Error:', error);
          this.errorMessage = 'Invalid username or password';
        }
      );
    }
}
