import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewlocalitefollowersPageRoutingModule } from './newlocalitefollowers-routing.module';

import { NewlocalitefollowersPage } from './newlocalitefollowers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewlocalitefollowersPageRoutingModule
  ],
  declarations: [NewlocalitefollowersPage]
})
export class NewlocalitefollowersPageModule {}
