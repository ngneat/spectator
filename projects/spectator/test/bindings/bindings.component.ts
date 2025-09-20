import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({ template: '' })
export class TestCompInput {
  @Input() value = 0;
}

@Component({ template: '<button (click)="event.emit()">Click me</button>' })
export class TestCompOutput {
  @Output() event = new EventEmitter<void>();
}

@Component({ template: 'Value: {{value}}' })
export class TestCompTwoWayBinding {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'my-host-comp',
  template: '...',
  host: { '[class.checked]': 'isChecked()' },
})
export class TestCompHost {
  isChecked = input(false);
}
