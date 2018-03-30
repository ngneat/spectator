import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button class="{{className}}" (click)="onClick($event)">{{title}}</button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() className = 'success';
  @Input() title = '';
  @Output() click = new EventEmitter();

  onClick( $event ) {
    this.click.emit($event);
  }
}