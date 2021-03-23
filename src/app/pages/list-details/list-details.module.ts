import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailsPageRoutingModule } from './list-details-routing.module';

import { ListDetailsPage } from './list-details.page';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ShareListComponent } from 'src/app/modals/share-list/share-list.component';
import { SharePersonsListComponent } from 'src/app/modals/share-persons-list/share-persons-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ListDetailsPageRoutingModule
  ],
  declarations: [ListDetailsPage, CreateTodoComponent, ShareListComponent, SharePersonsListComponent]
})
export class ListDetailsPageModule {}
