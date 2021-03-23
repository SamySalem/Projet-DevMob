import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-share-persons-list',
  templateUrl: './share-persons-list.component.html',
  styleUrls: ['./share-persons-list.component.scss'],
})
export class SharePersonsListComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss(); 
  }
}
