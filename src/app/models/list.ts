import { Todo } from './todo';

export class List {
constructor(name){
    this.todos = [];
    this.name = name;
}

    name: string;
    todos: Todo[];
    owner: string;
    canRead: string[];
    canWrite: string[];
}
