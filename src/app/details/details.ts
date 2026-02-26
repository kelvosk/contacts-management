import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../core/services/contact-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contact } from '../core/models/contact';
import { CommonModule } from '@angular/common';
import { EMPTY, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  private contactService = inject(ContactService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public contact$!: Observable<Contact>;
  public contactId: String = '';

  ngOnInit() {
    this.contact$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (!id) {
          return EMPTY;
        }
        this.contactId = id;
        return this.contactService.getContactById(id);
      }),
    );
  }
}
