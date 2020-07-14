import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PiecepopupPage } from './piecepopup.page';

const routes: Routes = [
  {
    path: '',
    component: PiecepopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiecepopupPageRoutingModule {}
