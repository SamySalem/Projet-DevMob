import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.scss'],
})
export class ShareListComponent implements OnInit {
  private email;
  private write;

  @Input() listId: string;
  shareForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder,
    private listService: ListService) { }

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      email: new FormControl (this.email, [Validators.required, Validators.email]),
      write: new FormControl (this.write),
   })
  }

  share(){
    console.log(this.shareForm.value)
    const email = this.shareForm.value.email;
    const write = this.shareForm.value.write;
    console.log(write)
    if (write){
      this.listService.shareList(this.listId, true, email);
    } else {
      this.listService.shareList(this.listId, false, email);
    }
    this.dismissModal();
  }

  get errorControl() {
    return this.shareForm.controls;
  }

  dismissModal() {
    this.modalController.dismiss(); 
  }

}
