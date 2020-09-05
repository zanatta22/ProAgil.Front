import { TituloComponent } from './_shared/titulo/titulo.component';
import { EventoService } from './_services/evento.service';
import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { NavComponent } from './nav/nav.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ToastrModule } from 'ngx-toastr';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';


@NgModule({
   declarations: [
      AppComponent,
      EventosComponent,
      NavComponent,
      DateTimeFormatPipePipe,
      PalestrantesComponent,
      DashboardComponent,
      ContatosComponent,
      TituloComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      BsDatepickerModule.forRoot(),
      BrowserAnimationsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot()
   ],
   providers: [
     EventoService

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
