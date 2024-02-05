import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  private bs = inject(BookStoreService);

  book?: Book;
  // protected bookX = signal<Book | undefined>(undefined);

  constructor() {
    // PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    // PUSH
    // TODO: Verschachtelte Subscriptions vermeiden!
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!; // Non-Null Assertion (Ausnahme!)
      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
        // this.bookX.set(book);
      });
    });
  }
}


/*
AUFGABE:
Detailseite "fertig" bauen

- Buch soll per HTTP abgerufen werden
- geladenes Buch soll angezeigt werden
- Anzeige ganz simpel halten, z. B. nur Titel und Beschreibung
*/

/*
TODO:
- ISBN aus der URL auslesen
- HTTP: Buch laden / BookStoreService
- Buch anzeigen
*/
