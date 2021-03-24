import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { List } from '../models/list';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private todo: Todo;
  private lists: List[];
  private listsQuery: AngularFirestoreCollection<List>;
  private myLists: AngularFirestoreCollection<List>;
  private sharedRead: AngularFirestoreCollection<List>;
  private sharedWrite: AngularFirestoreCollection<List>;
  private user;

  constructor(private af:AngularFirestore) { 
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = firebase.auth().currentUser;
        this.lists = [];
        this.listsQuery = this.af.collection('lists');
        this.myLists = this.af.collection('lists', req => req.where('owner', '==', this.user?.email));
        this.sharedRead = this.af.collection('lists', req => req.where('canRead', 'array-contains', this.user?.email));
        this.sharedWrite = this.af.collection('lists', req => req.where('canWrite', 'array-contains', this.user?.email));
      }
      else {
        // User is signed out.
      }
    })
    
  }

  getAll(listType): Observable<List[]>{
    let currentList; 
    switch(listType) { 
      case 0: { 
        currentList = this.listsQuery;
         break; 
      } 
      case 1: { 
        currentList = this.myLists;
         break; 
      }
      case 2: { 
        currentList = this.sharedRead;
         break; 
      }
      case 3: { 
        currentList = this.sharedWrite;
         break; 
      }
   } 
    return currentList.snapshotChanges().pipe(
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
      owner: this.user.email,
      canRead: [],
      canWrite: [],
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
  
  isDone(todo: Todo, listId: string){
    this.listsQuery.doc(listId).collection('todos').doc(todo.id).update({
      isDone: !todo.isDone,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  async shareList(listId: string, arg1: boolean, email: string) {
    const listRef = this.af.collection('lists').doc(listId);
    if(arg1){
      await listRef.update({
        canRead: firebase.firestore.FieldValue.arrayRemove(email),
        canWrite: firebase.firestore.FieldValue.arrayUnion(email),
      });
    } else {
      await listRef.update({
        canWrite: firebase.firestore.FieldValue.arrayRemove(email),
        canRead: firebase.firestore.FieldValue.arrayUnion(email),
      });
    }
  }

  async deleteFromRead(listId: string, email: string) {
    const listRef = this.af.collection('lists').doc(listId);
    await listRef.update({
      canRead: firebase.firestore.FieldValue.arrayRemove(email),
    });
  }

  async deleteFromWrite(listId: string, email: string) {
    const listRef = this.af.collection('lists').doc(listId);
    await listRef.update({
      canWrite: firebase.firestore.FieldValue.arrayRemove(email),
    });
  }
}
