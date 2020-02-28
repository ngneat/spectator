import { toBeVisible } from '@ngneat/spectator';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { Component } from '@angular/core';

@Component({
  template: `
    <div id="display-none" style="display:none">Hidden with display none</div>
    <div id="visibility-hidden" style="visibility:hidden">Hidden with visibility hidden</div>
    <label>Hidden input element<input type="hidden"/></label>
    <div hidden>Hidden by "hidden"-attribute</div>
    <div style="display:none"><div id="parent-display-none">Hidden by parent with display none</div></div>
    <div style="visibility:hidden"><div id="parent-visibility-hidden">Hidden by parent with display none</div></div>
    <div id="visible">Visible</div>
  `
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
  });
});
