import { Component, EventEmitter, input, Output, output, ɵINPUT_SIGNAL_BRAND_WRITE_TYPE } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-function-output',
  template: ` <button (click)="buttonClicked()">Emit function output</button> `,
  standalone: true,
})
export class FunctionOutputComponent {
  public buttonClick = output<boolean>();

  @Output()
  public buttonClickedEvent = new EventEmitter<boolean>();

  @Output()
  public buttonClickedSubject = new ReplaySubject<boolean>();

  protected buttonClicked(): void {
    this.buttonClick.emit(true);
    this.buttonClickedEvent.emit(true);
    this.buttonClickedSubject.next(true);
  }
}
