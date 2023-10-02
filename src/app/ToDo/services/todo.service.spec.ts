import { TestBed } from '@angular/core/testing';

import { TodoModel } from 'src/app/Models/todo.model';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoModel: TodoModel;
  const newTodo: TodoModel = new TodoModel(`test`, `test`, `test`, `test`);

  beforeEach((): void => {
    TestBed.configureTestingModule({});
    todoModel = new TodoModel(`mock`, `test`, `mockUrl`, `mockAlt`);
    localStorage.setItem(`todos`, JSON.stringify([todoModel.getTodo]));
    todoService = TestBed.inject(TodoService);
  });

  it('should save a new todo', (): void => {
    todoService.saveTodo(newTodo.getTodo);
    expect(todoService.getTodos()).toContain(newTodo.getTodo);
  });

  it('should get all todos', (): void => {
    expect(todoService.getTodos()).toEqual(
      JSON.parse(localStorage.getItem(`todos`) ?? '')
    );
  });

  it('should delete a todo', (): void => {
    todoService.deleteTodo(0);
    expect(todoService.getTodos().length).toEqual(0);
  });

  it('should edit a todo', (): void => {
    todoService.editTodo(newTodo.getTodo, 0);
    expect(todoService.getTodos()[0]).toEqual(newTodo.getTodo);
  });
});
