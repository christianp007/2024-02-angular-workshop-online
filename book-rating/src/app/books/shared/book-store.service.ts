import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private http = inject(HttpClient);
  private apiUrl = 'https://api.angular.schule';

  constructor(
    // private http: HttpClient
  ) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books');
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + '/books/' + isbn);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl + '/books', book);
  }

  search(term: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books/search/' + term);
  }

  delete(isbn: string): Observable<unknown> {
    return this.http.delete(this.apiUrl + '/books/' + isbn);
  }

  // updateRating(isbn: string, rating: number) {}


}
