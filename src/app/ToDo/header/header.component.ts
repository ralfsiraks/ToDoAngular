import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  selectedTabIndex = 0;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.tabIndex.subscribe((val) => {
      this.selectedTabIndex = 0;
    });
  }
}
