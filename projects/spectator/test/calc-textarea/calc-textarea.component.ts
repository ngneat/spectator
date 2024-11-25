import { Component } from '@angular/core';

@Component({
  selector: 'app-calc',
  template: `
    <textarea #a class="a"></textarea>
    <textarea #b class="b"></textarea>
    <p class="result">{{ a.value + b.value }}</p>
  `,
  standalone: false,
})
export class CalcTextAreaComponent {}
