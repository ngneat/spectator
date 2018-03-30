import { Component, Input } from '@angular/core';

@Component({
  selector: 'zippy',
  template: `
    <div class="zippy" id="zippy">
      <div (click)="toggle()" class="zippy__title">
        <span class="arrow">{{ visible ? 'Close' : 'Open' }}</span> {{title}}
      </div>
      <div *ngIf="visible" class="zippy__content">
        <ng-content></ng-content>
      </div>
      <input type="checkbox" checked="true" class="checkbox">
    </div>
  `
})
export class ZippyComponent {

  @Input() title;
  visible = false;
  updatedAsync = false;

  toggle() {
    this.visible = !this.visible;
  }

  update() {
    setTimeout(() => {
      this.updatedAsync = true;
    }, 5000);
  }

}
