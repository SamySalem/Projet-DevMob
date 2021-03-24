import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ActivatedRoute } from '@angular/router';
import { ShareListComponent } from 'src/app/modals/share-list/share-list.component';
import { SharePersonsListComponent } from 'src/app/modals/share-persons-list/share-persons-list.component';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  private list: List;
  private listId: string;

  constructor(private listService: ListService, private todoService: TodoService,
     private modalController: ModalController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('listId')
    this.listService.getOne(this.listId).subscribe(res => this.list = res);
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        'listId': this.listId
      }
    });
    return await modal.present();
  }

  async openShareModal(){
    const modal = await this.modalController.create({
      component: ShareListComponent,
      componentProps: {
        'listId': this.listId
      }
    });
    return await modal.present();
  }

  async openUsersModal(){
    const modal = await this.modalController.create({
      component: SharePersonsListComponent,
      componentProps: {
        'listId': this.listId,
      }
    });
    return await modal.present();
  }

  delete(todo){
    this.listService.deleteTodo(todo, this.listId);
  }

  isdone(todo){
    this.listService.isDone(todo, this.listId);
  }

}
