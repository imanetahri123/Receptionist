import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reminders',
  standalone: true,
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css'],
  imports: [CommonModule] // Pour les pipes comme | date et *ngFor
})
export class RemindersComponent {
  reminders = [
    {
      id: 1,
      patientName: 'Mr. Adam',
      date: new Date('2025-06-10'),
      message: 'Rappel pour consultation médicale',
      status: 'En attente',
      description: 'Rappel envoyé par SMS'
    },
    {
      id: 2,
      patientName: 'Mme. Bernard',
      date: new Date('2025-06-15'),
      message: 'Rappel pour examen complet',
      status: 'Envoyé',
      description: 'Rappel envoyé par email'
    },
    {
      id: 3,
      patientName: 'M. Lemoine',
      date: new Date('2025-06-20'),
      message: 'Rappel pour suivi post-opératoire',
      status: 'En retard',
      description: 'Rappel non envoyé'
    }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'En attente': return 'status-pending';
      case 'Envoyé': return 'status-sent';
      case 'En retard': return 'status-overdue';
      default: return '';
    }
  }
}