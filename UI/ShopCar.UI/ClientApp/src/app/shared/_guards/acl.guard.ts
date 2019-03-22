import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from "../_helpers/localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class AclGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const contexto = LocalStorageService.getItem('contexto');
    if (state.url === '/login' && contexto) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
