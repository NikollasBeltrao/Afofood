import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilRestaurantePage } from './perfil-restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilRestaurantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRestaurantePageRoutingModule {}
