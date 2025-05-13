import { Component, AfterViewInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule } from '@angular/forms'; // ✅ Import ici

@Component({
  selector: 'app-doctors-planning',
  templateUrl: './doctors-planning.component.html',
  styleUrls: ['./doctors-planning.component.css'],
  standalone: true,
  imports: [
    FormsModule // ✅ Ajout ici
  ]
})
export class DoctorsPlanningComponent implements AfterViewInit {
  selectedDoctor = 'all'; // Médecin sélectionné
  selectedView = 'dayGridMonth'; // Vue par défaut
  currentViewDate = 'Juin 2025'; // Date affichée
  private calendar!: Calendar;

  ngAfterViewInit() {
    const calendarEl = document.getElementById('calendar') as HTMLElement;

    this.calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: this.selectedView,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        {
          title: 'Consultation Dr. Dupont',
          start: '2023-06-10T10:00:00',
          end: '2023-06-10T11:00:00',
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6'
        },
        {
          title: 'Examen Mme. Bernard',
          start: '2023-06-15T14:30:00',
          end: '2023-06-15T15:30:00',
          backgroundColor: '#10b981',
          borderColor: '#10b981'
        },
        {
          title: 'Suivi M. Lemoine',
          start: '2023-06-20T16:00:00',
          end: '2023-06-20T17:00:00',
          backgroundColor: '#f59e0b',
          borderColor: '#f59e0b'
        }
      ],
      views: {
        dayGridMonth: {
          titleFormat: { year: 'numeric', month: 'long' }
        },
        timeGridWeek: {
          titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
        },
        timeGridDay: {
          titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
        }
      }
    });

    this.calendar.render();
    this.updateCurrentViewDate();
  }

  changeView(view: string) {
    this.calendar.changeView(view);
    this.selectedView = view;
    this.updateCurrentViewDate();
  }

  prevMonth() {
    this.calendar.prev();
    this.updateCurrentViewDate();
  }

  nextMonth() {
    this.calendar.next();
    this.updateCurrentViewDate();
  }

  updateCurrentViewDate() {
    this.currentViewDate = this.calendar.view.title;
  }
}