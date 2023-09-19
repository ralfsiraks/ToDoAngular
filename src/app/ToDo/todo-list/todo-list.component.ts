import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoArray: Todo[] = [];
  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditModalComponent>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem(`todos`)) {
      this.todoArray = this.todoService.getTodos();
    }
    this.todoService.todoSubject.subscribe((newTodos) => {
      this.todoArray = newTodos;
    });

    if (this.activatedRoute.snapshot.params[`id`]) {
      this.openEditDialog(+this.activatedRoute.snapshot.params[`id`]);
    } else {
      this.dialog.closeAll();
    }
  }

  openDeleteDialog(index: number) {
    this.dialog.open(DeleteModalComponent, {
      data: { id: index },
    });
  }

  openEditDialog(index: number) {
    this.dialog.open(EditModalComponent, {
      width: `80rem`,
      data: { id: index },
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed', result);
    // });
  }
}
