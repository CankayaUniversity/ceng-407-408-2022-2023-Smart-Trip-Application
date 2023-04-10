import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSetupFinalizePageRoutingModule } from './profile-setup-finalize-routing.module';

import { ProfileSetupFinalizePage } from './profile-setup-finalize.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSetupFinalizePageRoutingModule
  ],
  declarations: [ProfileSetupFinalizePage]
})
export class ProfileSetupFinalizePageModule {}
