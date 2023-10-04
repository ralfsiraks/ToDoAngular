import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  todoSubject: Subject<Todo[]> = new Subject<Todo[]>();
  tabIndex: Subject<number> = new Subject<number>();

  constructor() {}

  // Saglabā todo
  saveTodo(todo: Todo): void {
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

  // Edito todo
  editTodo(todo: Todo, id: number): void {
    const todoArray: Todo[] = this.getTodos();
    todoArray[id] = todo;
    localStorage.setItem(`todos`, JSON.stringify(todoArray));
    this.todoSubject.next(this.getTodos());
  }

  // Iegūst visus todo no localstorage
  getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem(`todos`) ?? '');
  }

  // Izdzēš todo
  deleteTodo(index: number): void {
    const todos: Todo[] = this.getTodos();
    todos.splice(index, 1);
    localStorage.setItem(`todos`, JSON.stringify(todos));
    this.todoSubject.next(this.getTodos());
  }
}
