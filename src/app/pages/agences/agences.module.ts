import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgencesPageRoutingModule } from './agences-routing.module';

import { AgencesPage } from './agences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgencesPageRoutingModule
  ],
  declarations: [AgencesPage]
})
export class AgencesPageModule {}
