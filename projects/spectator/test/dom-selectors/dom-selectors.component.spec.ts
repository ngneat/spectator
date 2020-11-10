import {
  byAltText,
  byLabel,
  byPlaceholder,
  byText,
  byTextContent,
  byTitle,
  byValue,
  byRole,
  createComponentFactory,
  Spectator
} from '@ngneat/spectator';

import { DomSelectorsComponent } from './dom-selectors.component';

describe('DomSelectorsComponent', () => {
  let spectator: Spectator<DomSelectorsComponent>;
  const createComponent = createComponentFactory(DomSelectorsComponent);

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

  describe('byTextContent', () => {
    describe('with string matcher', () => {
      [
        { description: 'by default', opts: {} },
        { description: 'with `exact: true`', opts: { exact: true } }
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
          byTextContent('deeply NESTED', { selector: '#text-content-span-1', exact: true, collapseWhitespace: false })
        );
        expect(element).toBeNull();
        element = spectator.query(
          byTextContent('deeply  NESTED', { selector: '#text-content-span-1', exact: true, collapseWhitespace: false })
        );
        expect(element).toHaveId('text-content-span-1');
      });

      it('should support custom normalizer', () => {
        const toLowerCase = (text: string) => text.toLowerCase();
        let element = spectator.query(
          byTextContent('deeply  NESTED', { selector: '#text-content-span-1', exact: true, normalizer: toLowerCase })
        );
        expect(element).toBeNull();
        element = spectator.query(
          byTextContent('deeply  nested', { selector: '#text-content-span-1', exact: true, normalizer: toLowerCase })
        );
        expect(element).toHaveId('text-content-span-1');
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
          byTextContent(/^deeply\s\sNESTED$/, { selector: '#text-content-span-1', collapseWhitespace: false })
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
      it('should call matcher for all elements matching the selector', () => {
        const matcher = jasmine.createSpy('matcher').and.returnValue(false);
        const element = spectator.query(byTextContent(matcher, { selector: '#text-content-root [id^="text-content-span"]' }));
        expect(element).toBeNull();
        expect(matcher).toHaveBeenCalledTimes(2);
        expect(matcher.calls.argsFor(0)).toEqual(['deeply NESTED', spectator.query('#text-content-span-1')]);
        expect(matcher.calls.argsFor(1)).toEqual(['TEXT', spectator.query('#text-content-span-2')]);
      });

      it('should match and element for which matcher returns `true`', () => {
        const matcher = (text: string) => text === 'TEXT';
        const element = spectator.query(byTextContent(matcher, { selector: '#text-content-root [id^="text-content-span"]' }));
        expect(element).toHaveId('text-content-span-2');
      });

      it('should support `trim` option', () => {
        const matcher = jasmine.createSpy('matcher').and.returnValue(true);
        spectator.query(byTextContent(matcher, { selector: '#text-content-span-2', trim: false }));
        expect(matcher).toHaveBeenCalledWith(' TEXT ', spectator.query('#text-content-span-2'));
      });

      it('should support `collapseWhitespace` option', () => {
        const matcher = jasmine.createSpy('matcher').and.returnValue(true);
        spectator.query(byTextContent(matcher, { selector: '#text-content-span-1', collapseWhitespace: false }));
        expect(matcher).toHaveBeenCalledWith('deeply  NESTED', spectator.query('#text-content-span-1'));
      });

      it('should support custom normalizer', () => {
        const matcher = jasmine.createSpy('matcher').and.returnValue(true);
        const toLowerCase = (text: string) => text.toLowerCase();
        spectator.query(byTextContent(matcher, { selector: '#text-content-span-1', normalizer: toLowerCase }));
        expect(matcher).toHaveBeenCalledWith('deeply  nested', spectator.query('#text-content-span-1'));
      });
    });
  });

  describe('byRole', () => {
    it('should allow querying by generic role (link)', () => {
      const element = spectator.query(byRole('link'));
      expect(element).toHaveId('by-title-a');
    });

    it('should allow querying by generic role (textbox)', () => {
      const element = spectator.query(byRole('textbox'));
      expect(element).toHaveId('by-label-input');
    });

    it('should allow querying by generic role with byRole matcher options ', () => {
      const element = spectator.query(byRole('checkbox', { checked: true }));
      expect(element).toHaveExactText('Sugar');
    });
  });
});
