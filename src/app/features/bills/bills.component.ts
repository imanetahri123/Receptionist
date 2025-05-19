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

  showModal = false;
  modalMode: 'add' | 'edit' | 'view' = 'add';
  selectedInvoice: any = null;
  newInvoice: any = {
    id: null,
    patientName: '',
    amount: null,
    status: 'pending',
    date: '',
    description: ''
  };

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
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  }

  openAddModal() {
    this.modalMode = 'add';
    this.newInvoice = {
      id: null,
      patientName: '',
      amount: null,
      status: 'pending',
      date: '',
      description: ''
    };
    this.showModal = true;
  }

  openEditModal(invoice: any) {
    this.modalMode = 'edit';
    this.newInvoice = { ...invoice };
    this.showModal = true;
  }

  openViewModal(invoice: any) {
    this.modalMode = 'view';
    this.selectedInvoice = invoice;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedInvoice = null;
  }

  saveInvoice() {
    if (!this.newInvoice.patientName || !this.newInvoice.amount || !this.newInvoice.date) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (this.modalMode === 'add') {
      const newId = this.invoices.length ? Math.max(...this.invoices.map(i => i.id)) + 1 : 1;
      this.newInvoice.id = newId;
      this.invoices.push({ ...this.newInvoice });
    } else if (this.modalMode === 'edit') {
      const idx = this.invoices.findIndex(i => i.id === this.newInvoice.id);
      if (idx !== -1) this.invoices[idx] = { ...this.newInvoice };
    }
    this.closeModal();
  }

  deleteInvoice(invoice: any) {
    if (confirm(`Supprimer la facture #${invoice.id} ?`)) {
      this.invoices = this.invoices.filter(i => i.id !== invoice.id);
    }
  }
}