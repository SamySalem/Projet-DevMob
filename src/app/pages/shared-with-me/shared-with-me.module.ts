import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedWithMePageRoutingModule } from './shared-with-me-routing.module';

import { SharedWithMePage } from './shared-with-me.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedWithMePageRoutingModule
  ],
  declarations: [SharedWithMePage]
})
export class SharedWithMePageModule {}
