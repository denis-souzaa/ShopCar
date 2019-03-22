import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../shared/_services';
import {Router}                from "@angular/router";
import {LocalStorageService} from "../../shared/_helpers/localstorage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogged: string;
  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    const user = LocalStorageService.getItem('contexto') && LocalStorageService.getItem('contexto').usuarioLogado || undefined;
    if(user){
      this.userLogged = user.name
    }
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
