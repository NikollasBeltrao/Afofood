import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterFoodPageRoutingModule } from './register-food-routing.module';

import { RegisterFoodPage } from './register-food.page';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagInputModule,
    ReactiveFormsModule,
    RegisterFoodPageRoutingModule
  ],
  declarations: [RegisterFoodPage]
})
export class RegisterFoodPageModule {}
