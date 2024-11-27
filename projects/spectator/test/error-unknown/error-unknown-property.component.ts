import { Component, Input } from '@angular/core';

/* eslint-disable @angular-eslint/template/no-call-expression */

@Component({
  selector: 'app-use-unknown-property',
  template: `<span [some-property]="true"></span>`,
  standalone: false,
})
export class ErrorUnknownPropertyComponent {}
