import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoRequestPage } from './do-request.page';

const routes: Routes = [
  {
    path: '',
    component: DoRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoRequestPageRoutingModule {}
