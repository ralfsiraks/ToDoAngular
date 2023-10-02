import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { Todo } from '../interfaces/todo';
import { ImageService } from '../services/image.service';
import { TodoService } from '../services/todo.service';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let router: Router;
  let todoService: TodoService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        ImageService,
        HttpTestingController,
        TodoService,
      ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();

    localStorage.setItem(
      'todos',
      JSON.stringify([
        {
          name: 'testTodo',
          note: 'note',
          imgSrc: {
            src: 'image.url',
            alt: 'something',
          },
        },
      ])
    );
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should test if doOnInit is called', (): void => {
    spyOn(component, `doOnInit`);
    component.ngOnInit();
    expect(component.doOnInit).toHaveBeenCalled();
    expect(component.todoArray).not.toBeUndefined();
  });

  it('should get all Todos on init', (): void => {
    component.ngOnInit();
    expect(component.todoArray).toEqual(
      JSON.parse(localStorage.getItem('todos') ?? '')
    );
  });

  it('should get new Todos when a new one is created', (): void => {
    const newTodos: Todo[] = [
      {
        name: 'testTodo',
        note: 'type1',
        imgSrc: {
          src: 'image.url',
          alt: 'Something',
        },
      },
      {
        name: 'testTodo',
        note: 'type1',
        imgSrc: {
          src: 'image.url',
          alt: 'Something',
        },
      },
    ];
    todoService.todoSubject.next(newTodos);
    expect(component.todoArray).toEqual(newTodos);
  });

  it('should open edit dialog if route is in edit mode', (): void => {
    const openEditDialogSpy = spyOn(component, `openEditDialog`);
    component.urlId = `0`;
    component.ngOnInit();
    expect(openEditDialogSpy).toHaveBeenCalledWith(+component.urlId);
    expect(component.dialogRef).toBeDefined();
  });

  it('should throw error if params id does not match any todo', (): void => {
    const dialogSpy = spyOn(component.dialog, 'closeAll');
    const routerSpy = spyOn(router, 'navigate');
    const alertSpy = spyOn(window, 'alert');
    component.urlId = `69`;
    component.ngOnInit();
    expect(routerSpy).toHaveBeenCalledWith(['/']);
    expect(dialogSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(
      Error(`A ToDo with that ID wasn't found :(`)
    );
  });

  it('should test if deleteModal is called', (): void => {
    spyOn(component, `openDeleteDialog`);
    fixture.nativeElement.querySelector(`.delete-button`).click();
    expect(component.openDeleteDialog).toHaveBeenCalled();
  });

  it('should test if deleteModalComponent is called correctly', (): void => {
    const index = 0;
    spyOn(component.dialog, `open`);
    component.openDeleteDialog(index);
    expect(component.dialog.open).toHaveBeenCalledWith(DeleteModalComponent, {
      data: { id: index },
    });
  });
});
