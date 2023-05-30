import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {User, UserService} from "../services/user.service";

@Component({
  selector: 'app-profile-setup-finalize',
  templateUrl: './profile-setup-finalize.page.html',
  styleUrls: ['./profile-setup-finalize.page.scss'],
})
export class ProfileSetupFinalizePage implements OnInit {
  user:User;
  public profilePics: string[] = [
    "assets/images/BALL_AVATAR.png",
    "assets/images/BUTTERFLY_AVATAR.png",
    "assets/images/CAT_AVATAR.png",
    "assets/images/DOG_AVATAR.png",
    "assets/images/PANDA_AVATAR.png"
  ];
  public profilePicture: string;
  constructor(public navCtrl: NavController, private route: ActivatedRoute, private userService: UserService) {
    this.user = this.userService.getUser();
  }
  ngOnInit(): void {
    this.profilePicture = localStorage.getItem('avatarUrl') || this.getRandomAvatar();
    localStorage.setItem('avatarUrl', this.profilePicture);
  }
  getRandomAvatar(): string {
    const randomIndex = Math.floor(Math.random() * this.profilePics.length);
    return this.profilePics[randomIndex];
  }
  changeAvatar(): void {
    localStorage.removeItem('avatarUrl');
    this.profilePicture = this.getRandomAvatar();
    localStorage.setItem('avatarUrl', this.profilePicture);
  }

  goToHomePage(){
    this.navCtrl.navigateForward(['tab2']);
  }

}
