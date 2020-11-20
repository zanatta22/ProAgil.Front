import { Evento } from './../_models/Evento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

constructor(private http: HttpClient){}

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

  postEvento(evento: Evento){
    return this.http.post(this.baseUrl, evento);
  }

  putEvento(evento: Evento){
    return this.http.put(`${this.baseUrl}/${evento.id}`, evento);
  }

  deleteEvento(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

 // post upload
  postUpload(file: File, name: string) {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, name);


    return this.http.post(`${this.baseUrl}/upload`, formData);
  }


}
