import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WriteReviewPage } from './write-review.page';

const routes: Routes = [
  {
    path: '',
    component: WriteReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteReviewPageRoutingModule {}
