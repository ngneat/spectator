import { Component, OnInit } from '@angular/core';
import { debounce } from 'helpful-decorators';

@Component({
  selector: 'app-click',
  template: `
    <button (click)="onClick()">Change</button>
    <p>{{name}}</p>
  `,
  styles: []
})
export class ClickComponent implements OnInit {
  name = 'init';

  constructor() {}

  ngOnInit() {}

  @debounce(100)
  onClick() {
    this.name = 'changed';
  }
}
