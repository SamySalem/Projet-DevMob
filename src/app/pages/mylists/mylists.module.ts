import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MylistsPageRoutingModule } from './mylists-routing.module';

import { MylistsPage } from './mylists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MylistsPageRoutingModule
  ],
  declarations: [MylistsPage]
})
export class MylistsPageModule {}
