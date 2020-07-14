import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexGuard } from './guards/index.guard';
import { HomeGuard } from './guards/home.guard';
import { UserDataResolver } from './resolvers/userData.resolver';

const routes: Routes = [
  {
    path: '',    
    redirectTo: 'folder/alertes',
    pathMatch: 'full',
    resolve:{
      userData: UserDataResolver
    },    
  },
  {
    // path: 'folder/:id',
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'piecepopup',
    loadChildren: () => import('./piecepopup/piecepopup.module').then( m => m.PiecepopupPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
