import { Component, Injectable, inject } from '@angular/core';

@Injectable()
export class SomeService {}

@Component({
  selector: `app-standalone-child`,
  template: `<div id="child-standalone">This stands alone child!</div>`,
  standalone: true,
})
export class StandaloneChildComponent {
  bla = inject(SomeService);
}

@Component({
  selector: `app-standalone-child`,
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
