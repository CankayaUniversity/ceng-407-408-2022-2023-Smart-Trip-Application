import { Component } from '@angular/core';
import { NavController} from "@ionic/angular";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public navCtrl: NavController) {}

  goToSignInPage(){
    this.navCtrl.navigateForward('tab1');
  }

  goToSignUpPage(){
    this.navCtrl.navigateForward('sign-up');
  }
}
