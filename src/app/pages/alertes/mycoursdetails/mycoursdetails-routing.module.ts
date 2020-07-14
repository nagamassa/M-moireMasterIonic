import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycoursdetailsPage } from './mycoursdetails.page';

const routes: Routes = [
  {
    path: '',
    component: MycoursdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycoursdetailsPageRoutingModule {}
