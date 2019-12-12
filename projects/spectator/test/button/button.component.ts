import { Component, EventEmitter, Input, Output } from '@angular/core';

import { QueryService } from '../query.service';

// tslint:disable:template-no-call-expression

@Component({
  selector: 'app-button',
  template: `
    <button class="{{ className }}" (click)="onClick($event)">{{ title }}</button>
    <p>{{ queryService.selectName() | async }}</p>
    <div class="contextmenu" (contextmenu)="contextmenu()">Context menu</div>
    <div class="dblclick" (dblclick)="dblclick()">dblclick</div>
  `,
  providers: [QueryService],
  styles: []
})
export class ButtonComponent {
  @Input() public className = 'success';
  @Input() public title = '';

  // tslint:disable-next-line:no-output-native
  @Output() public readonly click = new EventEmitter<any>();

  constructor(public queryService: QueryService) {}

  public onClick($event: any): void {
    this.click.emit($event);
  }

  public contextmenu() {}

  public dblclick() {}
}
