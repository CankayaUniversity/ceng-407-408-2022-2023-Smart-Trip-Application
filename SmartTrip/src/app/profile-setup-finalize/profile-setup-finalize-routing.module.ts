import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSetupFinalizePage } from './profile-setup-finalize.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSetupFinalizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSetupFinalizePageRoutingModule {}
