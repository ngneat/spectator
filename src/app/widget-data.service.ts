import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class WidgetDataService {
  constructor(private http: HttpClient) {}

  get() {}
}
