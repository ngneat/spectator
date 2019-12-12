import { Injectable } from '@angular/core';

import { WidgetDataService } from './widget-data.service';

@Injectable()
export class WidgetService {
  public testingProperty = 'hello';

  constructor(private readonly dataService: WidgetDataService) {}

  public get(): void {
    return this.dataService.get();
  }
}
