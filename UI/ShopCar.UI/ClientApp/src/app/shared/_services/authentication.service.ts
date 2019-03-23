import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CoreService } from './core.service';
import { LocalStorageService } from '../_helpers/localstorage.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': `application/json`
  }),
};

const apiUrl = `/api/Authentication/login`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends CoreService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {
    super(http);
  }

  login(user: any): Observable<any> {
    return this.post(apiUrl, user)
      .pipe(
        mergeMap(result => {
          this.loggedIn.next(true);
          return LocalStorageService.setItem('auth-user', {
            ...result
          })
        })
      )
  }

  logout() {
    localStorage.removeItem('auth-user');
    this.loggedIn.next(false);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth-user');
  }
}