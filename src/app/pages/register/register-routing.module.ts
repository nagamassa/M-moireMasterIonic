import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';
import { IndexGuard } from 'src/app/guards/index.guard';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    canActivate: [IndexGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
