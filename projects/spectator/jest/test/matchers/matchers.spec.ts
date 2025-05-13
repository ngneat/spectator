import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { byRole } from '@ngneat/spectator';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

interface Dummy {
  lorem: string;
  ipsum: string;
}

@Component({
  template: `
    <div id="display-none" style="display:none">Hidden with display none</div>
    <div id="visibility-hidden" style="visibility:hidden">Hidden with visibility hidden</div>
    <label>Hidden input element<input type="hidden" /></label>
    <div hidden>Hidden by "hidden"-attribute</div>
    <div style="display:none"><div id="parent-display-none">Hidden by parent with display none</div></div>
    <div style="visibility:hidden"><div id="parent-visibility-hidden">Hidden by parent with display none</div></div>
    <div id="visible">Visible</div>
    <div id="classes" class="class-a class-b">Classes</div>
    <div id="styles" style="background-color: indianred; color: chocolate; --primary: var(--black)"></div>
    <custom-element style="visibility: hidden"></custom-element>
    <div id="computed-style"></div>

    <div role="article" aria-label="toExist"></div>
    <div role="article" aria-label="toHaveLength"></div>
    <div role="article" aria-label="toHaveLength"></div>
    <div role="article" aria-label="toHaveId" id="my-id"></div>
    <div role="article" aria-label="toHaveClass" class="my-class"></div>
    <div role="article" aria-label="toHaveAttribute" data-id="my-data-id"></div>
    <input type="checkbox" role="article" aria-label="toHaveProperty" checked />
    <div role="article" aria-label="toHaveText">hello goodbye</div>
    <div role="article" aria-label="toHaveExactText">hello goodbye</div>
    <div role="article" aria-label="toHaveExactTrimmedText">hello goodbye</div>
    <div role="article" aria-label="toContainText">hello goodbye</div>
    <input type="checkbox" role="article" aria-label="toHaveValue" value="value" />
    <input type="checkbox" role="article" aria-label="toContainValue" value="value" />
    <div role="article" aria-label="toHaveStyle" style="background-color: indianred;"></div>
    <div role="article" aria-label="toHaveData" data-the-data="my-data"></div>
    <input type="checkbox" role="article" aria-label="toBeChecked" checked />
    <input type="checkbox" role="article" aria-label="toBeIndeterminate" [indeterminate]="true" />
    <input type="checkbox" role="article" aria-label="toBeDisabled" disabled />
    <input type="text" role="article" aria-label="toBeEmpty" value="" />
    <div role="article" aria-label="toBeHidden" style="display: none;"></div>
    <select>
      <option value="1" role="article" aria-label="toBeSelected" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <div role="article" aria-label="toBeVisible"></div>
    <div role="article" aria-label="toBeMatchedBy"></div>
    <div role="article" aria-label="toHaveDescendant">
      <div class="descendant"></div>
    </div>
    <div role="article" aria-label="toHaveDescendantWithText">
      <div class="descendant">with text</div>
    </div>
    <select multiple role="article" aria-label="toHaveSelectedOptions">
      <option value="1" selected>1</option>
      <option value="2" selected>2</option>
      <option value="3">3</option>
    </select>
    <input type="text" role="article" aria-label="toBeFocused" />
  `,
  standalone: false,
})
export class MatchersComponent {}

