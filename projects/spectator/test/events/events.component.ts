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
}
