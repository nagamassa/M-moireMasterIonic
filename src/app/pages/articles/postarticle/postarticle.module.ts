import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostarticlePageRoutingModule } from './postarticle-routing.module';

import { PostarticlePage } from './postarticle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostarticlePageRoutingModule
  ],
  declarations: [PostarticlePage]
})
export class PostarticlePageModule {}
