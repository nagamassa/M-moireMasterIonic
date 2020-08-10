import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticledetailsPageRoutingModule } from './articledetails-routing.module';

import { ArticledetailsPage } from './articledetails.page';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { PiecepopupPage } from 'src/app/piecepopup/piecepopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticledetailsPageRoutingModule
  ],
  providers: [
    FilePath,
    FileChooser,
  ],
  declarations: [ArticledetailsPage, PiecepopupPage],
  entryComponents: [PiecepopupPage]
})
export class ArticledetailsPageModule {}
