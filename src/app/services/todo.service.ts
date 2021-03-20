import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { List } from '../models/list';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private listsQuery: AngularFirestoreCollection<List>;

  constructor(private af: AngularFirestore) {
    this.listsQuery = this.af.collection('lists');
  }

  async getOne(id: string, listId: string) {
    const docRequest = await this.listsQuery.doc<List>(listId).collection('todos').doc<Todo>(id).get().toPromise();
    return docRequest.data();
  }

  update(todo: Todo, listId: string) {
    this.listsQuery.doc<List>(listId).collection('todos').doc<Todo>(todo.id).set({
      name: todo.name,
      description: todo.description,
      isDone: todo.isDone,
      id: todo.id
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  private convertSnapshotData<Type>(actions) {
    return actions.map(action => {
      const data = action.payload.doc.data();
      const id = action.payload.doc.id;
      return { id, ...data } as Type;
    });
  }
}
