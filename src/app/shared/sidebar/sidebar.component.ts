import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  logout() {
    // Exemple simple pour l’instant
    console.log('Déconnecté');
  }
  
}
