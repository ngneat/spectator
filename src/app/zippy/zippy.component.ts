import { Component, HostListener, Input } from '@angular/core';
import { QueryService } from '../query.service';

@Component({
  selector: 'zippy',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  template: `
    <div class="zippy" id="zippy">
      <div (click)="toggle()" class="zippy__title" (keyup.enter)="toggle()" (keyup.esc)="toggle()">
        <span class="arrow">{{ visible ? 'Close' : 'Open' }}</span> {{title}}
      </div>
      <div *ngIf="visible" class="zippy__content">
        <ng-content></ng-content>
      </div>
      <input type="checkbox" checked="true" class="checkbox">
      <div class="color">{{options.color}}</div>
    </div>
  `
})
export class ZippyComponent {
  @Input()
  title;
  @Input()
  options = {
    color: 'red'
  };
  visible = false;
  updatedAsync = false;

  @HostListener('keyup.esc')
  onEsc() {
    this.toggle();
  }

  constructor(private queryService: QueryService) {}

  toggle() {
    this.visible = !this.visible;
  }

  update() {
    setTimeout(() => {
      this.updatedAsync = true;
    }, 5000);
  }
}
