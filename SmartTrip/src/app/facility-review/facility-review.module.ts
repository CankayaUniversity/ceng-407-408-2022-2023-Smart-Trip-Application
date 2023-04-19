import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacilityReviewPageRoutingModule } from './facility-review-routing.module';

import { FacilityReviewPage } from './facility-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacilityReviewPageRoutingModule
  ],
  declarations: [FacilityReviewPage]
})
export class FacilityReviewPageModule {}
