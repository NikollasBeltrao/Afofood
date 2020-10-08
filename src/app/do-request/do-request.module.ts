import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoRequestPageRoutingModule } from './do-request-routing.module';

import { DoRequestPage } from './do-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DoRequestPageRoutingModule
  ],
  declarations: [DoRequestPage]
})
export class DoRequestPageModule {}
