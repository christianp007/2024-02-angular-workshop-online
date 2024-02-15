import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.scss'],
  standalone: true
})
export class DragdropComponent implements OnInit {

  @ViewChild('target', { static: true }) target!: ElementRef<HTMLElement>;
  targetPosition = [100, 80];
  dragDropEnabled = false;

  ngOnInit() {
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseDown$ = fromEvent<MouseEvent>(this.target.nativeElement, 'mousedown');
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

    /**
     * Nutze RxJS, um die rote Box mit Drag-and-drop zu bewegen.
     *
     * Die Methode setTargetPosition(e: MouseEvent) ändert die Position der Box.
     * Nutze die Observables mouseMove$, mouseDown$ und mouseUp$ in einer geeigneten Kombination.
     * Beginne damit, dass die Box am Mauszeiger klebt.
     * Sorge dann dafür, dass dieser Prozess erst beim Klick (mouseDown$) beginnt.
     * Beende den Prozess, sobald mouseUp$ feuert.
     */

    /******************************/

    // rote Box klebt am Mauszeiger:
    mouseMove$.subscribe(e => {
      if (this.dragDropEnabled){
        this.setTargetPosition(e);
      }
    });
    mouseUp$.subscribe(e => {
      if (e.button===0){
        this.dragDropEnabled=false;
      }
    });
    mouseDown$.subscribe(e => 
    {
      if (e.button===0){
        this.dragDropEnabled=true;
      }
    });

    /******************************/
  }

  private setTargetPosition(event: MouseEvent) {
    const offset = 50;
    this.targetPosition = [
      event.pageX - offset,
      event.pageY - offset
    ];
  }

}
