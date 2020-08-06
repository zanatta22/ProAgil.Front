import { Evento } from './../_models/Evento';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';

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

  eventosFiltrados: Evento[];
  eventos: Evento[];
  imgemLargura = 50;
  imgemMargem = 2;
  mostrarImagem = false;


  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      eventos => eventos.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      (_EVENTOS: Evento[]) => {
        this.eventos = _EVENTOS;
        this.eventosFiltrados = this.eventos;
        console.log(_EVENTOS);
       },
       error => {
         console.log(error);
       }

    );
  }

}
