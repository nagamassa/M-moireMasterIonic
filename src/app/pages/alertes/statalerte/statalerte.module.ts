import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatalertePageRoutingModule } from './statalerte-routing.module';

import { StatalertePage } from './statalerte.page';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatalertePageRoutingModule
  ],
  providers: [
    FilePath,
    FileChooser,
  ],
  declarations: [StatalertePage]
})
export class StatalertePageModule {}
