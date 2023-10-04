import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../services/todo.service';
import { DeleteModalComponent } from './delete-modal.component';

// Todo Service Stub
class TodoServiceStub {
  private todoSubject: Subject<Todo[]> = new Subject<Todo[]>();
  private mockTodos: Todo[] = [
    {
      name: 'testTodo',
      note: 'note',
      imgSrc: {
        src: 'image.url',
        alt: 'something',
      },
    },
  ];

  deleteTodo(index: number): void {
    this.mockTodos.splice(index, 1);
    this.todoSubject.next(this.mockTodos);
  }
}

describe('DeleteModalComponent', (): void => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let router: Router;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [DeleteModalComponent],
      providers: [
        { provide: TodoService, useClass: TodoServiceStub },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { id: 0 } },
      ],
      imports: [MatDialogModule, RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should test ngOnInit', (): void => {
    component.ngOnInit();
    expect(component.todoId).toEqual(component.modalData.id);
  });

  it('should test deleteing a todo', (): void => {
    const onDeleteSpy: jasmine.Spy = spyOn(component, 'onDelete');
    component.ngOnInit();
    component.todoId = 0;
    fixture.nativeElement.querySelector(`.delete-btn`).click();
    expect(onDeleteSpy).toHaveBeenCalledWith(0);
  });

  it('should test closing the delete modal', (): void => {
    const onCloseSpy: jasmine.Spy = spyOn(component, 'closeModal');
    component.ngOnInit();
    component.todoId = 0;
    fixture.nativeElement.querySelector(`.cancel-btn`).click();
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
