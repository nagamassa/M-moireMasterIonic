import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePage } from './welcome.page';
import { IndexGuard } from '../guards/index.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
    // canActivate: [IndexGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
