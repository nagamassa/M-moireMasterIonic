import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupedetailsPage } from './groupedetails.page';

const routes: Routes = [
  {
    path: '',
    component: GroupedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupedetailsPageRoutingModule {}
