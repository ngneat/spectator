import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { QueryService } from "../query.service";

@Component({
  selector: "app-async",
  template: `
    <p *ngIf="show$ | async">
      async works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class AsyncComponent implements OnInit {
  show$;
  constructor(public query: QueryService) {}

  ngOnInit() {
    this.show$ = this.query.select();
  }
}
