import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {AuthenticationService} from '../_services';
import {NotificationsService} from "../_services/notifications.service";
import { MessageDefault } from '../_enums/messageDefault';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthenticationService, private notificiationService: NotificationsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handle400Error(error);
            case 500:
              return this.handle500Error(error);
            default:
              return observableThrowError(error);
          }
        }
        return observableThrowError(error);
      }));
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({setHeaders: {Authorization: 'Bearer ' + token}});
  }

  handle400Error(error): Observable<any> {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      return this.logout();
    }
    return observableThrowError(error);
  }

  handle500Error(error): Observable<any> {
    if (error.status === 500) {
     this.notificiationService.onError(MessageDefault.ERROR);
    }
    return observableThrowError(error);
  }

  logout() {
    this.authService.logout();
    return observableThrowError('');
  }
}
