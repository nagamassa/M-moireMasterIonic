import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertesPage } from './alertes.page';

const routes: Routes = [
  {
    path: 'options',
    component: AlertesPage,
    children:[
      
      {
        path: 'coursalerte',
        loadChildren: () => import('./coursalerte/coursalerte.module').then( m => m.CoursalertePageModule)
      },
      {
        path: 'histalerte',
        loadChildren: () => import('./histalerte/histalerte.module').then( m => m.HistalertePageModule)
      },
      {
        path: 'prealerte',
        loadChildren: () => import('./prealerte/prealerte.module').then( m => m.PrealertePageModule)
      },
      {
        path: 'statalerte',
        loadChildren: () => import('./statalerte/statalerte.module').then( m => m.StatalertePageModule)
      },
      {
        path: 'coursalerte/mycoursdetails/:id',
        loadChildren: () => import('./mycoursdetails/mycoursdetails.module').then( m => m.MycoursdetailsPageModule)
      },
      {
        path: 'coursalerte/contactsalerte/:id',
        loadChildren: () => import('./contactsalerte/contactsalerte.module').then( m => m.ContactsalertePageModule)
      },
      {
        path: 'coursalerte/contactsalerte/:id/newgroupefollowers',
        loadChildren: () => import('./newgroupefollowers/newgroupefollowers.module').then( m => m.NewgroupefollowersPageModule)
      },
      {
        path: 'coursalerte/contactsalerte/:id/newlocalitefollowers',
        loadChildren: () => import('./newlocalitefollowers/newlocalitefollowers.module').then( m => m.NewlocalitefollowersPageModule)
      },
      {
        path: 'coursalerte/contactsalerte/:id/newalerteagencefollower',
        loadChildren: () => import('./newalerteagencefollower/newalerteagencefollower.module').then( m => m.NewalerteagencefollowerPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'options/coursalerte',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertesPageRoutingModule {}
