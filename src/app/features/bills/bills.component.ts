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
  selectedDate = '';

  invoices = [
    { id: 1, patientName: 'Kamal', amount: 120, date: '2025-04-01', description: 'Consultation générale' },
    { id: 2, patientName: 'Walid', amount: 80, date: '2025-04-05', description: 'Bilan sanguin' },
    { id: 3, patientName: 'Imane', amount: 200, date: '2025-04-03', description: 'Soins intensifs' },
    { id: 4, patientName: 'Ahmed', amount: 150, date: '2025-04-02', description: 'Radiographie' },
    { id: 5, patientName: 'Sana', amount: 90, date: '2025-04-06', description: 'Suivi médical' }
  ];

  showModal = false;
  modalMode: 'add' | 'edit' | 'view' = 'add';
  selectedInvoice: any = null;
  newInvoice: any = {
    id: null,
    patientName: '',
    amount: null,
    date: '',
    description: ''
  };

  // Pagination
  itemsPerPage = 5;
  currentPage = 1;

  get filteredInvoices() {
    return this.invoices.filter(invoice => {
      const matchesSearch = this.searchQuery
        ? invoice.patientName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          ('' + invoice.id).toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;

      const matchesDate = this.selectedDate
        ? invoice.date === this.selectedDate
        : true;

      return matchesSearch && matchesDate;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredInvoices.length / this.itemsPerPage);
  }

  get paginatedInvoices() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredInvoices.slice(start, end);
  }

  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i);
  }

  openAddModal() {
    this.modalMode = 'add';
    this.newInvoice = {
      id: null,
      patientName: '',
      amount: null,
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