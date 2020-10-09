import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterFoodPage } from './register-food.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterFoodPageRoutingModule {}
