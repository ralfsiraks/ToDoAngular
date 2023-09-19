import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PexelsPhotos } from '../interfaces/pexels-photos';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'],
})
export class ImageSearchComponent implements OnInit, OnDestroy {
  @Input() images: PexelsPhotos[];
  @Input() preselectedImageRef: string;
  private subscription: Subscription;
  @Output() selectedImage = new EventEmitter<string>();
  currentState: string = `single`;
  selectedSrc: string;
  constructor(private imageService: ImageService) {
    this.subscription = this.imageService.data$.subscribe((data) => {
      if (data === `grid`) this.currentState = `grid`;
      if (data === `single`) this.currentState = `single`;
    });
  }

  ngOnInit(): void {
    if (this.preselectedImageRef) {
      this.selectedSrc = this.preselectedImageRef;
    }
  }

  onSelectImage(src: string) {
    this.currentState = `single`;
    this.selectedSrc = src;
    this.selectedImage.emit(src);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
