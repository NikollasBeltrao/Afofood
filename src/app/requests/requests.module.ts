import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsPageRoutingModule } from './requests-routing.module';

import { RequestsPage } from './requests.page';
import { RequestsResolver } from './requests.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestsPageRoutingModule
  ],
  declarations: [RequestsPage],
  providers: [
    RequestsResolver
  ]
})
export class RequestsPageModule {}
