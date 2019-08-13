import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { WidgetService } from './widget.service';

export abstract class AbstractQueryService {
  public abstract select(): Observable<boolean>;
}

@Injectable()
export class QueryService extends AbstractQueryService {
  constructor(private readonly service: WidgetService) {
    super();
  }

  public selectName(): Observable<string> {
    return of('Netanel');
  }

  public select(): Observable<boolean> {
    return of(false);
  }
}
