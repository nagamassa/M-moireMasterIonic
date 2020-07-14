import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupesPageRoutingModule } from './groupes-routing.module';

import { GroupesPage } from './groupes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupesPageRoutingModule
  ],
  declarations: [GroupesPage]
})
export class GroupesPageModule {}
