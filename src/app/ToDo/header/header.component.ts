import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  selectedTabIndex: number = 0;
  constructor(private todoService: TodoService) {}

  // Sākumā norāda "My Todo's" sekciju
  ngOnInit(): void {
    this.todoService.tabIndex.pipe(take(1)).subscribe((val) => {
      this.selectedTabIndex = 0;
    });
  }
}
