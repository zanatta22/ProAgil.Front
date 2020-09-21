import { Evento } from './../_models/Evento';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { TemplateParseError } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  titulo = 'Eventos';

  file: File;

  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  imgemLargura = 50;
  imgemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  bodyDeletarEvento = '';

  modoSalvar = 'post';
  dataAtual: string;

  _FILTROLISTA: string;
  fileNameToUpdate: string;

  constructor(private eventoService: EventoService, private modalService: BsModalService,
    private fb: FormBuilder, private localeService: BsLocaleService, private toastr: ToastrService)
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
      this.evento = Object.assign({}, evento);
      this.fileNameToUpdate = evento.imagemURL.toString();
      this.evento.imagemURL = '';
      this.registerForm.patchValue(this.evento);
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
              this.toastr.success('Deletado com sucesso');
            }, error => {
              this.toastr.error('Erro ao tentar Deletar');
              console.log(error);
            }
          );
        }

        uploadImagem(){
         // Imagem
         if (this.modoSalvar === 'post') {
         const nomeArquivo = this.evento.imagemURL.split('\\', 3);
         this.evento.imagemURL = nomeArquivo[2];

         this.eventoService.postUpload(this.file, nomeArquivo[2])
         .subscribe(
           () => {
             this.dataAtual = new Date().getMilliseconds().toString();

             this.getEventos();
           }
         );
        } else {
          this.evento.imagemURL = this.fileNameToUpdate;
          this.eventoService.postUpload(this.file, this.fileNameToUpdate)
          .subscribe(
            () => {
              this.dataAtual = new Date().getMilliseconds().toString();

              this.getEventos();
            }
          );
        }
        }

        // Salvar modal
        salvarAlteracao(template: any){
          if (this.registerForm.valid){
            if (this.modoSalvar === 'post'){
              this.evento = Object.assign({}, this.registerForm.value);

              this.uploadImagem();

              console.log(this.evento);
              this.eventoService.postEvento(this.evento).subscribe(
                (novoEvento: Evento) => {
                  console.log(novoEvento);
                  template.hide();
                  this.getEventos();
                  this.toastr.success('Inserido com sucesso');
                }, error => {
                  this.toastr.success(`Erro ao inserir ${error}`);
                  console.log(error);
                }
                );
              } else {
                this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
                console.log(this.evento);

                this.uploadImagem();

                this.eventoService.putEvento(this.evento).subscribe(
                  () => {
                    template.hide();
                    this.getEventos();
                    this.toastr.success('Editado com sucesso');
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
                },
                error => {
                  console.log(error);
                }

                );
              }


              // Enviar imagem
              onFileChange(event){
                const reader = new FileReader();

                if(event.target.files && event.target.files.length) {
                  this.file = event.target.files;
                  console.log(this.file);
                }
              }

            }


