import {Component, OnInit} from '@angular/core'
import {Todo, TodosService} from "./todos.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];
  title: string = '';
  loading: boolean = false;
  error:string = '';

  constructor(private todosService: TodosService) {

  }

  ngOnInit() {
    this.fetchToDos();
  }

  fetchToDos() {
    this.loading = true;
    this.todosService.fetchToDos()
      .subscribe(todos => {
        this.todos = todos
        this.loading = false;
      },error => {
        this.error = error.message;
      });
  }

  addToDo() {
    if (!this.title.trim()) {
      return;
    }
    const newToDo: Todo = {
      title: this.title,
      completed: false
    }
    this.todosService.addToDo(newToDo).subscribe(todo => {
      this.todos.push(todo)
      this.title = ''
    });
  }

  completeTodo(id: number) {
    this.todosService.completeToDo(id).subscribe(todo => {
      this.todos.find(t => t.id === todo.id)!.completed = true;
    })
  }

  removeToDo(id: number) {
    this.todosService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(i => i.id !== id);
      });
  }
}

