import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { MatcherEnhancementsComponent } from './matcher-enhancements.component';

describe('Matcher Enchancements Test', () => {
  let spectator: Spectator<MatcherEnhancementsComponent>;
  const createComponent = createComponentFactory({
    component: MatcherEnhancementsComponent
  });

  beforeEach(() => (spectator = createComponent()));

  it('should match mulitple elements with different text', () => {
    const el = spectator.query('.text-check');
    expect(el).toHaveText(['It should', 'different text']);
    expect(el).toContainText(['It should', 'different text']);
    expect(el).toHaveExactText(['It should have', 'Some different text']);
  });

  it('should match multiple inputs with different values', () => {
    const inputs = spectator.queryAll('input.sample');
    expect(inputs).toHaveValue(['test1', 'test2']);
    expect(inputs).toContainValue(['test1', 'test2']);
  });

  it('should match multiple classes on an element', () => {
    expect(spectator.query('#multi-class')).toHaveClass(['one-class', 'two-class']);
  });

  it('should match attributes with object syntax', () => {
    expect(spectator.query('#attr-check')).toHaveAttribute({ label: 'test label' });
  });

  it('should match properties with object syntax', () => {
    expect(spectator.query('.checkbox')).toHaveProperty({ checked: true });
  });

  it('should match partial properties with object syntax', () => {
    expect(spectator.query('img')).toContainProperty({ src: 'assets/myimg.jpg' });
  });
});
