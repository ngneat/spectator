import { Component } from '@angular/core';

@Component({
  selector: 'app-calc',
  template: `
    <label>
      <input type="text" #a class="a" />
      <span>a</span>
    </label>
    <label>
      <input type="text" #b class="b" />
      <span>b</span>
    </label>
    <p class="result">{{ a.value + b.value }}</p>
  `,
})
export class CalcComponent {}
