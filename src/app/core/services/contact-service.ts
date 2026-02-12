import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = Inject(HttpClient);
}
