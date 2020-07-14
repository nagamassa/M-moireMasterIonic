import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrealertePageRoutingModule } from './prealerte-routing.module';

import { PrealertePage } from './prealerte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrealertePageRoutingModule
  ],
  declarations: [PrealertePage]
})
export class PrealertePageModule {}
