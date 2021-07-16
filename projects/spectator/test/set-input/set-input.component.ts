import { Component, Input } from '@angular/core';

/* eslint-disable @angular-eslint/template/no-call-expression */

@Component({
  selector: 'app-set-input',
  template: ``,
})
export class SetInputComponent {
  public another;

  @Input() public one;
  @Input() public set two(value: any) {
    this.another = value;
  }
}
