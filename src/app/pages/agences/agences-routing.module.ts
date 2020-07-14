import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgencesPage } from './agences.page';

const routes: Routes = [
  {
    path: '',
    component: AgencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencesPageRoutingModule {}
