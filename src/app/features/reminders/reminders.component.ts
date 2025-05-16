import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RemindersComponent {
  reminders = [
    {
      id: 1,
      patientName: 'Kamal Berrada',
      message: 'Rappel : RDV demain à 10h.',
      date: new Date('2025-06-05'),
      status: 'envoyé'
    },
    {
      id: 2,
      patientName: 'Imane Tahri',
      message: 'Votre suivi est programmé la semaine prochaine.',
      date: new Date('2025-06-03'),
      status: 'en attente'
    },
    {
      id: 3,
      patientName: 'Sana Slimani',
      message: 'Nouvelle consultation prévue bientôt.',
      date: new Date('2025-06-02'),
      status: 'non lu'
    }
  ];

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'envoyé':
        return 'bg-green-100 text-green-700';
      case 'en attente':
        return 'bg-yellow-100 text-yellow-700';
      case 'non lu':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}