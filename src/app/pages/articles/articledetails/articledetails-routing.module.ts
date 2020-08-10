import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticledetailsPage } from './articledetails.page';

const routes: Routes = [
  {
    path: '',
    component: ArticledetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticledetailsPageRoutingModule {}
