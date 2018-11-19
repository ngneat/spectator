import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-button',
  template: `
    <button class="{{className}}" (click)="onClick($event)">{{title}}</button>
    <p>{{queryService.selectName() | async}}</p>
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

  constructor(public queryService: QueryService) {}

  onClick($event) {
    this.click.emit($event);
  }
}