describe('Matchers', () => {
  const createComponent = createComponentFactory({
    component: MatchersComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });
  let spectator: Spectator<MatchersComponent>;

  beforeEach(() => {
    if (!window.customElements.get('custom-element')) {
      window.customElements.define(
        'custom-element',
        class extends HTMLElement {
          connectedCallback() {
            if (this.isConnected && !this.shadowRoot) {
              const el = document.createElement('div');
              el.id = 'shadow-dom';
              this.attachShadow({ mode: 'open' }).appendChild(el);
            }
          }
        },
      );
    }
    spectator = createComponent();
  });

  describe('toBeVisible', () => {
    it('should detect visible element as being visible', () => {
      expect('#visible').toBeVisible();
    });

    it('should detect element hidden by "display:none"-style, as NOT being visible', () => {
      expect('#display-none').not.toBeVisible();
    });

    it('should detect element hidden by "visibility:hidden"-style, as NOT being visible', () => {
      expect('#visibility-hidden').not.toBeVisible();
    });

    it('should detect input (of type hidden), as NOT being visible', () => {
      expect('input[type="hidden"]').not.toBeVisible();
    });

    it('should detect element with hidden-attribute, as NOT being visible', () => {
      expect('[hidden]').not.toBeVisible();
    });

    it('should detect element hidden by parent with "display:none"-style, as NOT being visible', () => {
      expect('#parent-display-none').not.toBeVisible();
    });

    it('should detect element hidden parent with by "visibility:hidden"-style, as NOT being visible', () => {
      expect('#parent-visibility-hidden').not.toBeVisible();
    });
  });

  describe('toBeHidden', () => {
    it('should detect visible element as NOT to be hidden', () => {
      expect('#visible').not.toBeHidden();
    });

    it('should detect element hidden by "display:none"-style, as to be hidden', () => {
      expect('#display-none').toBeHidden();
    });

    it('should detect element hidden by "visibility:hidden"-style, as to be hidden', () => {
      expect('#visibility-hidden').toBeHidden();
    });

    it('should detect input (of type hidden), as to be hidden', () => {
      expect('input[type="hidden"]').toBeHidden();
    });

    it('should detect element with hidden-attribute, as to be hidden', () => {
      expect('[hidden]').toBeHidden();
    });

    it('should detect element hidden by parent with "display:none"-style, as to be hidden', () => {
      expect('#parent-display-none').toBeHidden();
    });

    it('should detect element hidden parent with by "visibility:hidden"-style, as being hidden', () => {
      expect('#parent-visibility-hidden').toBeHidden();
    });

    it('should be possible to validate an element that has classes in strict order', () => {
      expect('#classes').toHaveClass(['class-a', 'class-b']);
      expect('#classes').toHaveClass(['class-a', 'class-b'], { strict: true });
      expect('#classes').not.toHaveClass(['class-b', 'class-a']);
      expect('#classes').not.toHaveClass(['class-b', 'class-a'], { strict: true });
    });

    it('should be possible to validate an element that has classes in any order', () => {
      expect('#classes').toHaveClass(['class-a', 'class-b'], { strict: false });
      expect('#classes').toHaveClass(['class-b', 'class-a'], { strict: false });
    });

    it('should detect elements with hidden parents through shadow DOMs', () => {
      expect(document.querySelector('custom-element')?.shadowRoot?.querySelector('#shadow-dom')).toBeHidden();
    });

    it('should detect elements whose computed styles are display: none', () => {
      window.getComputedStyle = () => ({ getPropertyValue: (style) => style == 'display' && 'none' }) as CSSStyleDeclaration;
      expect(document.querySelector('#computed-style')).toBeHidden();
      window.getComputedStyle = () => ({ getPropertyValue: (style) => style == 'display' && 'block' }) as CSSStyleDeclaration;
      expect(document.querySelector('#computed-style')).toBeVisible();
    });

    it('should detect elements whose computed styles are visibility: hidden', () => {
      window.getComputedStyle = () => ({ getPropertyValue: (style) => style == 'visibility' && 'hidden' }) as CSSStyleDeclaration;
      expect(document.querySelector('#computed-style')).toBeHidden();
      window.getComputedStyle = () => ({ getPropertyValue: (style) => style == 'visibility' && 'visible' }) as CSSStyleDeclaration;
      expect(document.querySelector('#computed-style')).toBeVisible();
    });
  });

  describe('toBePartial', () => {
    it('should return true when expected is partial of actual', () => {
      const actual: Dummy = { lorem: 'first', ipsum: 'second' };
      expect(actual).toBePartial({ lorem: 'first' });
    });

    it('should return true when expected is same as actual', () => {
      const actual: Dummy = { lorem: 'first', ipsum: 'second' };
      expect(actual).toBePartial({ ...actual });
    });

    it('should return false when expected is not partial of actual', () => {
      const actual: Dummy = { lorem: 'first', ipsum: 'second' };
      expect(actual).not.toBePartial({ lorem: 'second' });
    });
  });

  describe('toHaveStyle', () => {
    it('should return true when expected style exists on element', () => {
      const element = spectator.query('#styles');
      expect(element).toHaveStyle({ 'background-color': 'indianred' });
    });

    it('should return true if all styles exist on element', () => {
      const element = spectator.query('#styles');
      expect(element).toHaveStyle({ 'background-color': 'indianred', color: 'chocolate' });
    });

    it('should return true if the CSS variable exist on element', () => {
      const element = spectator.query('#styles');
      expect(element).toHaveStyle({ '--primary': 'var(--black)' });
    });

    it('should return false if style exists on an element but has a different value than expected', () => {
      const element = spectator.query('#styles');
      expect(element).not.toHaveStyle({ color: 'blue' });
    });

    it('should return false when expected style does not exist on element', () => {
      const element = spectator.query('#styles');
      expect(element).not.toHaveStyle({ height: '100px' });
    });
  });

  describe('resolveDOMSelector', () => {
    describe.each([
      { matcher: 'toExist', args: [] },
      { matcher: 'toHaveLength', args: [2] },
      { matcher: 'toHaveId', args: ['my-id'] },
      { matcher: 'toHaveClass', args: ['my-class'] },
      { matcher: 'toHaveAttribute', args: ['data-id', 'my-data-id'] },
      { matcher: 'toHaveProperty', args: ['checked', true] },
      { matcher: 'toHaveText', args: ['hello'] },
      { matcher: 'toHaveExactText', args: [' hello goodbye'] },
      { matcher: 'toHaveExactTrimmedText', args: ['hello goodbye'] },
      { matcher: 'toContainText', args: ['hello'] },
      { matcher: 'toHaveValue', args: ['value'] },
      { matcher: 'toContainValue', args: ['value'] },
      { matcher: 'toHaveStyle', args: [{ backgroundColor: 'indianred' }] },
      { matcher: 'toHaveData', args: [{ data: 'the-data', val: 'my-data' }] },
      { matcher: 'toBeChecked', args: [] },
      { matcher: 'toBeIndeterminate', args: [] },
      { matcher: 'toBeDisabled', args: [] },
      { matcher: 'toBeEmpty', args: [] },
      { matcher: 'toBeHidden', args: [] },
      { matcher: 'toBeSelected', args: [] },
      { matcher: 'toBeVisible', args: [] },
      { matcher: 'toBeMatchedBy', args: ['[aria-label="toBeMatchedBy"]'] },
      { matcher: 'toHaveDescendant', args: ['.descendant'] },
      { matcher: 'toHaveDescendantWithText', args: [{ selector: '.descendant', text: 'with text' }] },
      { matcher: 'toHaveSelectedOptions', args: [['1', '2']] },
      { matcher: 'toBeFocused', args: [], setup: (selector) => spectator.focus(selector) },
    ])('$matcher', ({ matcher, args, setup }) => {
      it('should allow string selectors, HTMLElements, and DOMSelectors', () => {
        setup?.(`[aria-label="${matcher}"]`);
        expect(`[aria-label="${matcher}"]`)[matcher](...args);
        expect(spectator.queryAll(`[aria-label="${matcher}"]`))[matcher](...args);
        expect(byRole('article', { name: matcher }))[matcher](...args);
      });
    });
  });
});
