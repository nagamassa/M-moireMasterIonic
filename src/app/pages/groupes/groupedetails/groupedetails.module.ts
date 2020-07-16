import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupedetailsPageRoutingModule } from './groupedetails-routing.module';

import { GroupedetailsPage } from './groupedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupedetailsPageRoutingModule
  ],
  declarations: [GroupedetailsPage]
})
export class GroupedetailsPageModule {}
