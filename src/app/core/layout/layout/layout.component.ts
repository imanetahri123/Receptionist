import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class LayoutComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Méthode pour vérifier si la route est active
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  // Méthode logout
  logout(): void {
    // Ici tu peux ajouter la logique de déconnexion
    console.log('Déconnexion...');
    
    // Exemple : redirection vers la page de login
    // this.router.navigate(['/login']);
  }
}