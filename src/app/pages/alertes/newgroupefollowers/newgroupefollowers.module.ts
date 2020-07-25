import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewgroupefollowersPageRoutingModule } from './newgroupefollowers-routing.module';

import { NewgroupefollowersPage } from './newgroupefollowers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewgroupefollowersPageRoutingModule
  ],
  declarations: [NewgroupefollowersPage]
})
export class NewgroupefollowersPageModule {}
