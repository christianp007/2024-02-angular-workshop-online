import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {

  private bs = inject(BookStoreService);
  private router = inject(Router);

  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    description: new FormControl('', {
      nonNullable: true
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.min(0),
        Validators.max(10000)
      ]
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.min(1),
        Validators.max(5),
      ]
    })
  });

  isInvalid(controlName: string): boolean {
    // const control = this.bookForm.controls[controlName];
    const control = this.bookForm.get(controlName);

    if (!control) {
      return false;
    }

    return control.touched && control.invalid;
  }

  hasError(controlName: string, errorCode: string): boolean {
    // "Hat Control X den Fehler Y?"
    const control = this.bookForm.get(controlName);

    if (!control) {
      return false;
    }

    return control.hasError(errorCode) && control.touched;
  }

  submitForm() {
    const newBook: Book = this.bookForm.getRawValue();

    this.bs.create(newBook).subscribe({
      next: receivedBook => {
        console.log('CREATED book', receivedBook);
        this.router.navigate(['/books', receivedBook.isbn]);
      },
      error: err => {
        // TODO Fehler behandeln
      }
    });
  }
}
