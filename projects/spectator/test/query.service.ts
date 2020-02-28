import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { WidgetService } from './widget.service';

@Injectable()
export abstract class AbstractQueryService {
  public abstract select(): Observable<boolean>;
  public abstract selectName(): Observable<string>;

  constructor(private readonly service: WidgetService) {}
}

@Injectable()
export class QueryService extends AbstractQueryService {
  constructor(service: WidgetService) {
    super(service);
  }

  public selectName(): Observable<string> {
    return of('Netanel');
  }

  public select(): Observable<boolean> {
    return of(false);
  }
}
