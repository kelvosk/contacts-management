import { Component, inject } from '@angular/core';
import { ContactService } from '../core/services/contact-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-contacts',
  imports: [AsyncPipe],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {
  private contactsService = inject(ContactService);
  contacts$ = this.contactsService.getContacts();
}
