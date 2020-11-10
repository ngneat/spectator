import { Component } from '@angular/core';

@Component({
  selector: 'app-dom-selectors',
  template: `
    <p id="by-text-p">By text</p>
    <p id="by-text-p-2">By text</p>

    <label for="by-label-input">By label</label>
    <input type="text" id="by-label-input" />

    <input type="text" placeholder="By placeholder" id="by-placeholder-input" />

    <img src="" alt="By alt text" id="by-alt-text-img" />

    <a href="" title="By title" id="by-title-a"></a>

    <input type="text" value="By value" id="by-value-input" />

    <div id="text-content-root">
      <span> some </span>
      <span>
        <span id="text-content-span-1"><span>deeply</span><span>&ngsp;</span><span>&ngsp;</span>NESTED</span>
        <span id="text-content-span-2"> TEXT </span>
      </span>
    </div>

    <div id="aria-checkboxes">
      <section>
        <button role="checkbox" aria-checked="true">Sugar</button>
        <button role="checkbox" aria-checked="false">Gummy bears</button>
        <button role="checkbox" aria-checked="false">Whipped cream</button>
      </section>
    </div>
  `
})
export class DomSelectorsComponent {}
