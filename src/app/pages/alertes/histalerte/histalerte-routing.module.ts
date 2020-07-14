import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistalertePage } from './histalerte.page';

const routes: Routes = [
  {
    path: '',
    component: HistalertePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistalertePageRoutingModule {}
