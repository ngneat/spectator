import { Component, input, output, ɵINPUT_SIGNAL_BRAND_WRITE_TYPE } from '@angular/core';

@Component({
  selector: 'app-function-output',
  template: ` <button (click)="buttonClick.emit(true)">Emit function output</button> `,
  standalone: true,
})
export class FunctionOutputComponent {
  public buttonClick = output<boolean>();
}
