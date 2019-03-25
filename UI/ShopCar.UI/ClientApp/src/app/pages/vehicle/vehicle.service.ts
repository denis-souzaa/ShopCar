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

      return term ? this.get(`${apiUrl}/${term}/busca`)
              .pipe(mergeMap((response) => (response ? of(response):of([])))) : of([])
    }

    addVehicle(vehicle: any): Observable<any> {
      return this.post(`${apiUrl}`,vehicle)
    }

    editVehicle(vehicle: any): Observable<any> {
      return this.put(`${apiUrl}`,vehicle)
    }

    removeVehicle(id: number): Observable<any> {
      return this.delete(`${apiUrl}`, id)
    }

    soldVehicle(id: number): Observable<any> {
      return this.patch(`${apiUrl}`, id);
    }
}
