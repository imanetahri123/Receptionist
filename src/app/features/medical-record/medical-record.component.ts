import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent {
  currentView = 'grid'; // Vue par défaut
  isListView = false;

  // Données initiales
  patients = [
    {
      id: 1,
      name: 'Kamal',
      email: 'kamal@asio.com',
      phone: '06 12 34 56 78',
      dob: '12/04/1985',
      photo: '/assets/images/eps1.jpg',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Walid',
      email: 'walid@asio.com',
      phone: '06 87 65 43 21',
      dob: '05/08/1990',
      photo: '/assets/images/eps2.jpg',
      status: 'Follow up'
    },
    {
      id: 3,
      name: 'Imane',
      email: 'imane@asio.com',
      phone: '07 11 22 33 44',
      dob: '',
      photo: '/assets/images/eps3.jpg',
      status: 'Critical'
    },
    {
      id: 4,
      name: 'Ali',
      email: 'ali@asio.com',
      phone: '06 11 22 33 44',
      dob: '15/06/1995',
      photo: '/assets/images/p1.jpg',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Ahmed',
      email: 'ahmed@asio.com',
      phone: '06 22 33 44 55',
      dob: '10/03/1988',
      photo: '/assets/images/P5.jpg',
      status: 'Critical'
    },
    {
      id: 6,
      name: 'Adam',
      email: 'adam@asio.com',
      phone: '06 33 44 55 66',
      dob: '01/01/2000',
      photo: '/assets/images/P4.jpg',
      status: 'Follow up'
    },
    {
      id: 7,
      name: 'Sana',
      email: 'sana@asio.com',
      phone: '06 44 55 66 77',
      dob: '12/12/1992',
      photo: '/assets/images/p2.jpg',
      status: 'Active'
    },
    {
      id: 8,
      name: 'Youssef',
      email: 'youssef@asio.com',
      phone: '06 55 66 77 88',
      dob: '03/09/1980',
      photo: '/assets/images/P3.jpg',
      status: 'Critical'
    },
    {
      id: 9,
      name: 'Soufiane',
      email: 'soufiane@asio.com',
      phone: '06 66 77 88 99',
      dob: '25/05/1997',
      photo: '/assets/images/P6.jpeg',
      status: 'Follow up'
    }
  ];

  // Propriétés pour les filtres
  searchQuery = '';
  selectedStatus = '';
  selectedVisitFilter = '';
  filteredPatients: any[] = [...this.patients]; // Copie initiale

  constructor() {
    this.filteredPatients = [...this.patients];
  }

  toggleView() {
    this.currentView = this.isListView ? 'list' : 'grid';
  }

  applyFilters() {
    this.filteredPatients = this.patients.filter(patient => {
      const matchesSearch =
        patient.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        ('#' + patient.id).toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || patient.status.toLowerCase() === this.selectedStatus;

      const visitDays = this.getLastVisitDays(patient.dob);
      let matchesVisit = true;

      if (this.selectedVisitFilter === 'today' && visitDays !== 0) {
        matchesVisit = false;
      } else if (this.selectedVisitFilter === 'yesterday' && visitDays !== 1) {
        matchesVisit = false;
      } else if (this.selectedVisitFilter === 'week' && (visitDays < 2 || visitDays > 7)) {
        matchesVisit = false;
      } else if (this.selectedVisitFilter === 'older' && visitDays <= 7) {
        matchesVisit = false;
      }

      return matchesSearch && matchesStatus && matchesVisit;
    });
  }

  getLastVisitDate(dob: string): string {
    if (!dob) return 'N/A';

    const today = new Date();
    const lastVisit = new Date(dob);
    const timeDiff = Math.abs(today.getTime() - lastVisit.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (dayDiff === 0) return 'Aujourd’hui';
    else if (dayDiff === 1) return 'Hier';
    else return `${dayDiff} jours`;
  }

  getLastVisitDays(dob: string): number {
    if (!dob) return Infinity;
    const today = new Date();
    const lastVisit = new Date(dob);
    const timeDiff = Math.abs(today.getTime() - lastVisit.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-badge active';
      case 'follow up':
        return 'status-badge follow-up';
      case 'critical':
        return 'status-badge critical';
      default:
        return 'status-badge';
    }
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/60x60?text=Erreur ';
  }
}