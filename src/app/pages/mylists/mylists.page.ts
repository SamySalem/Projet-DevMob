import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list';
import { ListService } from '../../services/list.service';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../../modals/create-list/create-list.component';

@Component({
  selector: 'app-mylists',
  templateUrl: './mylists.page.html',
  styleUrls: ['./mylists.page.scss'],
})
export class MylistsPage implements OnInit {

  private lists: List[];

  constructor(private listService: ListService, public modalController: ModalController) {
    this.lists = [];
  }

  ngOnInit(){
    this.listService.getAll(1).subscribe(res => this.lists = res);
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
