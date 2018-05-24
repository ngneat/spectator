import { Injectable } from "@angular/core";
import { of } from "rxjs/observable/of";
import { WidgetService } from "./widget.service";

@Injectable()
export class QueryService {
  constructor(private service: WidgetService) {}

  select() {
    return of(false);
  }
}
