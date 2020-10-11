import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPubPage } from './register-pub.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPubPageRoutingModule {}
