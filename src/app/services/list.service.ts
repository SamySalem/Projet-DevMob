import { Injectable } from '@angular/core';
import { List } from '../model/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public lists: List[];

  constructor() { 
    this.lists = [new List('Première liste'), new List('2ème liste')];
  }

  public getAll(): List[] {
    return this.lists;
  }

  public getOne(id: string): List {
    return this.lists.find(function(list){
      return list.id === id
    });
  }
  
  public add(list: List): void {
    this.lists.push(list);
  }

}
