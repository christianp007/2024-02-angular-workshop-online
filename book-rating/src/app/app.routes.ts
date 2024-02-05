import { Routes } from '@angular/router';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad ist fast immer "pathMatch: full" nötig
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes)
  }
  // ...booksRoutes
];
