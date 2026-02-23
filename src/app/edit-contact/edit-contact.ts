import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../core/services/contact-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../core/models/contact';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-contact',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './edit-contact.html',
  styleUrl: './edit-contact.scss',
})
export class EditContact implements OnInit {
  private contactService = inject(ContactService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  requestId: string = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');

          if (!id) {
            this.router.navigate(['/list']);
            return EMPTY;
          }
          this.requestId = id;
          return this.contactService.getContactById(id);
        }),
      )
      .subscribe({
        next: (contact: Contact) => {
          this.contactForm.patchValue(contact);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  contactForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    mobile: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(9), Validators.required],
    }),
    secondMobile: new FormControl<string>('', { validators: Validators.maxLength(9) }),
    notes: new FormControl<string>(''),
    isEmergencyContact: new FormControl<boolean>(false, { nonNullable: true }),
  });

  onSubmit() {
    if (this.contactForm.invalid) return;

    const formValues = this.contactForm.getRawValue();

    const contact: Contact = {
      name: formValues.name,
      email: formValues.email,
      mobile: formValues.mobile,
      secondMobile: formValues.secondMobile ? formValues.secondMobile : '',
      notes: formValues.notes ? formValues.notes : '',
      isBlocked: false,
      isEmergencyContact: formValues.isEmergencyContact,
    };

    this.contactService.updateContact(this.requestId, contact).subscribe();

    this.router.navigate(['/list']);
  }
}
