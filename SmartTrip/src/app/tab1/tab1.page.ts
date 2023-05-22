import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public navCtrl: NavController,  public http: HttpClient) {}

  user = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  private usernameData: any;

  ngOnInit() {}

  goToOpenPage(){
    this.errorMessage = ' ';
    this.navCtrl.navigateForward('');
  }
  goToPasswordPage(){
    this.navCtrl.navigateForward('forgot-password');
  }

  signIn() {
      this.http.get(`${environment.serverRoot}/user`).pipe(
        take(1)
      ).subscribe(
        response => {
          //console.log('Response:', JSON.stringify(response, undefined, '  '));

          const users = Object.values(response);
          let foundUser = null;

          for (const user of users) {
            if (user.email === this.user.email && user.password === this.user.password) {
              foundUser = user;
              this.usernameData = foundUser.username;
              break;
            }
          }

          if (foundUser) {
            // Login successful
            console.log('Login successful');
            this.navCtrl.navigateForward(['tab2', {data:this.usernameData}]);
          } else {
            // Invalid credentials
            console.log('Invalid username or password');
            this.errorMessage = 'Invalid username or password';
          }
        },
        error => {
          console.log('Error:', error);
          this.errorMessage = 'An error occurred';
        }
      );
    }
}
