import { Component, inject } from '@angular/core';
import { ContactService } from '../core/services/contact-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../core/models/contact';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-contact',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './create-contact.html',
  styleUrl: './create-contact.scss',
})
export class CreateContact {
  private contactService = inject(ContactService);
  private router = inject(Router);
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
    const formValues = this.contactForm.getRawValue();
    const contact: Contact = {
      id: uuidv4(),
      name: formValues.name,
      email: formValues.email,
      mobile: formValues.mobile,
      secondMobile: formValues.secondMobile ? formValues.secondMobile : '',
      notes: formValues.notes ? formValues.notes : '',
      isBlocked: false,
      isEmergencyContact: formValues.isEmergencyContact,
    };

    this.contactService.saveContact(contact).subscribe({
      next: () => console.log('Request Saved'),
      error: (err) => console.error(err),
    });

    this.router.navigate(['/list']);
  }
}
