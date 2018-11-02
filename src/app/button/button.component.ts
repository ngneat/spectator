import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-button',
  template: `
    <button class="{{className}}" (click)="onClick($event)">{{title}}</button>
  `,
  providers: [QueryService],
  styles: []
})
export class ButtonComponent {
  @Input()
  className = 'success';
  @Input()
  title = '';
  @Output()
  click = new EventEmitter();

  constructor(private queryService: QueryService) {}

  onClick($event) {
    this.click.emit($event);
  }
}
