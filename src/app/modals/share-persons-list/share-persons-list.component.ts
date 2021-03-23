import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-share-persons-list',
  templateUrl: './share-persons-list.component.html',
  styleUrls: ['./share-persons-list.component.scss'],
})
export class SharePersonsListComponent implements OnInit {
  listId;
  list: any;

  constructor(private modalController: ModalController, private listService: ListService) { }

  ngOnInit() {
    this.listService.getOne(this.listId).subscribe(res => this.list = res);
  }

  dismissModal() {
    this.modalController.dismiss(); 
  }

  deleteFromRead(email: string) {
    this.listService.deleteFromRead(this.listId, email);
  }

  deleteFromWrite(email: string) {
    console.log(email);
    this.listService.deleteFromWrite(this.listId, email);
  }
}
