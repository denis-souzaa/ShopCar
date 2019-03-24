import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoreService} from "../../shared/_services";
import {Observable, of} from "rxjs";
import { PaginationParams } from 'src/app/shared/_helpers/paginationParams';

const apiUrl = `/api/propostas`;

@Injectable({
    providedIn: 'root'
})
export class ProposalService extends CoreService {
  
    constructor(private http: HttpClient) {
        super(http);
    }

    getProposal(params: PaginationParams): Observable<any> {
        return this.get(`${apiUrl}`, {params: {...params}})
    }

    addProposal(proposal: any): Observable<any> {
        return this.post(`${apiUrl}`,proposal)
    }

    removeProposal(id: number){
      return this.delete(`${apiUrl}`,id)
    }
}
