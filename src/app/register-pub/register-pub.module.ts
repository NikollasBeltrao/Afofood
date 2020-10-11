import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPubPageRoutingModule } from './register-pub-routing.module';

import { RegisterPubPage } from './register-pub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPubPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterPubPage]
})
export class RegisterPubPageModule {}
