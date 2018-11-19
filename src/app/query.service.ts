import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { WidgetService } from './widget.service';

@Injectable()
export class QueryService {
  constructor(private service: WidgetService) {}

  selectName() {
    return of('Netanel');
  }

  select() {
    return of(false);
  }
}
