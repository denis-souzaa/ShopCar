import {Injectable}       from '@angular/core';
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private constructor() {
  }

  static getItem(key: string): any {
    let value = localStorage.getItem(key);

    if (value === null || value === 'undefined' || value === '') {
      return undefined;
    }

    return JSON.parse(value);
  }

  static setItem(key: string, value: any): Observable<any> {
    return from(
      new Promise(async (resolve) => {
        value = JSON.stringify(value);
        await localStorage.setItem(key, value);
        resolve();
      }));
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
