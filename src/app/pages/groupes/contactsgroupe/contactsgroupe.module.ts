import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsgroupePageRoutingModule } from './contactsgroupe-routing.module';

import { ContactsgroupePage } from './contactsgroupe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsgroupePageRoutingModule
  ],
  declarations: [ContactsgroupePage]
})
export class ContactsgroupePageModule {}
