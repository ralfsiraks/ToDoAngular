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
import { SrcAlt } from '../interfaces/src-alt';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'],
})
export class ImageSearchComponent implements OnInit, OnDestroy {
  @Input() images: PexelsPhotos[];
  @Input() preselectedImageRef: SrcAlt;
  private subscription: Subscription;
  @Output() selectedImage = new EventEmitter<SrcAlt>();
  currentState: string = `single`;
  selectedSrc: SrcAlt = { src: '', alt: '' };
  constructor(private imageService: ImageService) {
    // Nosaka vai parādīt grid ar bildēm vai tikai 1
    this.subscription = this.imageService.data$.subscribe((data) => {
      if (data === `grid`) this.currentState = `grid`;
      if (data === `single`) this.currentState = `single`;
    });
  }

  // Ja todo tiek editots nosaka pašreizējo attēlu pēc noteiktā ToDo
  ngOnInit(): void {
    if (this.preselectedImageRef) {
      this.selectedSrc = this.preselectedImageRef;
    }
  }

  // Uz click izvēlās un parāda noteikto attēlu
  onSelectImage(src: string, alt: string): void {
    this.currentState = `single`;
    this.selectedSrc.src = src;
    this.selectedSrc.alt = alt;
    const srcBody = { src: src, alt: alt };
    this.selectedImage.emit(srcBody);
  }

  // Unsubscribe no subscription, kas nosaka vai rādīt grid vai single image
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
