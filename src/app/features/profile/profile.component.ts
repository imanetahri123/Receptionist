import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProfileComponent implements OnInit {
  readonly defaultPhoto = '/assets/images/pers.jpg';
  readonly defaultUser = {
    name: 'N/A',
    email: 'N/A',
    phone: 'N/A',
    role: 'N/A',
    photo: this.defaultPhoto,
    joinDate: new Date(),
    stats: {
      appointments: 0,
      doctors: 0,
      bills: 0,
    },
  };

  user: any = null;
  editedUser: any = { ...this.defaultUser };
  isEditing: boolean = false;

  // Liste par défaut, remplacée si l'API retourne recentAppointments
  recentAppointments: any[] = [
    {
      date: '2025-06-01',
      patient: 'Mme. Slimani',
      motif: 'Consultation',
      status: 'Terminé'
    },
    {
      date: '2025-06-03',
      patient: 'Mr. Tahri',
      motif: 'Examen',
      status: 'Annulé'
    },
    {
      date: '2025-06-05',
      patient: 'M. Barkouch',
      motif: 'Suivi',
      status: 'À venir'
    }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const email = 'omar.reception@asio.com';

    this.http.get(`/api/profile/${email}`).subscribe({
      next: (data: any) => {
        this.user = {
          name: data?.name || this.defaultUser.name,
          email: data?.email || this.defaultUser.email,
          phone: data?.phone || this.defaultUser.phone,
          role: data?.role || this.defaultUser.role,
          photo: data?.photo || this.defaultPhoto,
          joinDate: data?.joinDate ? new Date(data.joinDate) : null,
          stats: {
            appointments: data?.stats?.appointments ?? this.defaultUser.stats.appointments,
            doctors: data?.stats?.doctors ?? this.defaultUser.stats.doctors,
            bills: data?.stats?.bills ?? this.defaultUser.stats.bills,
          },
        };
        this.editedUser = { ...this.user };
        // Si l'API retourne les rendez-vous, on remplace la liste par défaut :
        if (data?.recentAppointments) {
          this.recentAppointments = data.recentAppointments;
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil', err);
        this.user = { ...this.defaultUser };
        this.editedUser = { ...this.defaultUser };
      }
    });
  }

  openEditModal() {
    if (this.user) {
      this.isEditing = true;
      this.editedUser = { ...this.user };
    }
  }

  closeEditModal() {
    this.isEditing = false;
  }

  saveChanges() {
    this.user = { ...this.editedUser };
    this.closeEditModal();
    alert('Profil mis à jour');
  }
}