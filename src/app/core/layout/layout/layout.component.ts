import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet // ✅ Ajout ici pour utiliser <router-outlet>
  ],
  standalone: true,
})
export class LayoutComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    console.log('Déconnexion...');
    // Exemple de redirection vers login
    // this.router.navigate(['/login']);
  }
}