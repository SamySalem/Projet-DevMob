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

  ngOnInit() {
    this.listService.getAll(1).subscribe(res => this.lists = res);
  }

  async openCreateModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    return await modal.present();
  }

  delete(listId: String) {
    this.listService.delete(listId);
  }

  reorderItems(ev) {
    const itemMove = this.lists.splice(ev.detail.from, 1)[0];
    this.lists.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
    // for (let i = 0; i < this.lists.length; i++) {
    //   this.listService.create(new List(this.lists[i].name));
    // }
  }
}
