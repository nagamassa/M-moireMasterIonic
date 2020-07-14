import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignalsPageRoutingModule } from './signals-routing.module';

import { SignalsPage } from './signals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignalsPageRoutingModule
  ],
  declarations: [SignalsPage]
})
export class SignalsPageModule {}
