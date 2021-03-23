import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  private todoId: string;
  private listId: string;
  private todo: Todo;

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.todoId = params['todoId'];
      this.listId = params['listId'];
      this.todoService.getOne(this.todoId, this.listId).then(res => {
        console.log(res.name);
        this.todo = new Todo(res.name, res.description);
        this.todo.id = this.todoId;
      });
    });
  }

  ngOnInit() {    
  }

  update(todo: Todo, listId: string) {
    this.todoService.update(todo, listId);
  }
}
