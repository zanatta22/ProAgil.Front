import { Evento } from './../_models/Evento';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { TemplateParseError } from '@angular/compiler';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  imgemLargura = 50;
  imgemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  bodyDeletarEvento = '';

  modoSalvar = 'post';


  _FILTROLISTA: string;

  constructor(private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService) 
    { 
      this.localeService.use('pt-br');
    }

    get filtroLista(): string{
      return this._FILTROLISTA;
    }
    set filtroLista(value: string){
      this._FILTROLISTA = value;
      this.eventosFiltrados = this._FILTROLISTA ? this.filtrarEventos(this._FILTROLISTA) : this.eventos;
    }

    editarEvento(evento: Evento, template: any){
      this.modoSalvar = 'put';
      this.openModal(template);
      this.evento = evento;
      this.registerForm.patchValue(evento);
    }

    novoEvento(template: any){
      this.modoSalvar = 'post';
      this.openModal(template);
    }

    openModal( template: any ) {
      this.registerForm.reset();
      template.show();
    }

    ngOnInit() {
      this.validation();
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

      excluirEvento(evento: Evento, template: any){
        this.openModal(template);
        this.evento = evento;
        this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
      }

      confirmeDelete(template: any){
        this.eventoService.deleteEvento(this.evento.id).subscribe(
            () => {
              template.hide();
              this.getEventos();
            }, error => {
              console.log(error);
            }
          );
        }

        // Salvar modal
        salvarAlteracao(template: any){
          if (this.registerForm.valid){
            if (this.modoSalvar === 'post'){
              this.evento = Object.assign({}, this.registerForm.value);
              console.log(this.evento);
              this.eventoService.postEvento(this.evento).subscribe(
                (novoEvento: Evento) => {
                  console.log(novoEvento);
                  template.hide();
                  this.getEventos();
                }, error => {
                  console.log(error);
                }
                );
              } else {
                this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
                console.log(this.evento);
                this.eventoService.putEvento(this.evento).subscribe(
                  () => {
                    template.hide();
                    this.getEventos();
                  }, error => {
                    console.log(error);
                  }
                  );
                }
              }
            }

            // Validar form modal
            validation(){
              this.registerForm = this.fb.group({
                tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
                local: ['', Validators.required],
                dataEvento: ['', Validators.required],
                qtdPessoas: ['',
                [Validators.required, Validators.max(120000)]],
                imagemURL: ['', Validators.required],
                telefone: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
              });
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
