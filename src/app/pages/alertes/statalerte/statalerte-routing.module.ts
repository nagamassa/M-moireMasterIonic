import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatalertePage } from './statalerte.page';

const routes: Routes = [
  {
    path: '',
    component: StatalertePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatalertePageRoutingModule {}
