import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoreService} from "../../shared/_services";
import {Observable, of} from "rxjs";
import { PaginationParams } from 'src/app/shared/_helpers/paginationParams';

const apiUrl = `/api/marca`;

@Injectable({
    providedIn: 'root'
})
export class BrandService extends CoreService {
  
    constructor(private http: HttpClient) {
        super(http);
    }

    getBrand(): Observable<any> {
        return this.get(`${apiUrl}`)
    }
}
