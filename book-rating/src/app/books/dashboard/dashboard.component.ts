import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BookComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  books = signal<Book[]>([]);

  d = signal(Date.now());
  private intervalId: ReturnType<typeof setInterval>; // "unknown" würde hier auch reichen ;-)

  // private rs2 = inject(BookRatingService);

  constructor(private rs: BookRatingService, private bs: BookStoreService) {
    this.bs.getAll().subscribe(books => {
      this.books.set(books);
    });

    this.intervalId = setInterval(() => {
      this.d.set(Date.now());
      console.log(this.d());
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
        this.books.set(books);
      })
    })
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10); // [10, 20, 30, 40, 50]
    // [1,2,3,4,5,6,7,8,9].filter(e => e > 5) // [6,7,8,9]

    const result  = this.books().map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    })

    this.books.set(result);
    // this.books = this.books.map(b => b.isbn === ratedBook.isbn ? ratedBook : b);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
