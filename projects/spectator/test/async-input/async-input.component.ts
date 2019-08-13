import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-async-input',
  template: `
    <div *ngIf="show">Hello</div>
  `
})
export class AsyncInputComponent {
  public show;

  @Input() public set widgets(v: any) {
    Promise.resolve().then(() => {
      this.show = true;
    });
  }
}
