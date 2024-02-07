import { Component, inject } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { BookActions } from '../store/book.actions';
import { map } from 'rxjs';
import { selectBooks, selectLoading } from '../store/book.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BookComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  books: Book[] = [];

  d = Date.now();
  private intervalId: ReturnType<typeof setInterval>; // "unknown" würde hier auch reichen ;-)

  // private rs2 = inject(BookRatingService);
  // private store2 = inject(Store);

  loading$ = this.store.select(selectLoading);

  constructor(private rs: BookRatingService, private bs: BookStoreService, private store: Store) {
    this.store.dispatch(BookActions.loadBooks());

    // bitte lieber mit der AsyncPipe lösen!
    this.store.select(selectBooks).subscribe(books => {
      this.books = books;
    });

    /*this.bs.getAll().subscribe(books => {
      this.books = books;
    });*/

    this.intervalId = setInterval(() => {
      this.d = Date.now();
      console.log(this.d);
    }, 1000);
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  doDelete(book: Book) {
    this.bs.delete(book.isbn).subscribe(() => {
      this.bs.getAll().subscribe(books => {
        this.books = books;
      })
    })
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10); // [10, 20, 30, 40, 50]
    // [1,2,3,4,5,6,7,8,9].filter(e => e > 5) // [6,7,8,9]

    this.books = this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    })

    // this.books = this.books.map(b => b.isbn === ratedBook.isbn ? ratedBook : b);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
