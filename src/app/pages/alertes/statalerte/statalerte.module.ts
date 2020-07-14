import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatalertePageRoutingModule } from './statalerte-routing.module';

import { StatalertePage } from './statalerte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatalertePageRoutingModule
  ],
  declarations: [StatalertePage]
})
export class StatalertePageModule {}
