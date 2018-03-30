import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TodosDataService {
  constructor( private http: HttpClient ) {

  }

  get() {
    return this.http.get('url');
  }

  post(id: number) {
    return this.http.post('url', {id});
  }
}
