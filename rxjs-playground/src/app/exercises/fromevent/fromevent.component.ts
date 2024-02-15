import { Component } from '@angular/core';
import { fromEvent, map, startWith, debounceTime } from 'rxjs';

@Component({
  templateUrl: './fromevent.component.html',
  standalone: true
})
export class FromeventComponent {

  currentWidth?: number;

  constructor() {
    /**
     * Schreibe die jeweils aktuelle Fensterbreite in das Property `this.currentWidth`
     *
     * Nutze fromEvent, um das resize-Event auf window zu abonnieren.
     * Initialisiere das Observable mit der aktuellen Fensterbreite (`window.innerWidth`)
     * Entprelle den Eventstrom, damit nicht zu viele Events gefeuert werden.
     */

    /******************************/

    const result$ = fromEvent<{ target: Window }>(window, 'resize').pipe(
      debounceTime(500), // rate-limiting; sollte als erstes stehen!
      map(e => e.target.innerWidth),
      startWith(window.innerWidth)
    );

    result$.subscribe(width => {
      this.currentWidth = width;
      //console.log(width);
    })

    /******************************/
  }

}
