import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dom-selectors',
  template: `
    <p id="by-text-p">By text</p>

    <label for="by-label-input">By label</label>
    <input type="text" id="by-label-input">

    <input type="text" placeholder="By placeholder" id="by-placeholder-input">

    <img src="" alt="By alt text" id="by-alt-text-img">

    <a href="" title="By title" id="by-title-a"></a>
    
    <input type="text" value="By value" id="by-value-input">
  `
})
export class DomSelectorsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
