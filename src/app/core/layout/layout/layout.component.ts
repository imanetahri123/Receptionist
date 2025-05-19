import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Ajout ici

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule] // <-- Ajout CommonModule ici
})
export class LayoutComponent {
  showLogoutModal = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  // Méthode pour vérifier si la route est active
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  // Ouvre la modale de déconnexion
  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  // Ferme la modale de déconnexion
  closeLogoutModal(): void {
    this.showLogoutModal = false;
  }

  // Confirme la déconnexion
  logout(): void {
    this.showLogoutModal = false;
    // Ici tu peux ajouter la logique de déconnexion (vider le token, etc.)
    // Redirection vers la page de login
    this.router.navigate(['/login']);
  }
}