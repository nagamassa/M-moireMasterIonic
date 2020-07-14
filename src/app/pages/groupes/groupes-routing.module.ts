import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupesPage } from './groupes.page';

const routes: Routes = [
  {
    path: '',
    component: GroupesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupesPageRoutingModule {}
