import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacilityReviewPage } from './facility-review.page';

const routes: Routes = [
  {
    path: '',
    component: FacilityReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacilityReviewPageRoutingModule {}
