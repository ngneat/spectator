import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { QueryService } from '../query.service';

@Component({
  selector: 'app-async',
  template: ` <p *ngIf="show$ | async">async works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class AsyncComponent implements OnInit {
  public show$;
  constructor(public query: QueryService) {}

  public ngOnInit(): void {
    this.show$ = this.query.select();
  }
}
