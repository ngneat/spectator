import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-custom-event',
  template: `
    <p>Custom child</p>
  `
})
export class ChildCustomEventComponent {
  @Output() customEvent = new EventEmitter<string>();
}
