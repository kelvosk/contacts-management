import { Component, inject } from '@angular/core';
import { ContactService } from '../core/services/contact-service';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../core/models/contact';

@Component({
  selector: 'app-contacts',
  imports: [AsyncPipe, RouterLink, NgbTooltip],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {
  private contactsService = inject(ContactService);
  private router = inject(Router);
  private modalService = inject(NgbModal);

  contacts$ = this.contactsService.getContacts();

  validateFieldContentOrReturnDash(value?: string) {
    if (value) {
      return value;
    }
    return '-';
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  manageUserBlock(contact: Contact) {
    const idToBlock = contact.id;

    if (!idToBlock) {
      return;
    }

    contact.isBlocked = this.manageBlock(contact);

    this.contactsService.updateContact(idToBlock, contact).subscribe();

    this.modalService.dismissAll();
  }

  manageBlock(contact: Contact) {
    return contact.isBlocked ? false : true;
  }

  showBlockToolTip(contact: Contact) {
    if (contact.isBlocked) {
      return 'Unblock Contact!';
    } else {
      return 'Block Contact!';
    }
  }
}
