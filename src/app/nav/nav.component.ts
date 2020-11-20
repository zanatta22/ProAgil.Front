import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private toastr: ToastrService,
              private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.toastr.show('LogOut');
    this.router.navigate(['/user/login']);
  }

  entrar() {
    this.router.navigate(['/user/login']);
  }

  userName(){
    return sessionStorage.getItem('username');
  }

}
