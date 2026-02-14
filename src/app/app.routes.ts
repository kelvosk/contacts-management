import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    title: 'Contact List',
    loadComponent: () => import('./contacts/contacts').then((c) => c.Contacts),
  },
];
