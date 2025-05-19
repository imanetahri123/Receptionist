import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgChartsModule } from 'ng2-charts';
import { ContactComponent } from './core/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
    // ContactComponent retiré d'ici
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FullCalendarModule,
    NgChartsModule,
    HttpClientModule,
    FormsModule,
    ContactComponent // 👉 Ajouté ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }