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
  private shareType;

  @Input() listId: string;
  shareForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder,
    private listService: ListService) { }

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      email: new FormControl (this.email, [Validators.required, Validators.minLength(2)]),
      shareType: new FormControl (this.shareType, Validators.required)
   })
  }

  share(){
    console.log(this.shareForm.value)
    const email = this.shareForm.value.email;
    const shareType = this.shareForm.value.shareType;
    if (shareType === "readOnly"){
      this.listService.shareList(this.listId, false, email);
    } else {
      this.listService.shareList(this.listId, true, email);
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
