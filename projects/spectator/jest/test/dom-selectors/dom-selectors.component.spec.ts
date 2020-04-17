import { createComponentFactory, Spectator, byAltText, byLabel, byPlaceholder, byText, byTitle, byValue } from '@ngneat/spectator/jest';

import { DomSelectorsComponent } from '../../../test/dom-selectors/dom-selectors.component';

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
});
