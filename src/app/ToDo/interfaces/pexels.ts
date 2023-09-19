import { PexelsPhotos } from './pexels-photos';

export interface Pexels {
  next_page: string;
  page: number;
  per_page: number;
  photos: PexelsPhotos[];
  total_results: number;
}
