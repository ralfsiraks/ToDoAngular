import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PexelsPhotos } from '../interfaces/pexels-photos';
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
  imageNotFound = ``;
  @ViewChild(`imgFormField`, { read: ElementRef }) imgFormField: ElementRef;
  loadingSpinner = false;
  fetchedImages: PexelsPhotos[] = [];
  curSelectedImage: string;
  todoArray: Todo[];
  todoId: number;
  preselectedImage: string;
  currentTodo: Todo;
  showSearch = false;

  constructor(
    private todoService: TodoService,
    private imageService: ImageService,
    private renderer: Renderer2,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: { id: number },
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todoId =
      this.activatedRoute.snapshot.params[`id`] || this.modalData.id;
    this.todoArray = this.todoService.getTodos();
    this.preselectedImage = this.curSelectedImage =
      this.todoArray[this.todoId].imgSrc!;
    this.todoForm = new FormGroup({
      name: new FormControl(
        `${this.todoArray[this.todoId].name}`,
        Validators.required
      ),
      note: new FormControl(`${this.todoArray[this.todoId].note}`),
      imgSrc: new FormControl(``),
    });
    const formValue = this.todoForm.value;
    this.currentTodo = {
      name: formValue.name,
      note: formValue.note,
      imgSrc: this.curSelectedImage,
    };
    this.updateData(`single`);
  }

  ngAfterViewInit(): void {
    this.todoForm.get(`imgSrc`)?.valueChanges.subscribe((value) => {
      const nativeElement = this.imgFormField.nativeElement;
      if (nativeElement.classList.contains(`mat-form-field-invalid`)) {
        this.renderer.removeClass(nativeElement, `mat-form-field-invalid`);
        this.imageNotFound = ``;
      }
    });
  }

  selectedImage(src: string) {
    this.curSelectedImage = src;
  }

  onSubmit() {
    console.log(this.curSelectedImage);
    if (this.todoForm.valid && this.todoForm.touched) {
      console.log(`valid`);
      const formValue = this.todoForm.value;
      const todo: Todo = {
        name: formValue.name,
        note: formValue.note,
        imgSrc: this.curSelectedImage,
      };
      this.todoService.editTodo(todo, this.todoId);
      this.router.navigate([`/`]);
      this.dialogRef.close();
    }
  }

  onSearchImage(query: string) {
    this.loadingSpinner = true;
    if (query.trim() === ``) {
      this.imageNotFound = `Can't search for nothing silly ;)`;
      this.loadingSpinner = false;
      return;
    }
    const nativeElement = this.imgFormField.nativeElement;
    this.imageService.fetchImages(query).subscribe((res) => {
      if (res.photos.length === 0) {
        this.renderer.addClass(nativeElement, `mat-form-field-invalid`);
        this.imageNotFound = `No pictures found matching that search :(`;
        this.loadingSpinner = false;
        this.fetchedImages = [];
        this.updateData(`single`);
      } else {
        this.showSearch = true;
        this.updateData(`grid`);
        this.fetchedImages = res.photos;
        this.loadingSpinner = false;
      }
    });
  }

  updateData(data: string) {
    const newData = data;
    this.imageService.updateData(newData);
  }

  removeImage() {
    this.curSelectedImage = ``;
    this.dialog.closeAll();
    this.router.navigate([`/`]);
    const todoArray = this.todoService.getTodos();
    todoArray[this.todoId].imgSrc = ``;
    localStorage.setItem(`todos`, JSON.stringify(todoArray));
  }
}
