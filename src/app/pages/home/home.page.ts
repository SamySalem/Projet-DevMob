import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list';
import { ListService } from '../../services/list.service';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../../modals/create-list/create-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private lists: List[];

  constructor(private listService: ListService, public modalController: ModalController) {
    this.lists = [];
  }

  ngOnInit(){
    this.listService.getAll().subscribe(res => this.lists = res);
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    return await modal.present();
  }

  delete(listId: String){
    this.listService.delete(listId);
  }
}
