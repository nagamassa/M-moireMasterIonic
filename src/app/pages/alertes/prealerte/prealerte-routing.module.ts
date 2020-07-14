import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrealertePage } from './prealerte.page';

const routes: Routes = [
  {
    path: '',
    component: PrealertePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrealertePageRoutingModule {}
