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
  constructor(public navCtrl: NavController, private route: ActivatedRoute) {
    this.dataComing = this.route.snapshot.params['data'];
  }

  ngOnInit() {
  }

  goToHomePage(){
    this.navCtrl.navigateForward(['tab2', {data:this.dataComing}]);
  }

}
