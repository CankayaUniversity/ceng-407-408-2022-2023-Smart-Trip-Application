import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSetupPage } from './profile-setup.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSetupPageRoutingModule {}
