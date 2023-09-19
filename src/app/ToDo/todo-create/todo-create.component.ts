import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PexelsPhotos } from '../interfaces/pexels-photos';
import { Todo } from '../interfaces/todo';
import { ImageService } from '../services/image.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
})
export class TodoCreateComponent implements OnInit, AfterViewInit {
  todoForm: FormGroup;
  imageNotFound = ``;
  @ViewChild(`imgFormField`, { read: ElementRef }) imgFormField: ElementRef;
  loadingSpinner = false;
  fetchedImages: PexelsPhotos[] = [];
  curSelectedImage: string;

  constructor(
    private todoService: TodoService,
    private imageService: ImageService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      name: new FormControl(``, Validators.required),
      note: new FormControl(``),
      imgSrc: new FormControl(``),
    });
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
    if (this.todoForm.valid && this.todoForm.touched) {
      const formValue = this.todoForm.value;
      const todo: Todo = {
        name: formValue.name,
        note: formValue.note,
        imgSrc: this.curSelectedImage,
      };
      this.todoService.saveTodo(todo);
    }
    this.fetchedImages = [];
    this.todoForm.reset();
  }

  onSearchImage(query: string) {
    const nativeElement = this.imgFormField.nativeElement;
    this.loadingSpinner = true;
    if (query === ``) {
      this.renderer.addClass(nativeElement, `mat-form-field-invalid`);
      this.imageNotFound = `Can't search for nothing silly ;)`;
      this.loadingSpinner = false;
      return;
    }
    this.imageService.fetchImages(query).subscribe((res) => {
      if (res.photos.length === 0) {
        this.renderer.addClass(nativeElement, `mat-form-field-invalid`);
        this.imageNotFound = `No pictures found matching that search :(`;
        this.loadingSpinner = false;
        this.fetchedImages = [];
        this.updateData(`single`);
      } else {
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
}
