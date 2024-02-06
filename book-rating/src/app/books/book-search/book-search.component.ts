import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });
  private bs = inject(BookStoreService);

  constructor() {
    this.searchControl.valueChanges.subscribe(e => {
      console.log(e);
    });
  }
}
