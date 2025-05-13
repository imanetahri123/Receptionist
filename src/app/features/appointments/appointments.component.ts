import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  searchQuery = '';
  selectedStatus = '';
  selectedDate = '';
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    const filters: any = {};
    if (this.selectedStatus) filters.status = this.selectedStatus;
    if (this.searchQuery) filters.patient = this.searchQuery;
    if (this.selectedDate) filters.date = this.selectedDate;

    this.appointmentService.searchAppointments(filters).subscribe(
      (response: any) => {
        // ✅ Extraction de .data si ton API retourne { success: true, data: [...] }
        this.appointments = Array.isArray(response.data) ? response.data : [];
      },
      (error) => {
        console.error('Erreur lors du chargement des RDV', error);
        this.appointments = [];
      }
    );
  }

  // ✅ Getter utilisé dans le template HTML
  get filteredAppointments() {
    return this.appointments.filter((app: any) => {
      const matchesSearch = app.patient?.toLowerCase().includes(this.searchQuery.toLowerCase()) ?? true;
      const matchesStatus = !this.selectedStatus || app.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'upcoming':
        return 'status-badge status-upcoming';
      case 'completed':
        return 'status-badge status-completed';
      case 'canceled':
        return 'status-badge status-canceled';
      default:
        return 'status-badge';
    }
  }
}