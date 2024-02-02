import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
      // maxRating: 5
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // Service ersetzen:
        // Wenn jemand BRS anfordert, wird stattdessen ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    // TS-Klasseninstanz
    component = fixture.componentInstance;
    // DOM-Element fixture.nativeElement.querySelector('p')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for component.doRateUp', () => {
    // Arrange
    // Methode überwachen
    // das hier ist tatsächlich unser ratingMock!
    const rs = TestBed.inject(BookRatingService);

    // Testbuch
    const testBook = { isbn: '123' } as Book; // Type Assertion (Achtung!! im Test ist das okay)

    // spyOn(rs, 'rateUp').and.returnValue(testBook);
    // spyOn(rs, 'rateUp').and.callFake(b => b);
    // Methode überwachen, aber Originalmethode trotzdem aufrufen
    spyOn(rs, 'rateUp').and.callThrough();


    // Act
    component.doRateUp(testBook);

    // Assert
    // prüfen, ob ratingMock.rateUp aufgerufen wurde
    expect(rs.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
