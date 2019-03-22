import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoreService} from "../../shared/_services";
import {Observable, of} from "rxjs";
import { PaginationParams } from 'src/app/shared/_helpers/paginationParams';
import { mergeMap } from 'rxjs/operators';

const apiUrl = `/api/veiculos`;

@Injectable({
    providedIn: 'root'
})
export class VehicleService extends CoreService {
  
    constructor(private http: HttpClient) {
        super(http);
    }

    getVehicle(params: PaginationParams): Observable<any> {
        return this.get(`${apiUrl}`, {params: {...params}})
    }

    getVehicles(term: string): Observable<any> {
      const params = new PaginationParams(0, 5, "Name ASC").setFilter(term)

      return term ? this.get(`${apiUrl}`, {params: {...params}})
              .pipe(mergeMap((response) => (response ? of(response.items):of([])))) : of([])
    }
}
