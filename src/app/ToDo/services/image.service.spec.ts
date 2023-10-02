import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { take } from 'rxjs';
import { pexelsApiResponse } from 'src/app/MockData/pexels-api-response';
import { environment } from 'src/environments/environment';
import { Pexels } from '../interfaces/pexels';
import { ImageService } from './image.service';

const mockPexelsResponse: Pexels = pexelsApiResponse;

describe('ImageService', () => {
  let imageService: ImageService;
  let httpMock: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [ImageService],
      imports: [HttpClientTestingModule],
    });
    imageService = TestBed.inject(ImageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach((): void => {
    httpMock.verify();
  });

  it('should test the Pexels API request', (): void => {
    imageService
      .fetchImages('mock')
      .pipe(take(1))
      .subscribe((images: Pexels): void => {
        expect(images).toEqual(mockPexelsResponse);
      });
    const req: TestRequest = httpMock.expectOne(
      `${environment.apiUrl}/search?query=mock&per_page=12`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPexelsResponse);
  });
});
