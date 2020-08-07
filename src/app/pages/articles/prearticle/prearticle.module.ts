import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrearticlePageRoutingModule } from './prearticle-routing.module';

import { PrearticlePage } from './prearticle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrearticlePageRoutingModule
  ],
  declarations: [PrearticlePage]
})
export class PrearticlePageModule {}
