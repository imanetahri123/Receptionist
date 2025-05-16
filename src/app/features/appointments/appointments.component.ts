import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  // Formulaire d’ajout
  showAddModal: boolean = false;
  newAppointment: any = {
    id: null,
    patient: '',
    time: '',
    type: '',
    status: 'upcoming',
    reminder: ''
  };

  constructor() {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    const filters: any = {};
    if (this.selectedStatus) filters.status = this.selectedStatus;
    if (this.searchQuery) filters.patient = this.searchQuery;
    if (this.selectedDate) filters.date = this.selectedDate;

    // Simule un chargement depuis l'API
    this.appointments = [
      {
        id: 1,
        time: '10:00 AM',
        patient: 'Salwa Slimani',
        type: 'Consultation',
        status: 'upcoming',
        reminder: 'Rappel envoyé'
      },
      {
        id: 2,
        time: '11:30 AM',
        patient: 'Imane Tahri',
        type: 'Suivi',
        status: 'completed',
        reminder: ''
      }
    ];
  }

  get filteredAppointments() {
    return this.appointments.filter((app: any) => {
      const matchesSearch =
        !this.searchQuery ||
        app.patient?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        ('' + app.id).toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || app.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  getLabelFromStatus(status: string): string {
    switch (status) {
      case 'upcoming': return 'À venir';
      case 'completed': return 'Terminé';
      case 'canceled': return 'Annulé';
      default: return 'Inconnu';
    }
  }

  openEditModal(appointment: any): void {
    this.editingAppointment = { ...appointment };
  }

  closeEditModal(): void {
    this.editingAppointment = null;
  }

  saveUpdatedAppointment(): void {
    if (!this.editingAppointment) return;

    const index = this.appointments.findIndex(a => a.id === this.editingAppointment.id);
    if (index !== -1) {
      this.appointments[index] = { ...this.editingAppointment };
    }
    this.closeEditModal();
    alert('RDV mis à jour');
  }

  deleteAppointment(appointment: any): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${appointment.patient} ?`)) {
      this.appointments = this.appointments.filter(a => a.id !== appointment.id);
      alert('RDV supprimé');
    }
  }

  viewAppointmentDetails(appointment: any): void {
    this.selectedAppointment = { ...appointment };
  }

  closeDetailsModal(): void {
    this.selectedAppointment = null;
  }

  openAddModal(): void {
    this.showAddModal = true;
    this.newAppointment = {
      id: null,
      patient: '',
      time: '',
      type: '',
      status: 'upcoming',
      reminder: ''
    };
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  saveNewAppointment(): void {
    if (!this.newAppointment.patient || !this.newAppointment.time) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const newId = this.appointments.length ? Math.max(...this.appointments.map(a => a.id)) + 1 : 1;
    this.newAppointment.id = newId;
    this.appointments.push({ ...this.newAppointment });
    this.closeAddModal();
    alert('Nouveau RDV ajouté');
  }
}