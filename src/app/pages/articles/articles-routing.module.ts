import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesPage } from './articles.page';

const routes: Routes = [
  {
    path: 'options',
    component: ArticlesPage,
    children:[     
      {
        path: 'publications',
        loadChildren: () => import('./publications/publications.module').then( m => m.PublicationsPageModule)
      },
      {
        path: 'prearticle',
        loadChildren: () => import('./prearticle/prearticle.module').then( m => m.PrearticlePageModule)
      },
      {
        path: 'postarticle',
        loadChildren: () => import('./postarticle/postarticle.module').then( m => m.PostarticlePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'options/publications',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesPageRoutingModule {}
