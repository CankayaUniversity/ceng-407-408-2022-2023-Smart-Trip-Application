import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WriteReviewPageRoutingModule } from './write-review-routing.module';

import { WriteReviewPage } from './write-review.page';
import {BarRatingModule} from "ngx-bar-rating";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WriteReviewPageRoutingModule,
    BarRatingModule,
  ],
  declarations: [WriteReviewPage]
})
export class WriteReviewPageModule {}
