import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilRestaurantePageRoutingModule } from './perfil-restaurante-routing.module';

import { PerfilRestaurantePage } from './perfil-restaurante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilRestaurantePageRoutingModule
  ],
  declarations: [PerfilRestaurantePage]
})
export class PerfilRestaurantePageModule {}
