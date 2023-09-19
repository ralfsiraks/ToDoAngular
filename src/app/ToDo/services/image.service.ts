import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pexels } from '../interfaces/pexels';

const headers = {
  headers: new HttpHeaders({
    Authorization: 'Bc969PCJH0BjKyOaoSpATY0p30UChYMGNJivohrf1s0GyijPDwKqVlW2',
  }),
};

@Injectable()
export class ImageService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchImages(query: string): Observable<Pexels> {
    return this.http.get<any>(
      `https://api.pexels.com/v1/search?query=${query}&per_page=12`,
      headers
    );
  }

  updateData(data: any) {
    this.dataSubject.next(data);
  }
}
