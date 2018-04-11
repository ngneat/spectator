import { Injectable } from "@angular/core";
import { WidgetDataService } from "./widget-data.service";

@Injectable()
export class WidgetService {
  constructor(private dataService: WidgetDataService) {}

  get() {
    return this.dataService.get();
  }
}
