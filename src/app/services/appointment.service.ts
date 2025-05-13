import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8000/api/appointments'; // URL de ton backend Laravel

  constructor(private http: HttpClient) {}

  getAllAppointments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  searchAppointments(params: any): Observable<any> {
    let url = `${this.apiUrl}?`;

    for (const key in params) {
      if (params[key]) {
        url += `${key}=${params[key]}&`;
      }
    }

    return this.http.get(url);
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createAppointment(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateAppointment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}