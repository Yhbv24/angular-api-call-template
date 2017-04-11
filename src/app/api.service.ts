import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { apiKey } from './api-key';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getDataFromApi() {
    return this.http.get(`http://api.eia.gov/category/?api_key=` + apiKey + `&category_id=711224`).map((res:Response) => res.json());
  }

}
