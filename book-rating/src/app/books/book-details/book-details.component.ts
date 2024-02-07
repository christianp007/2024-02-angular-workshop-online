import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { Title } from '@angular/platform-browser';
import { Observable, map, switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  private bs = inject(BookStoreService);

  book$: Observable<Book>;

  /*bookX = toSignal(this.route.paramMap.pipe(
    map(params => params.get('isbn')!),
    switchMap(isbn => this.bs.getSingle(isbn))
  ));*/
  // protected bookX = signal<Book | undefined>(undefined);

  constructor() {
    // PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    // PUSH
    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn')!),
      switchMap(isbn => this.bs.getSingle(isbn))
    );

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
