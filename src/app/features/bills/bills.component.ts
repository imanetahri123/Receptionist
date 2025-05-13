import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent {
  searchQuery = '';
  selectedStatus = '';

  invoices = [
    { id: 1, patientName: 'Kamal', amount: 120, status: 'paid', date: '2025-04-01', description: 'Consultation générale' },
    { id: 2, patientName: 'Walid', amount: 80, status: 'pending', date: '2025-04-05', description: 'Bilan sanguin' },
    { id: 3, patientName: 'Imane', amount: 200, status: 'overdue', date: '2025-04-03', description: 'Soins intensifs' },
    { id: 4, patientName: 'Ahmed', amount: 150, status: 'paid', date: '2025-04-02', description: 'Radiographie' },
    { id: 5, patientName: 'Sana', amount: 90, status: 'overdue', date: '2025-04-06', description: 'Suivi médical' }
  ];

  get filteredInvoices() {
    return this.invoices.filter(invoice => {
      const matchesSearch = this.searchQuery
        ? invoice.patientName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          ('' + invoice.id).toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;

      const matchesStatus = this.selectedStatus
        ? this.selectedStatus === invoice.status
        : true;

      return matchesSearch && matchesStatus;
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'status-badge status-paid';
      case 'pending':
        return 'status-badge status-pending';
      case 'overdue':
        return 'status-badge status-overdue';
      default:
        return 'status-badge';
    }
  }
}