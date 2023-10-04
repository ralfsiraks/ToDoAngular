import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EditInfo } from '../interfaces/edit-info';
import { SrcAlt } from '../interfaces/src-alt';
import { Todo } from '../interfaces/todo';
import { ImageService } from '../services/image.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  todoForm: FormGroup;
  curSelectedImage: SrcAlt;
  todoArray: Todo[];
  todoId: number;
  preselectedImage: SrcAlt;
  currentTodo: Todo;
  editInfo: EditInfo;

  constructor(
    private todoService: TodoService,
    private imageService: ImageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: { id: number },
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Iegūst ToDo id pēc url vai no modal datiem
    this.todoId =
      this.activatedRoute.snapshot.params[`id`] || this.modalData.id;
    this.todoArray = this.todoService.getTodos();
    const imgSrc: SrcAlt | undefined = this.todoArray[this.todoId]?.imgSrc;
    if (imgSrc) {
      this.preselectedImage = this.curSelectedImage = imgSrc;
    }

    // Edit formas setup
    this.todoForm = new FormGroup({
      name: new FormControl(
        this.todoArray[this.todoId].name,
        Validators.required
      ),
      note: new FormControl(this.todoArray[this.todoId].note),
      imgSrc: new FormControl(''),
    });

    // Pašreizējā todo setup
    const formValue: { name: string; note: string; imgSrc: SrcAlt } =
      this.todoForm.value;
    this.currentTodo = {
      name: formValue.name,
      note: formValue.note,
      imgSrc: this.curSelectedImage,
    };

    // Sagatavo info par todo kuru editos lai nosūtītu uz image-search component
    this.editInfo = {
      id: this.todoId,
      todo: this.currentTodo,
    };

    this.updateState(`single`);
  }

  // Nosaka vai parādīt grid ar bildēm vai tikai 1
  updateState(data: string): void {
    this.imageService.updateState(data);
  }

  // Noņem attēlu no specifiskā todo un saglabā
  removeImage(): void {
    const todoArray: Todo[] = this.todoService.getTodos();
    delete todoArray[this.todoId].imgSrc;
    localStorage.setItem(`todos`, JSON.stringify(todoArray));
    this.dialogRef.close();
    this.router.navigate([`/`]);
  }

  closeModal(): void {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
