import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsalertePageRoutingModule } from './contactsalerte-routing.module';

import { ContactsalertePage } from './contactsalerte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsalertePageRoutingModule
  ],
  declarations: [ContactsalertePage]
})
export class ContactsalertePageModule {}
