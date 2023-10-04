import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
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
  urlId: string = '';
  constructor(
    public todoService: TodoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditModalComponent>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.urlId = this.activatedRoute.snapshot.params[`id`] ?? '';
  }

  // Pārbauda vai ir izveidoti kādi todo's
  ngOnInit(): void {
    this.doOnInit();
  }

  doOnInit(): void {
    if (localStorage.getItem(`todos`)) {
      this.todoArray = this.todoService.getTodos();
    }
    this.todoService.todoSubject.subscribe((newTodos) => {
      this.todoArray = newTodos;
    });

    // Pārbauda vai lapa ir atvērta ievadot URL manuāli
    if (this.urlId) {
      try {
        this.openEditDialog(+this.urlId);
      } catch (error) {
        this.router.navigate(['/']);
        this.dialog.closeAll();
        window.alert(error);
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
    const todoArray: Todo[] = this.todoService.getTodos();
    if (!todoArray[index]) {
      throw new Error("A ToDo with that ID wasn't found :(");
    }

    this.dialogRef = this.dialog.open(EditModalComponent, {
      width: `80rem`,
      height: `80vh`,
      data: { id: index },
      panelClass: 'custom-dialog',
    });
    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        this.router.navigate([`/`]);
      });
  }
  editNavigate(id: number) {
    this.router.navigate(['edit', id]);
  }
}
