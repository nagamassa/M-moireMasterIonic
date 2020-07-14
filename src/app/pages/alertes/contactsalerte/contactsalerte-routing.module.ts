import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsalertePage } from './contactsalerte.page';

const routes: Routes = [
  {
    path: '',
    component: ContactsalertePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsalertePageRoutingModule {}
