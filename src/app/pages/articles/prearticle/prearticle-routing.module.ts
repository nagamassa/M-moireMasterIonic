import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrearticlePage } from './prearticle.page';

const routes: Routes = [
  {
    path: '',
    component: PrearticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrearticlePageRoutingModule {}
