import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSetupPageRoutingModule } from './profile-setup-routing.module';

import { ProfileSetupPage } from './profile-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSetupPageRoutingModule
  ],
  declarations: [ProfileSetupPage]
})
export class ProfileSetupPageModule {}
