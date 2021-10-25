import { toBeVisible, toBePartial } from '@ngneat/spectator';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { Component } from '@angular/core';

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
    <div id="styles" style="background-color: indianred; color: chocolate;"></div>
  `,
})
export class MatchersComponent {}

describe('Matchers', () => {
  const createComponent = createComponentFactory({ component: MatchersComponent });
  let spectator: Spectator<MatchersComponent>;

  beforeEach(() => {
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

    it('should return false if style exists on an element but has a different value than expected', () => {
      const element = spectator.query('#styles');
      expect(element).not.toHaveStyle({ color: 'blue' });
    });

    it('should return false when expected style does not exist on element', () => {
      const element = spectator.query('#styles');
      expect(element).not.toHaveStyle({ height: '100px' });
    });
  });
});
