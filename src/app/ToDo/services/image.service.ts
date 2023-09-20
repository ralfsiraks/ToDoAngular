import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pexels } from '../interfaces/pexels';

@Injectable()
export class ImageService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;
  headers = {
    headers: new HttpHeaders({
      Authorization: `${this.apiKey}`,
    }),
  };
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchImages(query: string): Observable<Pexels> {
    return this.http.get<any>(
      `${this.apiUrl}/search?query=${query}&per_page=12`,
      this.headers
    );
  }

  updateState(data: any): void {
    this.dataSubject.next(data);
  }
}
