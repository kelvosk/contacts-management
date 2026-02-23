import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../core/services/contact-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../core/models/contact';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  private contactServices = inject(ContactService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  request?: Contact;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['/list']);
        return;
      }
    });
  }
}
