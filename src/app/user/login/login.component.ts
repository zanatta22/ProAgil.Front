import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  titulo = 'Login';
  model: any = {};

  constructor(private localeService: BsLocaleService, private toastr: ToastrService,
              private authService: AuthService, public router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.authService.login(this.model)
    .subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.toastr.error('Falha ao logar');
        console.log(error);
      }
    );
  }

}
