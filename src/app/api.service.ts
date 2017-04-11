import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { apiKey } from './api-key';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getDataFromApi() {
    return this.http.get(`http://api.population.io:80/1.0/population/1980/aged/18/`).map((res:Response) => res.json());
  }

}
