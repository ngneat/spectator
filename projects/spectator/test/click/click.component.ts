import { Component } from '@angular/core';
import { debounce } from 'helpful-decorators';

@Component({
  selector: 'app-click',
  template: `
    <button (click)="onClick()">Change</button>
    <p>{{ name }}</p>
  `,
  styles: [],
})
export class ClickComponent {
  public name = 'init';

  @debounce(100) public onClick(): void {
    this.name = 'changed';
  }
}
