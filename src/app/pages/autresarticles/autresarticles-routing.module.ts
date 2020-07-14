import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutresarticlesPage } from './autresarticles.page';

const routes: Routes = [
  {
    path: '',
    component: AutresarticlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutresarticlesPageRoutingModule {}
