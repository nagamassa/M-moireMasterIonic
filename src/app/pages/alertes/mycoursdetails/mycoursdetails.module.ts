import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycoursdetailsPageRoutingModule } from './mycoursdetails-routing.module';

import { MycoursdetailsPage } from './mycoursdetails.page';
import { PiecepopupPage } from 'src/app/piecepopup/piecepopup.page';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycoursdetailsPageRoutingModule
  ],
  providers: [
    FilePath,
    FileChooser,
  ],
  declarations: [MycoursdetailsPage, PiecepopupPage],
  entryComponents: [PiecepopupPage]
})
export class MycoursdetailsPageModule {}
