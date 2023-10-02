import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoService } from '../services/todo.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let todoService: TodoService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [TodoService],
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
