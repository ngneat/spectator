import { Component, Input, OnInit } from '@angular/core';

/* eslint-disable @angular-eslint/template/no-call-expression */

@Component({
  selector: 'app-set-input',
  template: ``,
})
export class SetInputComponent implements OnInit {
  public another;
  public fromInit;

  @Input() public one;
  @Input() public set two(value: any) {
    this.another = value;
  }

  ngOnInit(): void {
    this.fromInit = 'initValue';
  }
}
