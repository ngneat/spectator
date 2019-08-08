import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  event = '';

  onFocus() {
    this.event = 'focus';
  }

  onBlur() {
    this.event = 'blur';
  }

  onPressA() {
    this.event = 'pressed a';
  }
}
