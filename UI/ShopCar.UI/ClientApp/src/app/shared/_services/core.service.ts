import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable()
export class CoreService {

  private baseUrl: string = environment.baseUrl;

  constructor(private coreHttp: HttpClient) {
  }

  private resolveParams(params) {
    if (params)
      Object.keys(params)
      .forEach(
        key => (
          params[key] == undefined
          || params[key] === ''
          || params[key] === 'null'
          || params[key] === 'undefined')
          && delete params[key]);
  }

	protected post(apiUrl: string, instance: any, httpOptions?: any): Observable<any> {
		return this.coreHttp.post(this.baseUrl.concat(apiUrl), instance, httpOptions);
	}

	protected put(apiUrl: string, instance: any): Observable<any> {
		return this.coreHttp.put(this.baseUrl.concat(apiUrl), instance);
	}

	protected patch(apiUrl: string, instance: any): Observable<any> {
		return this.coreHttp.patch(this.baseUrl.concat(apiUrl), instance);
	}

	protected delete(apiUrl: string, instance: any): Observable<any> {
		return this.coreHttp.delete(this.baseUrl.concat(apiUrl).concat(`/${instance}`));
	}

	protected get(apiUrl: string, options?: any): Observable<any> {
		if (options) this.resolveParams(options.params);
		return this.coreHttp.get(this.baseUrl.concat(apiUrl), options);
	}
}
