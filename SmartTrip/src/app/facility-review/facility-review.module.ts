import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacilityReviewPageRoutingModule } from './facility-review-routing.module';

import { FacilityReviewPage } from './facility-review.page';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FacilityReviewPageRoutingModule,
    NgxStarRatingModule
  ],
  declarations: [FacilityReviewPage]
})
export class FacilityReviewPageModule {}
