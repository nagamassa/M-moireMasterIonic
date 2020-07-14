import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlocagesPageRoutingModule } from './blocages-routing.module';

import { BlocagesPage } from './blocages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlocagesPageRoutingModule
  ],
  declarations: [BlocagesPage]
})
export class BlocagesPageModule {}
