import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements AfterViewInit {

  calendarEvents = [
    { title: 'Dr. Imane - Mr. Kamal', time: '10:00', photo: 'assets/images/doctor5.jpg' },
    { title: 'Dr. Mehdi - Mme. Hilal', time: '11:30', photo: 'assets/images/doctor1.jpg' },
    { title: 'Dr. Mohammed - M. Walid', time: '14:00', photo: 'assets/images/doctor3.jpg' }
  ];

  ngAfterViewInit() {
    this.initRdvChart();        // Graphique des rendez-vous (barres)
    this.initGenderChart();     // Graphique démographie (donut)
    this.initAgeChart();        // Graphique répartition par âge (barres horizontales)
    this.initWeeklyOverviewChart(); // 👈 Nouveau : Weekly Overview
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
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e5e7eb'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // -------------------------------------------------------------------------------------------------
  // Graphique circulaire (Donut) : Démographie des patients (Hommes/Femmes)
  initGenderChart() {
    const genderCtx = document.getElementById('gender-distribution-chart') as HTMLCanvasElement;
    if (!genderCtx) {
      console.error("Canvas 'gender-distribution-chart' introuvable !");
      return;
    }

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
          legend: {
            display: false
          },
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
    if (!ageCtx) {
      console.error("Canvas 'age-distribution-chart' introuvable !");
      return;
    }

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
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              stepSize: 10
            },
            grid: {
              color: '#e5e7eb'
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // -------------------------------------------------------------------------------------------------
  // Graphique hebdomadaire : Aperçu hebdomadaire
  initWeeklyOverviewChart() {
    const weeklyCtx = document.getElementById('weekly-overview-chart') as HTMLCanvasElement;
    if (!weeklyCtx) {
      console.error("Canvas 'weekly-overview-chart' introuvable !");
      return;
    }

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
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw} RDV`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              color: '#e5e7eb'
            }
          }
        }
      }
    });
  }

  // Gestion des erreurs d'image
  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/60x60?text=Erreur   ';
  }
}