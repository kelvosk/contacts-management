import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private contactsPath: string = 'http://localhost:3000/contacts';

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsPath);
  }

  saveContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsPath, contact);
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.contactsPath}/${id}`);
  }

  updateContact(id: string, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.contactsPath}/${id}`, contact);
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.contactsPath}/${id}`);
  }
}
