import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewgroupefollowersPage } from './newgroupefollowers.page';

const routes: Routes = [
  {
    path: '',
    component: NewgroupefollowersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewgroupefollowersPageRoutingModule {}
