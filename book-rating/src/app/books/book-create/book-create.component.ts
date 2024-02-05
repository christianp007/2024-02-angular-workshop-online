import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
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
    // TODO
  }
}
