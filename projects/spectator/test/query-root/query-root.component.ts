import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';

@Component({
  selector: 'app-query-root',
  standalone: true,
  imports: [OverlayModule],
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

    <div id="number-content-root">
      <span id="number-content-with-eight"> to prevent #number-content-root having textContent: 8 </span>
      <span id="number-content-only-eight">8</span>
    </div>

    <div id="aria-checkboxes">
      <section>
        <button role="checkbox" aria-checked="true">Sugar</button>
        <button role="checkbox" aria-checked="false">Gummy bears</button>
        <button role="checkbox" aria-checked="false">Whipped cream</button>
      </section>
    </div>
  `,
})
export class QueryRootComponent {
  public constructor(private overlay: Overlay) {}

  public openOverlay(): void {
    const componentPortal = new ComponentPortal(QueryRootOverlayComponent);
    const overlayRef = this.overlay.create();
    overlayRef.attach(componentPortal);
  }
}

@Component({
  selector: 'app-query-root-overlay',
  standalone: true,
  template: ` <p>{{ title }}</p> `,
})
export class QueryRootOverlayComponent {
  public title = 'Query Root Overlay';
}
