import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import {User, UserService} from "../services/user.service";

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.page.html',
  styleUrls: ['./profile-setup.page.scss'],
})
export class ProfileSetupPage implements OnInit {
  user : User;
  public profilePicture: string;
  public profilePics: string[] = [
    "assets/images/BALL_AVATAR.png",
    "assets/images/BUTTERFLY_AVATAR.png",
    "assets/images/CAT_AVATAR.png",
    "assets/images/DOG_AVATAR.png",
    "assets/images/PANDA_AVATAR.png"
  ];

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


  goToSignUpPage(){
    this.navCtrl.navigateForward('sign-up');
  }

  goToHomePage(){
    this.navCtrl.navigateForward(['tab2']);
  }

}
