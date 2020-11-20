import { element } from 'protractor';
import { AuthService } from './../../_services/auth.service';
import { User } from './../../_models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(public fb: FormBuilder, private localeService: BsLocaleService, private toastr: ToastrService,
              private authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
        fullName : ['', Validators.required],
        email : ['', [Validators.required, Validators.email]],
        userName : ['', Validators.required],
        passwords: this.fb.group({
          password : ['', [Validators.required, Validators.minLength(4)]],
          confirmPassword : ['', Validators.required]
        }, { validator: this.compararSenhas })
    });
  }

  compararSenhas(fb: FormGroup) {
    const confirmSenhaCtrl = fb.get('confirmPassword');

    if (confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors){
      if (fb.get('password').value !== confirmSenhaCtrl.value) {
        confirmSenhaCtrl.setErrors({mismatch: true});
      } else {
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario(){
    if (this.registerForm.valid) {
      this.user = Object.assign({password: this.registerForm.get('passwords.password').value},
      this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro Realizado');
        },
        error => {
          const erro = error.error;
          // tslint:disable-next-line: no-shadowed-variable
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Cadastro Duplicado')
                break;
              default:
                this.toastr.error(`Erro no cadastro! CODE: ${element.code}`);
                break;
            }
          });
        }
      )
    }
  }

}
