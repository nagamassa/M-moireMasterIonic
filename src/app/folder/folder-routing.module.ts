import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { IndexGuard } from '../guards/index.guard';
import { HomeGuard } from '../guards/home.guard';
import { UserDataResolver } from '../resolvers/userData.resolver';

const routes: Routes = [
  {
    path: '',
    // component: FolderPage,
    canActivate: [HomeGuard],
    resolve:{
      userData: UserDataResolver
    },
    children:[      
      {
        path: 'alertes',
        loadChildren: () => import('../pages/alertes/alertes.module').then( m => m.AlertesPageModule)
      },
      {
        path: 'articles',
        loadChildren: () => import('../pages/articles/articles.module').then( m => m.ArticlesPageModule)
      },
      {
        path: 'groupes',
        loadChildren: () => import('../pages/groupes/groupes.module').then( m => m.GroupesPageModule)
      },
      {
        path: 'agences',
        loadChildren: () => import('../pages/agences/agences.module').then( m => m.AgencesPageModule)
      },
      {
        path: 'autresarticles',
        loadChildren: () => import('../pages/autresarticles/autresarticles.module').then( m => m.AutresarticlesPageModule)
      },
      {
        path: 'signals',
        loadChildren: () => import('../pages/signals/signals.module').then( m => m.SignalsPageModule)
      },
      {
        path: 'blocages',
        loadChildren: () => import('../pages/blocages/blocages.module').then( m => m.BlocagesPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../pages/profil/profil.module').then( m => m.ProfilPageModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
