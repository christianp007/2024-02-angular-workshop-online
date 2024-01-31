import { Component, Input } from '@angular/core';
import { Book } from '../shared/book';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [NgIf],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // hier dürfen Daten hineinfließen von der Elternkomponente
  @Input() book?: Book;
}
