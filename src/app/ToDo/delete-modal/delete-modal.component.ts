import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  todoId: number;

  constructor(
    private todoService: TodoService,
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: { id: number }
  ) {}

  // Nosaka pašreizējo todo
  ngOnInit(): void {
    this.todoId = this.modalData.id;
  }

  // Izdzēš konkrēto ToDo
  onDelete(index: number): void {
    this.todoService.deleteTodo(index);
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
