import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { List } from '../models/list';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private lists: List[];
  private listsQuery: AngularFirestoreCollection<List>;

  constructor(private af:AngularFirestore) { 
    this.lists = [];
    this.listsQuery = this.af.collection('lists');
  }

  getAll(): Observable<List[]>{
    return this.listsQuery.snapshotChanges().pipe(
      map(actions => this.convertSnapshotData<List>(actions))
    );
  }

  private convertSnapshotData<Type>(actions) {
    return actions.map(action => {
      const data = action.payload.doc.data();
      const id = action.payload.doc.id;
      return {id, ...data} as Type;
    });
  }

  getOne(id: string): Observable<List>{
    return this.listsQuery?.doc<List>(id).valueChanges().pipe(
      switchMap(list =>
        this.listsQuery.doc(id).collection<Todo>('todos').snapshotChanges().pipe(
          map(actions => {
            list.todos = this.convertSnapshotData<Todo>(actions);
            return list;
          })
        )
      )
    );
  }

  create(list: List){
    this.lists.push(list);
  }

  addTodo(todo: Todo, listId: string){
    //this.getOne(listId).todos.push(todo);
  }

  delete(list){
    this.lists.splice(this.lists.indexOf(list), 1);
  }

  deleteTodo(todo: Todo, listId: string){
    const list = this.getOne(listId);
    //list.todos.splice(list.todos.indexOf(todo), 1);
  }
}
