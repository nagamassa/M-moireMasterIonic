import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewalerteagencefollowerPage } from './newalerteagencefollower.page';

const routes: Routes = [
  {
    path: '',
    component: NewalerteagencefollowerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewalerteagencefollowerPageRoutingModule {}
