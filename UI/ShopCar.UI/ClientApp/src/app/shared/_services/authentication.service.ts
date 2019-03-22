import { Injectable }                  from '@angular/core';
import { HttpClient, HttpHeaders }     from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap }                    from 'rxjs/operators';
import { CoreService }                 from './core.service';
import { LocalStorageService }         from '../_helpers/localstorage.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Basic ${btoa('front-end-angular:frontendangularpass')}`
  }),
};

const apiUrl = `/oauth/token`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends CoreService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {
    super(http);
  }

  login(user: any): Observable<any> {
    return this.post(apiUrl, user, httpOptions)
    .pipe(
      mergeMap(result => {
          return this.get('/api/seguranca/contexto', {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${result.access_token}`
            })
          }).pipe(
            mergeMap(({ data }) => {
              this.loggedIn.next(true);
              return LocalStorageService.setItem('contexto', {
                access_token : result.access_token,
                refresh_token: result.refresh_token,
                ...data
              });
            })
          );
        }
      )
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = LocalStorageService.getItem('contexto').refresh_token;

    const user = new FormData();

    user.append('grant_type', 'refresh_token');
    user.append('refresh_token', refreshToken);

    return this.post(apiUrl, user, httpOptions)
    .pipe(
      mergeMap(result => {
          return this.get('/api/seguranca/contexto', {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${result.access_token}`
            })
          })
          .pipe(
            mergeMap(({ data }) => {
              this.loggedIn.next(true);
              return LocalStorageService.setItem('contexto', {
                access_token : result.access_token,
                refresh_token: result.refresh_token,
                ...data
              });
            })
          );
        }
      ));
  }

  logout() {
    localStorage.removeItem('contexto');
    this.loggedIn.next(false);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('contexto');
  }
}
