import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsPage } from './requests.page';
import { RequestsResolver } from './requests.resolver';

const routes: Routes = [
  {
    path: '',
    component: RequestsPage,
    resolve: {
      data: RequestsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsPageRoutingModule {}
