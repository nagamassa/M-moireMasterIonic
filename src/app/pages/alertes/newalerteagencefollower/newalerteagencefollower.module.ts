import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewalerteagencefollowerPageRoutingModule } from './newalerteagencefollower-routing.module';

import { NewalerteagencefollowerPage } from './newalerteagencefollower.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewalerteagencefollowerPageRoutingModule
  ],
  declarations: [NewalerteagencefollowerPage]
})
export class NewalerteagencefollowerPageModule {}
