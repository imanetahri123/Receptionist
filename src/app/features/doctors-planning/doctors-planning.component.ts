import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ Pour @for et autres directives Angular

@Component({
  selector: 'app-doctors-planning',
  templateUrl: './doctors-planning.component.html',
  styleUrls: ['./doctors-planning.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // ✅ Ajoute CommonModule ici
})
export class DoctorsPlanningComponent implements AfterViewInit {
  doctorName = 'Dr. Kamal Berrada';
  selectedView = 'dayGridMonth';
  currentViewDate = 'Juin 2025';
  selectedDateAppointments: any[] = [];
  showAppointmentPanel = false;
  selectedDate: string | null = null;

  views = [
    { label: 'Mois', value: 'dayGridMonth' },
    { label: 'Semaine', value: 'timeGridWeek' },
    { label: 'Jour', value: 'timeGridDay' }
  ];

  calendarEvents = [
    {
      title: 'Consultation - Mme. Slimani',
      start: '2025-06-10T10:00:00',
      end: '2025-06-10T11:00:00',
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6'
    },
    {
      title: 'Examen - Mr. Tahri',
      start: '2025-06-15T14:30:00',
      end: '2025-06-15T15:30:00',
      backgroundColor: '#10b981',
      borderColor: '#10b981'
    },
    {
      title: 'Suivi - M. Barkouch',
      start: '2025-06-15T16:00:00',
      end: '2025-06-15T17:00:00',
      backgroundColor: '#f59e0b',
      borderColor: '#f59e0b'
    }
  ];

  @ViewChild('calendarEl') calendarEl!: ElementRef<HTMLElement>;
  private calendar!: Calendar;

  constructor() {}

  ngAfterViewInit(): void {
    const calendarElement = this.calendarEl?.nativeElement;

    if (!calendarElement) {
      console.error('Élément #calendar introuvable');
      return;
    }

    this.calendar = new Calendar(calendarElement, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: this.selectedView,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: this.calendarEvents,
      editable: true,
      selectable: true,
      selectMirror: true,

      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      select: this.handleDateSelect.bind(this),
      datesSet: () => this.updateCurrentViewDate()
    });

    this.calendar.render();
    this.updateCurrentViewDate();
  }

  updateCurrentViewDate(): void {
    if (this.calendar.view) {
      this.currentViewDate = this.calendar.view.title;
    }
  }

  changeView(view: string): void {
    this.calendar.changeView(view);
    this.selectedView = view;
    this.updateCurrentViewDate();
  }

  prev(): void {
    this.calendar.prev();
    this.updateCurrentViewDate();
  }

  next(): void {
    this.calendar.next();
    this.updateCurrentViewDate();
  }

  // 🔥 Gestion du clic sur une date vide
  handleDateClick(arg: any): void {
    const clickedDateStr = arg.dateStr.split('T')[0];

    // Filtre les événements du jour cliqué
    this.selectedDateAppointments = this.calendarEvents.filter(event =>
      event.start.includes(clickedDateStr)
    );

    this.selectedDate = clickedDateStr;
    this.showAppointmentPanel = this.selectedDateAppointments.length > 0;

    setTimeout(() => {
      const panel = document.getElementById('appointment-panel');
      panel?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  // ⏰ Sélection d'une plage horaire
  handleDateSelect(selectInfo: any): void {
    const startDate = selectInfo.startStr;
    const endDate = selectInfo.endStr;
    const isAllDay = selectInfo.allDay ? 'Toute la journée' : 'De ' + selectInfo.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' à ' + selectInfo.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const confirm = window.confirm(`Souhaitez-vous ajouter un RDV ${isAllDay} ?`);

    if (confirm) {
      this.calendar.addEvent({
        title: 'Nouveau RDV',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: '#a855f7',
        borderColor: '#a855f7'
      });
    }

    this.calendar.unselect(); // Réinitialiser la sélection
  }

  // 📌 Clic sur un événement
  handleEventClick(arg: any): void {
    const eventName = arg.event.title;
    const eventDate = arg.event.start.toLocaleDateString();

    const action = window.prompt(
      `RDV sélectionné : ${eventName}\nLe : ${eventDate}\n\nQue souhaitez-vous faire ?\n1. Modifier\n2. Supprimer`, 
      'Modifier'
    );

    if (action?.toLowerCase() === 'supprimer' || action === '2') {
      arg.event.remove();
    } else {
      const newTitle = prompt('Nouveau titre du RDV ?', eventName);
      if (newTitle && newTitle !== eventName) {
        arg.event.setProp('title', newTitle);
      }
    }
  }
}