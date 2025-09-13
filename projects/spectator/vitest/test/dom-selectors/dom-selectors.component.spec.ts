import {
  createComponentFactory,
  Spectator,
  byAltText,
  byLabel,
  byPlaceholder,
  byText,
  byTitle,
  byValue,
  byTextContent,
  byTestId,
} from '@ngneat/spectator/vitest';
import { configure, getConfig } from '@testing-library/dom';

import { DomSelectorsComponent, DomSelectorsNestedComponent } from '../../../test/dom-selectors/dom-selectors.component';

describe('DomSelectorsComponent', () => {
  let spectator: Spectator<DomSelectorsComponent>;
  const createComponent = createComponentFactory({
    component: DomSelectorsComponent,
    imports: [DomSelectorsNestedComponent],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should allow querying by text', () => {
    const element = spectator.query(byText('By text'));
    expect(element).toHaveId('by-text-p');
  });

  it('should allow querying by text and selector', () => {
    const element = spectator.query(byText('By text', { selector: '#by-text-p-2' }));
    expect(element).toHaveId('by-text-p-2');

    const elements = spectator.queryAll(byText('By text', { selector: '#by-text-p-2' }));
    expect(elements[0]).toHaveId('by-text-p-2');
    expect(elements).toHaveLength(1);
  });

  it('should allow querying by label', () => {
    const element = spectator.query(byLabel('By label'));
    expect(element).toHaveId('by-label-input');
  });

  it('should allow querying by placeholder', () => {
    const element = spectator.query(byPlaceholder('By placeholder'));
    expect(element).toHaveId('by-placeholder-input');
  });

  it('should allow querying by alt text', () => {
    const element = spectator.query(byAltText('By alt text'));
    expect(element).toHaveId('by-alt-text-img');
  });

  it('should allow querying by title', () => {
    const element = spectator.query(byTitle('By title'));
    expect(element).toHaveId('by-title-a');
  });

  it('should allow querying by value', () => {
    const element = spectator.query(byValue('By value'));
    expect(element).toHaveId('by-value-input');
  });

  describe('parentSelector', () => {
    it('should allow querying multiple element by parent selector', () => {
      let element = spectator.queryAll(DomSelectorsNestedComponent, { parentSelector: '#nested-components-2' });
      expect(element.length).toBe(2);
      element = spectator.queryAll(DomSelectorsNestedComponent, { parentSelector: '#nested-components-1' });
      expect(element.length).toBe(1);
    });
  });

  describe('byTextContent', () => {
    describe('with string matcher', () => {
      [
        { description: 'by default', opts: {} },
        { description: 'with `exact: true`', opts: { exact: true } },
      ].forEach(({ description, opts }) => {
        it(`should exactly match text content ${description}`, () => {
          let element = spectator.query(byTextContent('deeply nested', { selector: '#text-content-root', ...opts }));
          expect(element).toBeNull();
          element = spectator.query(byTextContent('some deeply nested text', { selector: '#text-content-root', ...opts }));
          expect(element).toBeNull();
          element = spectator.query(byTextContent('some deeply NESTED TEXT', { selector: '#text-content-root', ...opts }));
          expect(element).toHaveId('text-content-root');
        });
      });

      it('should partially match text with `exact: false`', () => {
        const element = spectator.query(byTextContent('deeply nested', { selector: '#text-content-root', exact: false }));
        expect(element).toHaveId('text-content-root');
      });

      it('should support `trim` option', () => {
        let element = spectator.query(byTextContent('TEXT', { selector: '#text-content-span-2', exact: true, trim: false }));
        expect(element).toBeNull();
        element = spectator.query(byTextContent(' TEXT ', { selector: '#text-content-span-2', exact: true, trim: false }));
        expect(element).toHaveId('text-content-span-2');
      });

      it('should support `collapseWhitespace` option', () => {
        let element = spectator.query(
          byTextContent('deeply NESTED', { selector: '#text-content-span-1', exact: true, collapseWhitespace: false }),
        );
        expect(element).toBeNull();
        element = spectator.query(
          byTextContent('deeply  NESTED', { selector: '#text-content-span-1', exact: true, collapseWhitespace: false }),
        );
        expect(element).toHaveId('text-content-span-1');
      });

      it('should support custom normalizer', () => {
        const toLowerCase = (text: string) => text.toLowerCase();
        let element = spectator.query(
          byTextContent('deeply  NESTED', { selector: '#text-content-span-1', exact: true, normalizer: toLowerCase }),
        );
        expect(element).toBeNull();
        element = spectator.query(
          byTextContent('deeply  nested', { selector: '#text-content-span-1', exact: true, normalizer: toLowerCase }),
        );
        expect(element).toHaveId('text-content-span-1');
      });
    });

    describe('with number matcher', () => {
      it('should match number content', () => {
        let element = spectator.query(byTextContent(8, { selector: '#number-content-root *' }));
        expect(element).toHaveId('number-content-only-eight');
      });

      it('should partially match number with `exact: false`', () => {
        let elements = spectator.queryAll(byTextContent(8, { selector: '#number-content-root *', exact: false }));
        expect(elements).toHaveLength(2);
        expect(elements[0]).toHaveId('number-content-with-eight');
        expect(elements[1]).toHaveId('number-content-only-eight');
      });
    });

    describe('with RegExp matcher', () => {
      it('should match the text', () => {
        const element = spectator.query(byTextContent(/^some deeply NESTED TEXT$/, { selector: '#text-content-root' }));
        expect(element).toHaveId('text-content-root');
      });

      it('should support `trim` option', () => {
        const element = spectator.query(byTextContent(/^ TEXT $/, { selector: '#text-content-span-2', trim: false }));
        expect(element).toHaveId('text-content-span-2');
      });

      it('should support `collapseWhitespace` option', () => {
        const element = spectator.query(
          byTextContent(/^deeply\s\sNESTED$/, { selector: '#text-content-span-1', collapseWhitespace: false }),
        );
        expect(element).toHaveId('text-content-span-1');
      });

      it('should support custom normalizer', () => {
        const toLowerCase = (text: string) => text.toLowerCase();
        const element = spectator.query(byTextContent(/deeply\s\snested/, { selector: '#text-content-span-1', normalizer: toLowerCase }));
        expect(element).toHaveId('text-content-span-1');
      });
    });

    describe('with function matcher', () => {
      it('should match and element for which matcher returns `true`', () => {
        const matcher = (text: string) => text === 'TEXT';
        const element = spectator.query(byTextContent(matcher, { selector: '#text-content-root [id^="text-content-span"]' }));
        expect(element).toHaveId('text-content-span-2');
      });
    });
  });

  describe('byTestId', () => {
    const { testIdAttribute } = getConfig();
    beforeEach(() => configure({ testIdAttribute }));
    afterEach(() => configure({ testIdAttribute }));

    it('should allow querying with byTestId (default: data-testid)', () => {
      const element = spectator.query(byTestId('by-testid-default'));
      expect(element).toHaveAttribute('data-testid', 'by-testid-default');
    });

    it('should allow querying with byTestId and custom testIdAttribute', () => {
      // configure byTestId to use the custom attribute
      configure({ testIdAttribute: 'data-testid-custom' });

      const element = spectator.query(byTestId('by-testid-custom'));
      expect(element).toHaveAttribute('data-testid-custom', 'by-testid-custom');
    });
  });
});
