import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import md5 from 'md5';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  private publicKey = 'b47e51c832b660f4c8699dd857962ef6';
  private privateKey = '8a3f3b1eb755cec2d21e867ce1b4484a6fb9450a';
  private baseUrl = 'http://gateway.marvel.com/v1/public/comics?';

  constructor(private http: HttpClient) {}

  getComics(): Observable<any[]> {
    const timestamp = new Date().getTime().toString();
    const hash = md5(timestamp + this.privateKey + this.publicKey);

    const apiUrl = `${this.baseUrl}ts=${timestamp}&apikey=${this.publicKey}&hash=${hash}&limit=100`;

    return this.http.get<any[]>(apiUrl);
  }
}
