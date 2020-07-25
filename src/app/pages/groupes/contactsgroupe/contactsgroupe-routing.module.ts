import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsgroupePage } from './contactsgroupe.page';

const routes: Routes = [
  {
    path: '',
    component: ContactsgroupePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsgroupePageRoutingModule {}
