import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  public event = '';

  public onFocus(): void {
    this.event = 'focus';
  }

  public onBlur(): void {
    this.event = 'blur';
  }

  public onPressA(): void {
    this.event = 'pressed a';
  }

  public onPressCtrlA(): void {
    this.event = 'pressed ctrl.a';
  }

  public onPressCtrlShiftA(): void {
    this.event = 'pressed ctrl.shift.a';
  }

  public onPressDot(): void {
    this.event = 'pressed dot';
  }

  public onPressArrowLeft(event: KeyboardEvent): void {
    this.event = `pressed ${event.key}:${event.keyCode}`;
  }

  public onPressArrowRight(event: KeyboardEvent): void {
    this.event = `pressed ArrowRight:${event.keyCode}`;
  }
}
