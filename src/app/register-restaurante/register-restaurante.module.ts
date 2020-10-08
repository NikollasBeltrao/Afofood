import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterRestaurantePageRoutingModule } from './register-restaurante-routing.module';

import { RegisterRestaurantePage } from './register-restaurante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterRestaurantePageRoutingModule
  ],
  declarations: [RegisterRestaurantePage]
})
export class RegisterRestaurantePageModule {}
