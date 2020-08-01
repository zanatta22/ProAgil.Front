import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  _FILTROLISTA: string;
  get filtroLista(): string{
    return this._FILTROLISTA;
  }
  set filtroLista(value: string){
    this._FILTROLISTA = value;
    this.eventosFiltrados = this._FILTROLISTA ? this.filtrarEventos(this._FILTROLISTA) : this.eventos;
  }

  eventosFiltrados: any = [];

  eventos: any = [];
  imgemLargura = 50;
  imgemMargem = 2;
  mostrarImagem = false;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      eventos => eventos.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos() {
    this.http.get('https://localhost:5001/api/values').subscribe(
      response => {
        this.eventos = response;
        console.log(response);
       },
       error => {
         console.log(error);
       }

    );
  }

}
