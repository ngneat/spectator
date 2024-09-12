import { Component, Output, output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-custom-event',
  template: ` <p>Custom child</p> `,
})
export class ChildCustomEventComponent {
  @Output() customEventUsingEventEmitter = new EventEmitter<string>();
  customEventUsingOutputEmitter = output<string>();
}
