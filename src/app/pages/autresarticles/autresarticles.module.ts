import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutresarticlesPageRoutingModule } from './autresarticles-routing.module';

import { AutresarticlesPage } from './autresarticles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutresarticlesPageRoutingModule
  ],
  declarations: [AutresarticlesPage]
})
export class AutresarticlesPageModule {}
