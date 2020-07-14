import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistalertePageRoutingModule } from './histalerte-routing.module';

import { HistalertePage } from './histalerte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistalertePageRoutingModule
  ],
  declarations: [HistalertePage]
})
export class HistalertePageModule {}
