import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import des composants
import { LayoutComponent } from './core/layout/layout/layout.component';
import { ContactComponent } from './core/contact/contact.component'; // 👈 Import OK

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./features/appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'doctors-planning',
        loadChildren: () =>
          import('./features/doctors-planning/doctors-planning.module').then(
            (m) => m.DoctorsPlanningModule
          ),
      },
      {
        path: 'medical-record',
        loadChildren: () =>
          import('./features/medical-record/medical-record.module').then(
            (m) => m.MedicalRecordModule
          ),
      },
      {
        path: 'bills',
        loadChildren: () =>
          import('./features/bills/bills.module').then((m) => m.BillsModule),
      },
      {
        path: 'reminders',
        loadChildren: () =>
          import('./features/reminders/reminders.module').then(
            (m) => m.RemindersModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'contact', // 👈 Route ajoutée
        component: ContactComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}