import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.page.html',
  styleUrls: ['./shared-with-me.page.scss'],
})
export class SharedWithMePage implements OnInit {
  private sharedRead = []; 
  private sharedWrite = []; 

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getAll(2).subscribe(res => this.sharedRead = res);
    this.listService.getAll(3).subscribe(res => this.sharedWrite = res);
  }

}
