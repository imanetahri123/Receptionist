import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html'
  // Pas de styleUrls car pas de fichier SCSS
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', { name: this.name, email: this.email, message: this.message });
  }
}