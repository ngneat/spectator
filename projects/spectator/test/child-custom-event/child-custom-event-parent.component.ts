import { Component } from '@angular/core';

@Component({
  selector: 'app-child-custom-event-parent',
  template: `
    <app-child-custom-event (customEvent)="onCustomEvent($event)"></app-child-custom-event>
    <p>{{ eventValue }}</p>
  `,
})
export class ChildCustomEventParentComponent {
  public eventValue = '';

  public onCustomEvent(eventValue: string): void {
    this.eventValue = eventValue;
  }
}
