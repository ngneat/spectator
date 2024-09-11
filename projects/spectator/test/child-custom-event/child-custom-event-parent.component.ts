import { Component } from '@angular/core';

@Component({
  selector: 'app-child-custom-event-parent',
  template: `
    <app-child-custom-event
      (customEventUsingEventEmitter)="onCustomEventUsingEventEmitter($event)"
      (customEventUsingOutputEmitter)="onCustomEventUsingOutputEmitter($event)"
    />
    <p>{{ eventValue }}</p>
  `,
})
export class ChildCustomEventParentComponent {
  public eventValue = '';

  public onCustomEventUsingEventEmitter(eventValue: string): void {
    this.eventValue = eventValue;
  }

  public onCustomEventUsingOutputEmitter(eventValue: string): void {
    this.eventValue = eventValue;
  }
}
