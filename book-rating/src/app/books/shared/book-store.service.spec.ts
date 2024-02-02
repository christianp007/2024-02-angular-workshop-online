import { TestBed } from '@angular/core/testing';

import { BookStoreService } from './book-store.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('BookStoreService', () => {
  let service: BookStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: (url: string) => of()
          }
        }
      ]
    });
    service = TestBed.inject(BookStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
