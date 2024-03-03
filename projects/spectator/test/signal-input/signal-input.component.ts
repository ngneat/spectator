import { Component, input, ɵINPUT_SIGNAL_BRAND_WRITE_TYPE } from '@angular/core';

@Component({
  selector: 'app-signal-input',
  template: `
    @if (show()) {
      <div id="text">Hello</div>
    }
  `,
  standalone: true,
})
export class SignalInputComponent {
  public show = input(false);
}
