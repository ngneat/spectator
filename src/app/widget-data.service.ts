import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetDataService {
  constructor(private http: HttpClient) {}

  get() {}
}
