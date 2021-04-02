import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { MatcherEnhancementsComponent } from './matcher-enhancements.component';

describe('Matcher enhancements', () => {
  let spectator: Spectator<MatcherEnhancementsComponent>;
  const createComponent = createComponentFactory({
    component: MatcherEnhancementsComponent
  });

  beforeEach(() => spectator = createComponent());

  describe('Text', () => {
    it('should match mulitple elements with different text', () => {
      const el = spectator.query('.text-check');
      expect(el).toHaveText(['It should', 'different text']);
      expect(el).toContainText(['It should', 'different text']);
      expect(el).toHaveExactText(['It should have', 'Some different text']);
    });
  });

  describe('Value', () => {
    it('should match multiple inputs with different values', () => {
      const inputs = spectator.queryAll('input.sample');
      expect(inputs).toHaveValue(['test1', 'test2']);
      expect(inputs).toContainValue(['test1', 'test2']);
    });
  });

  describe('Class', () => {
    it('should match multiple classes on an element', () => {
      expect('#multi-class').toHaveClass(['one-class', 'two-class']);
    });
  });

  describe('Attribute', () => {
    it('should match attributes with object syntax', () => {
      expect('#attr-check').toHaveAttribute({ label: 'test label' });
    });
  });

  describe('Property', () => {
    it('should match properties with object syntax', () => {
      expect(spectator.query('.checkbox')).toHaveProperty({ checked: true });
    });

    it('should match partial properties with object syntax', () => {
      expect('img').toContainProperty({ src: 'assets/myimg.jpg' });
    });
  });

  describe('Partial', () => {
    it('should return true when expected is partial of actual', () => {
      expect(spectator.component.dummyValue).toBePartial({ label: 'this is a dummy value' });
      expect(spectator.component.dummyValue).toBePartial({ active: true });
    });

    it('should return true when expected is same as actual', () => {
      expect(spectator.component.dummyValue).toBePartial({...spectator.component.dummyValue});
    });

    it('should return false when expected is not partial of actual', () => {
      expect(spectator.component.dummyValue).not.toBePartial({ unknown: 'property' });
      expect(spectator.component.dummyValue).not.toBePartial({ label: 'this is another dummy value' });
      expect(spectator.component.dummyValue).not.toBePartial({ active: false });
    });
  });
});
