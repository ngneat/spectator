import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-overlay-content',
  template: ` <p>Overlay Content</p> `,
})
export class OverlayContentComponent {
  @Output() customEvent = new EventEmitter<string>();
}
