import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewlocalitefollowersPage } from './newlocalitefollowers.page';

const routes: Routes = [
  {
    path: '',
    component: NewlocalitefollowersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewlocalitefollowersPageRoutingModule {}
