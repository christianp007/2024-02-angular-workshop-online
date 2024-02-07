import { Component, EventEmitter } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, Subscribable, Subscriber, Observer, map, filter } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('Leipzig', 'Köln', 'Hamburg', 'München')
    // of(1,2,3,4,5)
    // from([1,2,3,4,5])
    // interval(1000)    // ---0---1---2---3---4---5 ...
    // timer(3000)       // ---------0|
    // timer(3000, 1000) // ---------0---1---2---3---4---5 ...
    // timer(0, 1000)    // 0---1---2---3---4---5 ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    })


    /******************************/

    // Producer: generiert die Werte
    // Subscriber ist der von außen übergebene Observer
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);

      const interval = setInterval(() => {
        const result = Math.random();
        sub.next(result);
        console.log({ result })
      }, 1000);

      // Teardown Logic
      return () => {
        clearInterval(interval);
        console.log('TEARDOWN');
      };
    }

    // Observer: konsumiert die Werte
    const obs: Observer<number> = {
      next: (data: number) => console.log(data),
      error: (error: any) => console.error(error),
      complete: () => console.log('Fertig'),
    }

    // producer(obs);

    // Observable: verwendet den Producer, um Werte an Observer auszuspielen
    // Finnische Notation $
    const myObs$ = new Observable(producer);
    const sub = myObs$.subscribe(obs);

    setTimeout(() => {
      sub.unsubscribe();
      console.log('UNSUBSCRIBE');
    }, 5200)

    /*
    class MyObservable {
      constructor(private producer: any) {}

      subscribe(obs: Partial<Observer<any>>) {
        if (!obs.error) {
          obs.error = () => {};
        }

        this.producer(obs);
      }
    }*/


    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
