import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fg',
  template: `
    <form [formGroup]="group">
      <input formControlName="name">
    </form>
  `,
  styles: []
})
export class FgComponent implements OnInit {
  @Input()
  group: FormGroup;

  constructor() {}

  ngOnInit() {}
}
