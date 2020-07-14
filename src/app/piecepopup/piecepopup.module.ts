import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiecepopupPageRoutingModule } from './piecepopup-routing.module';

import { PiecepopupPage } from './piecepopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PiecepopupPageRoutingModule
  ],
  declarations: [PiecepopupPage]
})
export class PiecepopupPageModule {}
