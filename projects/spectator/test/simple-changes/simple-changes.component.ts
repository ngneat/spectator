import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

/* eslint-disable @angular-eslint/template/no-call-expression */

@Component({
  selector: 'app-simple-changes',
  template: ``,
  standalone: false,
})
export class SimpleChangesComponent implements OnInit, OnChanges {
  @Input() public value;

  public hooks: string[] = [];
  public changes: SimpleChange[] = [];

  public ngOnInit(): void {
    this.hooks.push('ngOnInit');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.hooks.push('ngOnChanges');

    if ('value' in changes) {
      this.changes.push(changes.value);
    }
  }
}
