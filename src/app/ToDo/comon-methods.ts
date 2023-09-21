import { ElementRef, Renderer2 } from '@angular/core';
import { SrcAlt } from './interfaces/src-alt';

export abstract class CommonMethods {
  constructor(private renderer: Renderer2) {}

  clearInvalidFieldStyles(imgFormField: ElementRef): void {
    const nativeElement = imgFormField.nativeElement;
    if (nativeElement.classList.contains('mat-form-field-invalid')) {
      this.renderer.removeClass(nativeElement, 'mat-form-field-invalid');
    }
  }

  setSelectedImage(image: SrcAlt): void {
    // Do something with the selected image
  }

  // Add other common methods as needed
}
