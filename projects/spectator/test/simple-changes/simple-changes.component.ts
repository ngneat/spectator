import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

// tslint:disable:template-no-call-expression

@Component({
  selector: 'app-simple-changes',
  template: ``
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
