import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostarticlePage } from './postarticle.page';

const routes: Routes = [
  {
    path: '',
    component: PostarticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostarticlePageRoutingModule {}
