import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-setup-finalize',
  templateUrl: './profile-setup-finalize.page.html',
  styleUrls: ['./profile-setup-finalize.page.scss'],
})
export class ProfileSetupFinalizePage implements OnInit {
  dataComing: any;
  public profilePics: string[] = [
    "assets/images/BALL_AVATAR.png",
    "assets/images/BUTTERFLY_AVATAR.png",
    "assets/images/CAT_AVATAR.png",
    "assets/images/DOG_AVATAR.png",
    "assets/images/PANDA_AVATAR.png"
  ];
  public profilePicture: string;
  ngOnInit(): void {
    this.profilePicture = localStorage.getItem('avatarUrl') || this.getRandomAvatar();
    localStorage.setItem('avatarUrl', this.profilePicture);
  }
  getRandomAvatar(): string {
    const randomIndex = Math.floor(Math.random() * this.profilePics.length);
    return this.profilePics[randomIndex];
  }
  constructor(public navCtrl: NavController, private route: ActivatedRoute) {
    this.dataComing = this.route.snapshot.params['data'];
  }
  changeAvatar(): void {
    localStorage.removeItem('avatarUrl');
    this.profilePicture = this.getRandomAvatar();
    localStorage.setItem('avatarUrl', this.profilePicture);
  }

  goToHomePage(){
    this.navCtrl.navigateForward(['tab2', {data:this.dataComing}]);
  }

}
