import { Component } from '@angular/core';

@Component({
  selector: `app-standalone-child`,
  template: `<div id="child-standalone">This stands alone child!</div>`,
  standalone: true,
})
export class StandaloneChildComponent {}

@Component({
  selector: `app-standalone-child:not(.NG0912)`,
  template: `<div id="child-standalone">Mocked!</div>`,
  standalone: true,
})
export class MockStandaloneChildComponent {}

@Component({
  selector: `app-standalone-with-imports`,
  template: `<app-standalone-child />`,
  standalone: true,
  imports: [StandaloneChildComponent],
})
export class StandaloneWithImportsComponent {}
