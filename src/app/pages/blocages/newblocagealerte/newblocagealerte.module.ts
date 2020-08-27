import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewblocagealertePageRoutingModule } from './newblocagealerte-routing.module';

import { NewblocagealertePage } from './newblocagealerte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewblocagealertePageRoutingModule
  ],
  declarations: [NewblocagealertePage]
})
export class NewblocagealertePageModule {}
