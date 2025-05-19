import { Component, AfterViewInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NgFor, NgIf]
})
export class DashboardComponent implements AfterViewInit {

  // Liste des événements pour les rendez-vous
  calendarEvents = [
    { title: 'Dr. Imane - Mr. Kamal', time: '10:00', photo: 'assets/images/doctor5.jpg' },
    { title: 'Dr. Mehdi - Mme. Hilal', time: '11:30', photo: 'assets/images/doctor1.jpg' },
    { title: 'Dr. Mohammed - M. Walid', time: '14:00', photo: 'assets/images/doctor3.jpg' }
  ];

  // Variables pour les modales
  showAppointmentForm = false;
  showPatientForm = false;
  isModalOpen = false;
  modalTitle = '';
  modalChartData: number[] = [];

  ngAfterViewInit(): void {
    this.initRdvChart();           // Rendez-vous par jour
    this.initGenderChart();        // Répartition Hommes/Femmes
    this.initAgeChart();           // Répartition par âge
    this.initWeeklyOverviewChart(); // Vue hebdomadaire
  }

  // -------------------------------------------------------------------------------------------------
  // Graphique à barres : Rendez-vous par jour
  initRdvChart() {
    const ctx = document.getElementById('appointments-chart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
        datasets: [{
          label: 'Nombre de RDV',
          data: [5, 7, 3, 6, 4],
          backgroundColor: '#3b82f6',
          hoverBackgroundColor: '#2563eb',
          borderRadius: 10
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: '#e5e7eb' } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // -------------------------------------------------------------------------------------------------
  // Graphique circulaire (Donut) : Démographie des patients (Hommes/Femmes)
  initGenderChart() {
    const genderCtx = document.getElementById('gender-distribution-chart') as HTMLCanvasElement;
    if (!genderCtx) return;

    new Chart(genderCtx, {
      type: 'doughnut',
      data: {
        labels: ['Women', 'Men'],
        datasets: [{
          label: 'Patients',
          data: [499, 749],
          backgroundColor: ['#3b82f6', '#f59e0b'],
          hoverBackgroundColor: ['#2c6dd5', '#eab308'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '60%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.parsed}%`
            }
          }
        }
      }
    });
  }

  // -------------------------------------------------------------------------------------------------
  // Graphique à barres horizontales : Répartition par âge
  initAgeChart() {
    const ageCtx = document.getElementById('age-distribution-chart') as HTMLCanvasElement;
    if (!ageCtx) return;

    new Chart(ageCtx, {
      type: 'bar',
      data: {
        labels: ['0-18 ans', '19-35 ans', '36-50 ans', '51-65 ans', '65+ ans'],
        datasets: [{
          label: 'Patients (%)',
          data: [18, 25, 32, 15, 10],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#dc3545'],
          borderRadius: 5,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { stepSize: 10 },
            grid: { color: '#e5e7eb' }
          },
          y: { grid: { display: false } }
        }
      }
    });
  }

  // -------------------------------------------------------------------------------------------------
  // Graphique hebdomadaire : Aperçu hebdomadaire
  initWeeklyOverviewChart() {
    const weeklyCtx = document.getElementById('weekly-overview-chart') as HTMLCanvasElement;
    if (!weeklyCtx) return;

    new Chart(weeklyCtx, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Rendez-vous',
          data: [6, 7, 5, 8, 6, 4, 3],
          backgroundColor: '#3b82f6',
          borderRadius: 5,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }]
      },
      options: {
        indexAxis: 'x',
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw} RDV`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
            grid: { display: false }
          },
          y: { grid: { color: '#e5e7eb' } }
        }
      }
    });
  }

  // -------------------------------------------------------------------------------------------------
  // Méthode pour ouvrir la modale avec données dynamiques
  openModal(type: string): void {
    switch (type) {
      case 'appointments':
        this.modalTitle = 'Rendez-vous par Jour';
        this.modalChartData = [5, 7, 3, 6, 4];
        break;
      case 'patients':
        this.modalTitle = 'Statistiques Patients';
        this.modalChartData = [25, 3, 12, 7];
        break;
      default:
        this.modalTitle = 'Détails';
        this.modalChartData = [0, 0];
    }

    this.isModalOpen = true;

    setTimeout(() => {
      this.initModalChart();
    }, 100);
  }

  // -------------------------------------------------------------------------------------------------
  // Graphique dans la modale
  initModalChart(): void {
    const modalCtx = document.getElementById('modal-chart') as HTMLCanvasElement;
    if (!modalCtx) return;

    // Si un graphique existait déjà, on le détruit
    const existingChart = Chart.getChart(modalCtx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(modalCtx, {
      type: 'line',
      data: {
        labels: ['Semaine dernière', 'Cette semaine'],
        datasets: [{
          label: this.modalTitle,
          data: this.modalChartData,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#3b82f6'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.parsed.y}`
            }
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // -------------------------------------------------------------------------------------------------
  // Fermer la modale
  closeModal(): void {
    this.isModalOpen = false;
  }

  // -------------------------------------------------------------------------------------------------
  // Ouvrir les formulaires modaux
  openNewAppointmentModal(): void {
    this.showAppointmentForm = true;
  }

  openNewPatientModal(): void {
    this.showPatientForm = true;
  }

  closeModals(): void {
    this.showAppointmentForm = false;
    this.showPatientForm = false;
  }

  submitAppointment(event: Event): void {
    event.preventDefault();
    alert('Rendez-vous enregistré avec succès !');
    this.closeModals();
  }

  submitPatient(event: Event): void {
    event.preventDefault();
    alert('Patient ajouté avec succès !');
    this.closeModals();
  }

  // Gestion des erreurs d'image
  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/60x60?text=Erreur ';
  }
}