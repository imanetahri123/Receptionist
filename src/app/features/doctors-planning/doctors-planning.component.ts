import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors-planning',
  templateUrl: './doctors-planning.component.html',
  styleUrls: ['./doctors-planning.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DoctorsPlanningComponent implements AfterViewInit {
  doctorName = 'Dr. Kamal Berrada';
  selectedView = 'timeGridWeek';
  currentViewDate = 'Juin 2025';
  selectedDateAppointments: any[] = [];
  showAppointmentPanel = false;
  showEventModal = false;
  selectedDate = '';

  // Pour la modale d'édition
  editEventModal = false;
  eventToEdit: any = null;

  views = [
    { value: 'dayGridMonth', label: 'Mois' },
    { value: 'timeGridWeek', label: 'Semaine' },
    { value: 'timeGridDay', label: 'Jour' }
  ];

  calendarEvents = [
    {
      title: 'Consultation - Salwa Slimani',
      start: '2025-06-10T10:00:00',
      end: '2025-06-10T11:00:00',
      backgroundColor: '#6366f1',
      borderColor: '#6366f1'
    },
    {
      title: 'Examen - Imane Tahri',
      start: '2025-06-15T14:30:00',
      end: '2025-06-15T15:30:00',
      backgroundColor: '#10b981',
      borderColor: '#10b981'
    },
    {
      title: 'Suivi - Sana Barkouch',
      start: '2025-06-15T16:00:00',
      end: '2025-06-15T17:00:00',
      backgroundColor: '#f59e0b',
      borderColor: '#f59e0b'
    }
  ];

  appointmentTypes = [
    'Consultation',
    'Suivi',
    'Examen',
    'Urgence',
    'Vaccination',
    'Bilan',
    'Téléconsultation',
    'Intervention',
    'Autre'
  ];

  newEvent = {
    title: '',
    patient: '',
    type: 'Consultation',
    date: '',
    time: '09:00',
    duration: 30
  };

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

  handleDateClick(arg: any): void {
    const clickedDateStr = arg.dateStr.split('T')[0];

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

  handleDateSelect(selectInfo: any): void {
    const date = selectInfo.startStr.split('T')[0];
    const startTime = selectInfo.start.toTimeString().substring(0, 5);
    const duration = (selectInfo.end.getTime() - selectInfo.start.getTime()) / 60000;

    this.newEvent = {
      title: '',
      patient: '',
      type: 'Consultation',
      date: date,
      time: startTime,
      duration: duration > 0 ? duration : 30
    };
    this.showEventModal = true;

    this.calendar.unselect();
  }

  // Ouvre la modale d'édition quand on clique sur un événement
  handleEventClick(clickInfo: any): void {
    const [typeTitle, patient] = clickInfo.event.title.split(' - ');
    const typeMatch = typeTitle.match(/^\[(.*?)\]/);
    const type = typeMatch ? typeMatch[1] : 'Consultation';
    const title = typeTitle.replace(/^\[.*?\]\s?/, '');

    this.eventToEdit = {
      event: clickInfo.event,
      title,
      patient: patient || '',
      type,
      date: clickInfo.event.startStr.split('T')[0],
      time: clickInfo.event.startStr.split('T')[1]?.substring(0,5) || '09:00',
      duration: (new Date(clickInfo.event.endStr).getTime() - new Date(clickInfo.event.startStr).getTime()) / 60000
    };
    this.editEventModal = true;
  }

  openAddEventModal(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.newEvent = {
      title: '',
      patient: '',
      type: 'Consultation',
      date: currentDate,
      time: '09:00',
      duration: 30
    };
    this.showEventModal = true;
  }

  closeAddEventModal(): void {
    this.showEventModal = false;
  }

  addNewEvent(): void {
    if (!this.newEvent.title || !this.newEvent.patient || !this.newEvent.date || !this.newEvent.time) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const start = new Date(`${this.newEvent.date}T${this.newEvent.time}`);
    const end = new Date(start.getTime() + this.newEvent.duration * 60000);

    this.calendar.addEvent({
      title: `[${this.newEvent.type}] ${this.newEvent.title} - ${this.newEvent.patient}`,
      start: start.toISOString(),
      end: end.toISOString(),
      backgroundColor: '#6366f1',
      borderColor: '#6366f1'
    });

    this.closeAddEventModal();
  }

  // --- MODALE EDITION ---
  closeEditEventModal() {
    this.editEventModal = false;
    this.eventToEdit = null;
  }

  saveEditEvent() {
    if (!this.eventToEdit.title || !this.eventToEdit.patient || !this.eventToEdit.date || !this.eventToEdit.time) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const start = new Date(`${this.eventToEdit.date}T${this.eventToEdit.time}`);
    const end = new Date(start.getTime() + this.eventToEdit.duration * 60000);

    this.eventToEdit.event.setProp('title', `[${this.eventToEdit.type}] ${this.eventToEdit.title} - ${this.eventToEdit.patient}`);
    this.eventToEdit.event.setStart(start.toISOString());
    this.eventToEdit.event.setEnd(end.toISOString());

    this.closeEditEventModal();
  }

  deleteEditEvent() {
    if (confirm('Voulez-vous vraiment supprimer ce rendez-vous ?')) {
      this.eventToEdit.event.remove();
      this.closeEditEventModal();
    }
  }

  saveAllEvents(): void {
    alert('Fonction de sauvegarde à implémenter.');
  }
}