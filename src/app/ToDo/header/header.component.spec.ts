import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { HeaderComponent } from './header.component';

// Todo Service Stub
class TodoServiceStub {
  private tabIndex = new Subject<number>();
}

// Mock Todo List Component
@Component({
  selector: 'app-todo-list',
  template: '<p>Mock Todo List Component</p>',
})
class MockTodoListComponent {}

// Mock Form Component
@Component({
  selector: 'app-form',
  template: '<p>Mock Todo List Component</p>',
})
class MockFormComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let todoService: TodoService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, MockTodoListComponent, MockFormComponent],
      providers: [{ provide: TodoService, useClass: TodoServiceStub }],
      imports: [MatTabsModule, BrowserAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', (): void => {
    component.ngOnInit();
    todoService.tabIndex.next(69);
    expect(component.selectedTabIndex).toBe(0);
  });
});
