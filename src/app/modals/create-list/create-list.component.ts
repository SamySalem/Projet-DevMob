import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { List } from 'src/app/model/list';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  listForm: FormGroup;

  constructor(private fb: FormBuilder, private listService: ListService, private modalController: ModalController) {
    this.listForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    })
   }

  ngOnInit() {}

  public save(name: string){
    this.listService.add(new List(this.listForm.get('name').value));
    this.modalController.dismiss();
  }

}
