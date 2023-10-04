import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageService } from '../services/image.service';
import { ImageSearchComponent } from './image-search.component';

class ImageServiceStub {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();
}

describe('ImageSearchComponent', () => {
  let component: ImageSearchComponent;
  let fixture: ComponentFixture<ImageSearchComponent>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ImageSearchComponent],
      providers: [
        { provide: ImageService, useClass: ImageServiceStub },
        HttpTestingController,
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSearchComponent as any);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test ngOnInit if there is a preselected image', (): void => {
    component.preselectedImageRef = { src: `test`, alt: `test` };
    component.ngOnInit();
    expect(component.selectedSrc).toBe(component.preselectedImageRef);
  });

  it('should test ngOnInit if there is no preselected image', (): void => {
    component.ngOnInit();
    expect(component.selectedSrc).toEqual({ src: '', alt: '' });
  });

  it('should test onSelectImage method', (): void => {
    const emitSpy: jasmine.Spy = spyOn(component.selectedImage, `emit`);
    component.onSelectImage(`test`, `testAlt`);
    expect(component.currentState).toBe(`single`);
    expect(component.selectedSrc.src).toBe(`test`);
    expect(component.selectedSrc.alt).toBe(`testAlt`);
    expect(emitSpy).toHaveBeenCalledWith({ src: `test`, alt: `testAlt` });
  });

  it('should test ngOnDestroy', (): void => {
    const component = fixture.componentInstance as any;
    const unsubSpy: jasmine.Spy = spyOn(component.subscription, `unsubscribe`);
    component.ngOnDestroy();
    expect(unsubSpy).toHaveBeenCalled();
  });
});
