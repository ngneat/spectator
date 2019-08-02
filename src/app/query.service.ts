import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { WidgetService } from './widget.service';
import { Observable } from 'rxjs/internal/Observable';

export abstract class AbstractQueryService {
  abstract select(): Observable<boolean>;
}

@Injectable()
export class QueryService extends AbstractQueryService {
  constructor(private service: WidgetService) {
    super();
  }

  selectName() {
    return of('Netanel');
  }

  select() {
    return of(false);
  }
}
