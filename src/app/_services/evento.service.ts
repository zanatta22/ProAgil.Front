import { Evento } from './../_models/Evento';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:5001/api/evento';

  getAllEvento(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.baseUrl);
  }

  getEventoByTema(tema: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseUrl}/getByTema/${tema}`);
  }

  getEventoById(id: number): Observable<Evento>{
    return this.http.get<Evento>(`${this.baseUrl}/${id}`);
  }



}
