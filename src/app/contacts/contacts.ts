import { Component, inject } from '@angular/core';
import { ContactService } from '../core/services/contact-service';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacts',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {
  private contactsService = inject(ContactService);
  private router = inject(Router);
  contacts$ = this.contactsService.getContacts();

  validateFieldContentOrReturnDash(value?: string) {
    if (value) {
      return value;
    }
    return '-';
  }
}
