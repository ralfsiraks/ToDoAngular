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
import { ImageService } from '../services/image.service';
import { TodoService } from '../services/todo.service';
import { EditModalComponent } from './edit-modal.component';

describe('EditModalComponent', (): void => {
  let component: EditModalComponent;
  let fixture: ComponentFixture<EditModalComponent>;
  let httpMock: HttpTestingController;
  let todoService: TodoService;
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  let router: Router;
  const mockTodo = {
    name: 'testTodo',
    note: 'note',
    imgSrc: {
      src: 'image.url',
      alt: 'something',
    },
  };
  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [EditModalComponent],
      providers: [
        ImageService,
        TodoService,
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { id: 0 } },
      ],
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule],
    }).compileComponents();

    localStorage.setItem('todos', JSON.stringify([mockTodo]));

    fixture = TestBed.createComponent(EditModalComponent);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    todoService = TestBed.inject(TodoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach((): void => {
    httpMock.verify();
  });

  it('should test ngOnInit', (): void => {
    const updateStateSpy = spyOn(component, `updateState`);
    component.modalData.id = 0;
    component.ngOnInit();
    expect(component.todoId).toBe(0);
    expect(component.todoArray).toEqual([mockTodo]);
    expect(component.preselectedImage).toEqual(mockTodo.imgSrc);
    expect(component.todoForm.value).toEqual({
      name: `testTodo`,
      note: `note`,
      imgSrc: ``,
    });
    expect(component.currentTodo).toEqual(mockTodo);
    expect(component.editInfo).toEqual({ id: 0, todo: mockTodo });
    expect(updateStateSpy).toHaveBeenCalledWith(`single`);
  });

  it('should test updateState method', (): void => {
    const updateStateSpy = spyOn(component, `updateState`);
    component.updateState(`grid`);
    expect(updateStateSpy).toHaveBeenCalledWith(`grid`);
    component.updateState(`single`);
    expect(updateStateSpy).toHaveBeenCalledWith(`single`);
  });

  it('should test closeModal click', (): void => {
    const onCloseSpy = spyOn(component, `closeModal`);
    component.todoId = 0;
    fixture.nativeElement.querySelector(`.cancel-btn`).click();
    expect(onCloseSpy).toHaveBeenCalled();
  });

  it('should test closeModal method', (): void => {
    const routerNavigateSpy = spyOn(router, `navigate`);
    component.todoId = 0;
    component.closeModal();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/']);
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should test removeImage click', (): void => {
    const onRemoveSpy = spyOn(component, 'removeImage');
    component.todoId = 0;
    fixture.nativeElement.querySelector(`.remove-btn`).click();
    expect(onRemoveSpy).toHaveBeenCalled();
  });
  it('should test removeImage method', (): void => {
    const routerNavigateSpy = spyOn(router, `navigate`);
    component.todoId = 0;
    component.removeImage();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/']);
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
