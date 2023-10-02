import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DeleteModalComponent } from './delete-modal.component';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let router: Router;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [DeleteModalComponent],
      providers: [
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
    const onDeleteSpy = spyOn(component, 'onDelete');
    component.ngOnInit();
    component.todoId = 0;
    fixture.nativeElement.querySelector(`.delete-btn`).click();
    expect(onDeleteSpy).toHaveBeenCalledWith(0);
  });

  it('should test closing the delete modal', (): void => {
    const onCloseSpy = spyOn(component, 'closeModal');
    component.ngOnInit();
    component.todoId = 0;
    fixture.nativeElement.querySelector(`.cancel-btn`).click();
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
