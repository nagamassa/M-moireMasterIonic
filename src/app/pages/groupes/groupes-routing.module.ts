import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupesPage } from './groupes.page';

const routes: Routes = [
  {
    path: '',
    component: GroupesPage
  },
  {
    path: 'groupedetails/:id',
    loadChildren: () => import('./groupedetails/groupedetails.module').then( m => m.GroupedetailsPageModule)
  },
  {
    path: 'contactsgroupe/:id',
    loadChildren: () => import('./contactsgroupe/contactsgroupe.module').then( m => m.ContactsgroupePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupesPageRoutingModule {}
