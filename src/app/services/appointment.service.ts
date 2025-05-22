import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8000/api/rendez_vous';

  constructor(private http: HttpClient) {}

  // Formatage date : datetime-local → Y-m-d H:i:s
  private formatDateTime(time: string): string {
    const date = new Date(time);
    return `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:00`;
  }

  // Mapping statut frontend → backend
  private mapStatusToFrontend(status: string): string {
    switch (status) {
      case 'upcoming': return 'À Venir';
      case 'completed': return 'Terminé';
      case 'canceled': return 'Annulé';
      default: return '';
    }
  }

  getAppointments(params: any = {}): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  addAppointment(appointment: any): Observable<any> {
    if (!appointment.patient || !appointment.time) {
      return new Observable(observer => observer.error('Champs obligatoires manquants'));
    }

    const dataToSend = {
      nom_patient: appointment.patient,
      prenom_patient: appointment.prenom || '',
      date_heure: this.formatDateTime(appointment.time),
      type: appointment.type || 'Consultation',
      statut: this.mapStatusToFrontend(appointment.status),
      rappel: appointment.reminder || null
    };

    return this.http.post(this.apiUrl, dataToSend);
  }

  updateAppointment(id: number, appointment: any): Observable<any> {
    const dataToSend = {
      nom_patient: appointment.patient,
      prenom_patient: appointment.prenom || '',
      date_heure: this.formatDateTime(appointment.time),
      type: appointment.type || 'Consultation',
      statut: this.mapStatusToFrontend(appointment.status),
      rappel: appointment.reminder || null
    };

    return this.http.put(`${this.apiUrl}/${id}`, dataToSend);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}