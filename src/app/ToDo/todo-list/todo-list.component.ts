import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  currentTodo: Todo;
  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditModalComponent>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // Pārbauda vai ir izveidoti kādi todo's
  ngOnInit(): void {
    if (localStorage.getItem(`todos`)) {
      this.todoArray = this.todoService.getTodos();
    }
    this.todoService.todoSubject.subscribe((newTodos) => {
      this.todoArray = newTodos;
    });

    const urlId = this.activatedRoute.snapshot.params[`id`];

    // Pārbauda vai lapa ir atvērta ievadot URL manuāli
    if (urlId) {
      try {
        this.openEditDialog(+urlId);
      } catch (error) {
        this.router.navigate(['/']).then();
        this.dialog.closeAll();
        alert(error);
      }
    }
  }

  // Atver dzēšanas modal
  openDeleteDialog(index: number): void {
    this.dialog.open(DeleteModalComponent, {
      data: { id: index },
    });
  }

  // Atver editošanas modal
  openEditDialog(index: number): void {
    const todoArray = this.todoService.getTodos();
    if (!todoArray[index]) {
      throw new Error("A ToDo with that ID wasn't found :(");
    }
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: `80rem`,
      height: `80vh`,
      data: { id: index },
      panelClass: 'custom-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate([`/`]);
      this.dialog.closeAll();
    });
  }
}
