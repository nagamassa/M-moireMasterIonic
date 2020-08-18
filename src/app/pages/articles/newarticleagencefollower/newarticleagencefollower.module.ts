import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewarticleagencefollowerPageRoutingModule } from './newarticleagencefollower-routing.module';

import { NewarticleagencefollowerPage } from './newarticleagencefollower.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewarticleagencefollowerPageRoutingModule
  ],
  declarations: [NewarticleagencefollowerPage]
})
export class NewarticleagencefollowerPageModule {}
