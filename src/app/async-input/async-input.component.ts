import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-async-input',
  template: `
    <div *ngIf="show">Hello</div>
  `
})
export class AsyncInputComponent implements OnInit {
  show;

  @Input()
  set widgets(v) {
    Promise.resolve().then(() => {
      this.show = true;
    });
  }

  constructor() {}

  ngOnInit() {}
}
