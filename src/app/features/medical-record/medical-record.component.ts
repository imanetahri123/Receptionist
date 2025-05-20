import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent {
  currentView = 'grid';
  isListView = false;

  patients = [
    {
      id: 1,
      name: 'Walid Sadiq',
      email: 'kamal@asio.com',
      phone: '06 12 34 56 78',
      dob: '1990-04-12',
      photo: '/assets/images/P4.jpg',
      status: 'active',
      nationality: 'Marocaine',
      bloodGroup: 'A+',
      maritalStatus: 'Célibataire',
      gender: 'Homme',
      address: 'Rabat, Maroc',
      showDetails: false
    },
    {
      id: 2,
      name: 'Imane Tahri',
      email: 'imane@asio.com',
      phone: '06 87 65 43 21',
      dob: '1995-08-05',
      photo: '/assets/images/eps3.jpg',
      status: 'follow up',
      nationality: 'Marocaine',
      bloodGroup: 'O-',
      maritalStatus: 'Mariée',
      gender: 'Femme',
      address: 'Casablanca, Maroc',
      showDetails: false
    },
    {
      id: 3,
      name: 'Salwa Slimani',
      email: 'salwa@asio.com',
      phone: '07 11 22 33 44',
      dob: '',
      photo: '/assets/images/p2.jpg',
      status: 'critical',
      nationality: 'Marocaine',
      bloodGroup: 'B+',
      maritalStatus: 'Divorcée',
      gender: 'Femme',
      address: 'Fès, Maroc',
      showDetails: false
    },
    {
      id: 4,
      name: 'Youssef El Alaoui',
      email: 'youssef@asio.com',
      phone: '06 55 44 33 22',
      dob: '1988-11-20',
      photo: '/assets/images/p1.jpg',
      status: 'active',
      nationality: 'Marocaine',
      bloodGroup: 'AB+',
      maritalStatus: 'Célibataire',
      gender: 'Homme',
      address: 'Marrakech, Maroc',
      showDetails: false
    },
    {
      id: 5,
      name: 'Hamza Idrissi',
      email: 'hamza@asio.com',
      phone: '06 99 88 77 66',
      dob: '1992-03-15',
      photo: '/assets/images/P5.jpg',
      status: 'follow up',
      nationality: 'Marocaine',
      bloodGroup: 'A-',
      maritalStatus: 'Marié',
      gender: 'Homme',
      address: 'Agadir, Maroc',
      showDetails: false
    },
    {
      id: 6,
      name: 'Ali Bensalah',
      email: 'ali@asio.com',
      phone: '07 66 55 44 33',
      dob: '1994-09-10',
      photo: '/assets/images/P6.jpeg',
      status: 'active',
      nationality: 'Marocaine',
      bloodGroup: 'O+',
      maritalStatus: 'Célibataire',
      gender: 'Homme',
      address: 'Tanger, Maroc',
      showDetails: false
    },
    {
      id: 7,
      name: 'Salwa Chafiq',
      email: 'salwac@asio.com',
      phone: '06 44 55 66 77',
      dob: '1993-12-25',
      photo: '/assets/images/FE.jpg',
      status: 'critical',
      nationality: 'Marocaine',
      bloodGroup: 'B-',
      maritalStatus: 'Mariée',
      gender: 'Femme',
      address: 'Meknès, Maroc',
      showDetails: false
    }
  ];

  searchQuery = '';
  selectedStatus = '';
  filteredPatients: any[] = [...this.patients];

  showAddModal = false;
  editingPatient: any = null;
  newPatient: any = {
    id: null,
    name: '',
    email: '',
    phone: '',
    dob: '',
    photo: '/assets/images/default-user.png',
    status: 'active',
    nationality: '',
    bloodGroup: '',
    maritalStatus: '',
    gender: '',
    address: '',
    showDetails: false
  };

  constructor() {}

  ngOnInit(): void {
    this.applyFilters();
  }

  toggleView() {
    this.currentView = this.isListView ? 'list' : 'grid';
  }

  applyFilters() {
    this.filteredPatients = this.patients
      .filter(patient => {
        const matchesSearch =
          !this.searchQuery ||
          patient.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          ('#' + patient.id).toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesStatus =
          !this.selectedStatus || patient.status === this.selectedStatus;

        return matchesSearch && matchesStatus;
      });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Actif';
      case 'follow up': return 'En Suivi';
      case 'critical': return 'Urgent';
      default: return 'Inconnu';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'follow up': return 'bg-yellow-100 text-yellow-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/60x60?text=Erreur   ';
  }

  openAddModal() {
    this.editingPatient = null;
    this.newPatient = {
      id: null,
      name: '',
      email: '',
      phone: '',
      dob: '',
      photo: '/assets/images/default-user.png',
      status: 'active',
      nationality: '',
      bloodGroup: '',
      maritalStatus: '',
      gender: '',
      address: '',
      showDetails: false
    };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  saveNewPatient() {
    if (!this.newPatient.name || !this.newPatient.email) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    const newId = this.patients.length ? Math.max(...this.patients.map(p => p.id)) + 1 : 1;
    this.newPatient.id = newId;
    this.newPatient.showDetails = false;
    this.patients.push({ ...this.newPatient });
    this.applyFilters();
    this.closeAddModal();
    alert('Patient ajouté');
  }

  openEditModal(patient: any) {
    this.editingPatient = { ...patient };
    this.newPatient = { ...patient };
    this.showAddModal = true;
  }

  updatePatient() {
    if (!this.editingPatient || !this.editingPatient.id) return;
    const index = this.patients.findIndex(p => p.id === this.editingPatient.id);
    if (index !== -1) {
      this.patients[index] = { ...this.newPatient };
    }
    this.applyFilters();
    this.showAddModal = false;
    alert('Patient mis à jour');
  }

  deletePatient(patient: any) {
    if (confirm(`Supprimer ${patient.name} ?`)) {
      this.patients = this.patients.filter(p => p.id !== patient.id);
      this.applyFilters();
      alert('Patient supprimé');
    }
  }

  toggleDetails(patient: any) {
    patient.showDetails = !patient.showDetails;
  }
}