import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursalertePage } from './coursalerte.page';

const routes: Routes = [
  {
    path: '',
    component: CoursalertePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursalertePageRoutingModule {}
