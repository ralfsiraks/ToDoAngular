// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HttpClientModule } from '@angular/common/http';
// import { FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TodoModel } from 'src/app/Models/todo.model';
// import { ImageService } from '../services/image.service';
// import { FormComponent } from './form.component';

// describe('FormComponent', () => {
//   let component: FormComponent;
//   let fixture: ComponentFixture<FormComponent>;
//   let imageService: ImageService;
//   let router: Router;
//   const newTodo: TodoModel = new TodoModel(`test`, `test`, `test`, `test`);
//   let mockFormData = {
//     name: 'test',
//     note: 'test',
//     imgSrc: `test`,
//   };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
//       declarations: [FormComponent],
//       providers: [
//         ImageService,
//         { provide: MatDialogRef, useValue: {} },
//         { provide: MAT_DIALOG_DATA, useValue: {} },
//       ],
//     }).compileComponents();

//     imageService = TestBed.inject(ImageService);
//     router = TestBed.inject(Router);
//     fixture = TestBed.createComponent(FormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should test ngOnInit if edit todo with image', (): void => {
//     const todo = newTodo.getTodo;
//     component.editInfo = { id: 0, todo };
//     component.ngOnInit();
//     expect(component.todoForm).toBeInstanceOf(FormGroup);
//     expect(component.todoForm.value).toEqual({
//       name: `test`,
//       note: `test`,
//       imgSrc: '',
//     });
//     expect(component.todoId).toBe(0);
//     expect(component.curSelectedImage).toEqual({ src: `test`, alt: `test` });
//   });

//   it('should test ngOnInit if add new todo', (): void => {
//     component.ngOnInit();
//     expect(component.editInfo).toBeUndefined();
//     expect(component.todoForm.value).toEqual({
//       name: ``,
//       note: ``,
//       imgSrc: ``,
//     });
//   });

//   it('should test selectedImage', (): void => {
//     const todo = newTodo.getTodo;
//     const testSrc = { src: `test`, alt: `test` };
//     component.editInfo = { id: 0, todo };
//     component.selectedImage(testSrc);
//     expect(component.curSelectedImage).toEqual(testSrc);
//   });

//   it('should test onSubmit if form !valid || !touched', (): void => {
//     const todo = newTodo.getTodo;
//     component.editInfo = { id: 0, todo };
//     expect(component.fetchedImages).toEqual([]);
//   });

//   it('should test onSubmit if form valid && touched && in edit mode', (): void => {
//     const formDirectiveSpy = spyOn(component.formGroupDirective, `resetForm`);
//     const todo = newTodo.getTodo;
//     component.editInfo = { id: 0, todo };
//     component.ngOnInit();
//     component.todoForm.touched === true;
//     component.todoForm.setValue(mockFormData);
//     expect(component.todoForm.status).toBe('VALID');
//     component.onSubmit();
//   });

//   it('form should be invalid if empty', (): void => {
//     expect(component.todoForm.status).toEqual('INVALID');
//   });s

//   it('form should be valid when filled', (): void => {
//     component.todoForm.setValue(mockFormData);
//     expect(component.todoForm.status).toBe('VALID');
//   });
// });
