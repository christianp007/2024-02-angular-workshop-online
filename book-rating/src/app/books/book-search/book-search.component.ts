import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BookStoreService } from '../shared/book-store.service';
import { Observable, debounceTime, filter, of, switchMap, tap } from 'rxjs';
import { Book } from '../shared/book';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });
  private bs = inject(BookStoreService);

  loading = signal(false);

  results$ = this.searchControl.valueChanges.pipe(
    debounceTime(200),
    filter(term => term.length >= 3 || term.length === 0),
    tap(() => this.loading.set(true)),
    switchMap(term => {
      if (term.length < 3) {
        return of([]);
      } else {
        return this.bs.search(term);
      }
    }),
    tap(() => this.loading.set(false)),
  );
}
