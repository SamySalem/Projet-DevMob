import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from 'src/app/modals/create-list/create-list.component';
import { List } from 'src/app/model/list';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lists: List[];

  constructor(private listService: ListService, private modalController: ModalController) {}

  ngOnInit(){
    this.lists = this.listService.getAll();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    return await modal.present();
  }

}
