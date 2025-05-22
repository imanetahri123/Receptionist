import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppointmentsComponent implements OnInit {
  searchQuery = '';
  selectedStatus = '';
  selectedDate = '';
  appointments: any[] = [];
  editingAppointment: any = null;
  selectedAppointment: any = null;

  // Pagination
  itemsPerPage = 5;
  currentPage = 1;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  goToPlanning() {
    this.router.navigate(['/doctors-planning']);
  }

  loadAppointments() {
    const filters: any = {};
    if (this.selectedStatus) filters.statut = this.getSelectedStatusLabel();
    if (this.searchQuery) filters.search = this.searchQuery;
    if (this.selectedDate) filters.date = this.selectedDate;

    this.appointmentService.getAppointments(filters).subscribe(
      (response: any) => {
        this.appointments = (response.data || []).map((rdv: any) => ({
          ...rdv,
          patient: rdv.nom_patient,
          prenom: rdv.prenom_patient,
          time: rdv.date_heure,
          status: this.mapStatusToBackend(rdv.statut),
          reminder: rdv.rappel
        }));
      },
      (error: any) => {
        console.error('Erreur lors du chargement des rendez-vous', error);
      }
    );
  }

  get filteredAppointments() {
    return this.appointments.filter((app: any) => {
      const matchesSearch =
        !this.searchQuery ||
        app.patient?.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || app.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  get paginatedAppointments() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredAppointments.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
  }

  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i);
  }

  getLabelFromStatus(status: string): string {
    switch (status) {
      case 'upcoming': return 'À venir';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'canceled': return 'Annulé';
      default: return 'Inconnu';
    }
  }

  getSelectedStatusLabel(): string {
    switch (this.selectedStatus) {
      case 'upcoming': return 'À Venir';
      case 'in_progress': return 'En Cours';
      case 'completed': return 'Terminé';
      case 'canceled': return 'Annulé';
      default: return '';
    }
  }

  openEditModal(appointment: any): void {
    this.editingAppointment = {
      id: appointment.id,
      nom_patient: appointment.nom_patient,
      prenom_patient: appointment.prenom_patient,
      date_heure: appointment.date_heure,
      type: appointment.type,
      statut: this.mapStatusToBackend(appointment.statut),
      rappel: appointment.rappel
    };
  }

  closeEditModal(): void {
    this.editingAppointment = null;
  }

  saveUpdatedAppointment(): void {
    if (!this.editingAppointment || !this.editingAppointment.id) {
      alert("Aucun RDV sélectionné");
      return;
    }

    const dataToSend = {
      nom_patient: this.editingAppointment.nom_patient,
      prenom_patient: this.editingAppointment.prenom_patient,
      date_heure: this.formatDateTime(this.editingAppointment.time),
      type: this.editingAppointment.type || 'Consultation',
      statut: this.mapStatusToFrontend(this.editingAppointment.status),
      rappel: this.editingAppointment.rappel || null
    };

    this.appointmentService.updateAppointment(this.editingAppointment.id, dataToSend).subscribe(
      (updated: any) => {
        const index = this.appointments.findIndex(a => a.id === updated.id);
        if (index !== -1) {
          this.appointments[index] = {
            ...updated,
            patient: updated.nom_patient,
            time: updated.date_heure,
            status: this.mapStatusToBackend(updated.statut),
            reminder: updated.rappel
          };
        }
        this.closeEditModal();
        alert('Rendez-vous mis à jour');
      },
      (err: any) => {
        alert("Erreur lors de la mise à jour");
        console.error(err);
      }
    );
  }

  deleteAppointment(appointment: any): void {
    if (!appointment.id) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer ${appointment.patient} ?`)) {
      this.appointmentService.deleteAppointment(appointment.id).subscribe(
        () => {
          this.appointments = this.appointments.filter(a => a.id !== appointment.id);
          alert('RDV supprimé');
        },
        (err: any) => {
          alert('Erreur lors de la suppression');
          console.error(err);
        }
      );
    }
  }

  viewAppointmentDetails(appointment: any): void {
    this.selectedAppointment = { ...appointment };
  }

  closeDetailsModal(): void {
    this.selectedAppointment = null;
  }

  formatDateTime(time: string): string {
    const date = new Date(time);
    return `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:00`;
  }

  mapStatusToBackend(statut: string): string {
    switch (statut?.toLowerCase()) {
      case 'à venir': return 'upcoming';
      case 'en cours': return 'in_progress';
      case 'terminé': return 'completed';
      case 'annulé': return 'canceled';
      default: return '';
    }
  }

  mapStatusToFrontend(status: string): string {
    switch (status?.toLowerCase()) {
      case 'upcoming': return 'À Venir';
      case 'in_progress': return 'En Cours';
      case 'completed': return 'Terminé';
      case 'canceled': return 'Annulé';
      default: return '';
    }
  }
}