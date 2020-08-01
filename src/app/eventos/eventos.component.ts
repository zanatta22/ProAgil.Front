import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any = [
    {
      EventoId: 1,
      Tema: 'Angular',
      Local: 'Curitiba'
    },
    {
      EventoId: 2,
      Tema: 'AspNet',
      Local: 'Curitiba'
    },
    {
      EventoId: 3,
      Tema: 'AspNet e Angular',
      Local: 'Curitiba'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
