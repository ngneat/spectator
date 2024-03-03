import { Component } from '@angular/core';

@Component({
  selector: 'app-overlay-container',
  template: `
    <app-overlay-content (customEvent)="onCustomEvent($event)"></app-overlay-content>
    <p class="value">{{ eventValue }}</p>
  `,
})
export class OverlayContainerComponent {
  public eventValue = '';

  public onCustomEvent(eventValue: string): void {
    this.eventValue = eventValue;
  }
}
