import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursalertePageRoutingModule } from './coursalerte-routing.module';

import { CoursalertePage } from './coursalerte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursalertePageRoutingModule
  ],
  declarations: [CoursalertePage]
})
export class CoursalertePageModule {}
