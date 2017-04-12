import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getDataFromApi() {
    return this.http.get(`_INSERT_URL_HERE_`).map((res:Response) => res.json());
  }

}
