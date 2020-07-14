import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlocagesPage } from './blocages.page';

const routes: Routes = [
  {
    path: '',
    component: BlocagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlocagesPageRoutingModule {}
