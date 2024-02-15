import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter } from 'rxjs';
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

    //of('Leipzig', 'Köln', 'Hamburg','München').subscribe({
    /*from(['Leipzig', 'Köln', 'Hamburg','München']).subscribe({
      next: e => map(ethis.log(e),
      complete: () => this.log('COMPLETE')
    });*/

    /*timer(3000, 1000).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    })*/

    timer(0, 1000).pipe(
        map(e => e*3),
        filter(e => e%2==0)
      ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    })

    const myObs2$ = new Observable();

    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
