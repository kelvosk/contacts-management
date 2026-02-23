import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    title: 'Contact List',
    loadComponent: () => import('./contacts/contacts').then((c) => c.Contacts),
  },
  {
    path: 'create',
    title: 'Create new Contact',
    loadComponent: () => import('./create-contact/create-contact').then((c) => c.CreateContact),
  },
  {
    path: 'edit/:id',
    title: 'Edit Contact',
    loadComponent: () => import('./edit-contact/edit-contact').then((c) => c.EditContact),
  },
];
