import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewblocagealertePage } from './newblocagealerte.page';

const routes: Routes = [
  {
    path: '',
    component: NewblocagealertePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewblocagealertePageRoutingModule {}
