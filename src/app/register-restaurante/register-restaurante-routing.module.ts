import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterRestaurantePage } from './register-restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterRestaurantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRestaurantePageRoutingModule {}
