import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { EditInfo } from '../interfaces/edit-info';
import { PexelsPhotos } from '../interfaces/pexels-photos';
import { SrcAlt } from '../interfaces/src-alt';
import { Todo } from '../interfaces/todo';
import { ImageService } from '../services/image.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  todoForm: FormGroup;
  imageNotFound = ``;
  @ViewChild(`imgFormField`, { read: ElementRef }) imgFormField: ElementRef;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() editInfo: EditInfo;
  loadingSpinner = false;
  fetchedImages: PexelsPhotos[] = [];
  curSelectedImage: SrcAlt;
  showSearch = false;
  todoId: number;

  constructor(
    private todoService: TodoService,
    private imageService: ImageService,
    private renderer: Renderer2,
    public dialogRef: MatDialogRef<EditModalComponent>,
    private router: Router
  ) {}

  // Todo formas setup vadoties pēc tā vai tā būs edit vai add forma
  ngOnInit(): void {
    if (this.editInfo) {
      this.todoForm = new FormGroup({
        name: new FormControl(
          `${this.editInfo.todo.name}`,
          Validators.required
        ),
        note: new FormControl(`${this.editInfo.todo.note}`),
        imgSrc: new FormControl(''),
      });
      this.todoId = this.editInfo.id;
      if (this.editInfo.todo.imgSrc) {
        this.curSelectedImage = this.editInfo.todo.imgSrc;
      }
    } else {
      this.todoForm = new FormGroup({
        name: new FormControl(``, Validators.required),
        note: new FormControl(``),
        imgSrc: new FormControl(''),
      });
    }
  }

  // Manuāli validē attēlu meklēšanas lauku uz katra value change
  ngAfterViewInit(): void {
    this.todoForm.get(`imgSrc`)?.valueChanges.subscribe((value) => {
      const nativeElement = this.imgFormField.nativeElement;
      if (nativeElement.classList.contains(`mat-form-field-invalid`)) {
        this.renderer.removeClass(nativeElement, `mat-form-field-invalid`);
        this.imageNotFound = ``;
      }
    });
  }

  // Nosaka pašreizējo attēlu
  selectedImage(srcBody: SrcAlt) {
    this.curSelectedImage = srcBody;
  }

  // Iesniedz formu ja ir valid
  onSubmit(): void {
    if (this.todoForm.valid && this.todoForm.touched) {
      const formValue = this.todoForm.value;
      const todo: Todo = {
        name: formValue.name,
        note: formValue.note,
        imgSrc: this.curSelectedImage,
      };
      if (this.editInfo) {
        this.todoService.editTodo(todo, this.todoId);
        this.router.navigate([`/`]);
        this.dialogRef.close();
      } else {
        this.todoService.saveTodo(todo);
        this.showSearch = false;
      }
      this.formGroupDirective.resetForm();
    }
    this.fetchedImages = [];
  }

  // Atrod attēlus pēc query
  onSearchImage(query: string): void {
    const nativeElement = this.imgFormField.nativeElement;
    this.loadingSpinner = true;
    if (query.trim() === ``) {
      this.renderer.addClass(nativeElement, `mat-form-field-invalid`);
      this.imageNotFound = `Can't search for nothing silly ;)`;
      this.loadingSpinner = false;
      return;
    }

    // Fetcho attēlus no API un validē vai tie tiek atgriezti
    this.imageService.fetchImages(query).subscribe({
      next: (value) => {
        if (value.photos.length === 0) {
          this.renderer.addClass(nativeElement, `mat-form-field-invalid`);
          this.imageNotFound = `No pictures found matching that search :(`;
          this.fetchedImages = [];
          if (this.curSelectedImage) {
            this.showSearch = true;
          }
          this.updateState(`single`);
        } else {
          this.updateState(`grid`);
          this.fetchedImages = value.photos;
          this.showSearch = true;
        }

        this.loadingSpinner = false;
      },

      // Catcho API error
      error: (error) => {
        alert(
          `There's been a server error :( here's the message: ` +
            error.statusText
        );
      },
    });
  }

  // Nosaka vai parādīt grid ar bildēm vai tikai 1
  updateState(data: string): void {
    this.imageService.updateState(data);
  }
}
