import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  todoSubject = new Subject<Todo[]>();
  tabIndex = new Subject<number>();

  constructor() {}

  saveTodo(todo: Todo) {
    if (localStorage.getItem(`todos`)) {
      const todosStorage: Todo[] = JSON.parse(
        localStorage.getItem('todos') ?? ''
      );
      todosStorage.push(todo);
      localStorage.setItem('todos', JSON.stringify(todosStorage));
    } else {
      this.todos.push(todo);
      localStorage.setItem(`todos`, JSON.stringify(this.todos));
    }
    this.todoSubject.next(this.getTodos());
    this.tabIndex.next(0);
  }

  editTodo(todo: Todo, id: number) {
    const todoArray = this.getTodos();
    todoArray[id] = todo;
    localStorage.setItem(`todos`, JSON.stringify(todoArray));
    this.todoSubject.next(this.getTodos());
  }

  getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem(`todos`) ?? '');
  }

  deleteTodo(index: number) {
    const todos = this.getTodos();
    todos.splice(index, 1);
    localStorage.setItem(`todos`, JSON.stringify(todos));
    this.todoSubject.next(this.getTodos());
  }
}
