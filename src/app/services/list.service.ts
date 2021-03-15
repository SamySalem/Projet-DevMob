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

  async create(list: List){
    await this.listsQuery.add({
      name: list.name,
      todos: list.todos,
    });
  }

  async addTodo(todo: Todo, listId: string){
    await this.listsQuery.doc<List>(listId).collection("todos").add({
      name: todo.name,
      description: todo.description,
    });
  }

  delete(listId){
    this.listsQuery.doc(listId).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }

  deleteTodo(todo: Todo, listId: string){
    this.listsQuery.doc<List>(listId).collection("todos").doc<Todo>(todo.id).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }
}
