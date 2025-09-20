import { createComponentFactory, createRoutingFactory, Spectator, SpectatorRouting } from '@ngneat/spectator/vitest';

import { TestCompHost, TestCompInput, TestCompOutput, TestCompTwoWayBinding } from '../../../test/bindings/bindings.component';
import { inputBinding, outputBinding, signal, twoWayBinding, WritableSignal } from '@angular/core';

describe('Component Bindings', () => {
  describe('with Spectator', () => {
    describe('Input Bindings', () => {
      let spectator: Spectator<TestCompInput>;
      const value = signal(1);

      const createComponent = createComponentFactory({
        component: TestCompInput,
        bindings: [inputBinding('value', value)],
      });

      beforeEach(() => (spectator = createComponent()));

      it('should be able to bind to inputs', () => {
        // Assert - Initial state
        expect(spectator.component.value).toBe(1);

        // Act
        value.set(2);
        spectator.fixture.detectChanges();

        // Assert - After change
        expect(spectator.component.value).toBe(2);
      });
    });

    describe('Output Bindings', () => {
      let spectator: Spectator<TestCompOutput>;
      let count = 0;

      const createComponent = createComponentFactory({
        component: TestCompOutput,
        bindings: [outputBinding('event', () => count++)],
      });

      beforeEach(() => (spectator = createComponent()));

      it('should be able to bind to outputs', () => {
        // Assert - Initial state
        expect(count).toBe(0);

        // Act
        spectator.click('button');

        // Assert - After click
        expect(count).toBe(1);
      });
    });

    describe('Two-Way Bindings', () => {
      let spectator: Spectator<TestCompTwoWayBinding>;
      const value = signal('initial');
      const createComponent = createComponentFactory({
        component: TestCompTwoWayBinding,
        bindings: [twoWayBinding('value', value)],
      });

      beforeEach(() => (spectator = createComponent()));

      it('should be able to bind two-way bindings', () => {
        // Assert - Initial state
        expect(value()).toBe('initial');
        expect(spectator.element.textContent).toBe('Value: initial');

        // Act - Update signal externally
        value.set('1');
        spectator.fixture.detectChanges();

        // Assert - Signal change reflected in component
        expect(value()).toBe('1');
        expect(spectator.element.textContent).toBe('Value: 1');

        // Act - Update component internally
        spectator.component.value = '2';
        spectator.component.valueChange.emit('2');
        spectator.fixture.detectChanges();

        // Assert - Component change reflected in signal
        expect(value()).toBe('2');
        expect(spectator.element.textContent).toBe('Value: 2');
      });
    });

    describe('Host Bindings', () => {
      let spectator: Spectator<TestCompHost>;
      const isChecked: WritableSignal<string | boolean> = signal('initial');

      const createComponent = createComponentFactory<TestCompHost>({
        component: TestCompHost,
        imports: [TestCompHost],
        bindings: [inputBinding('isChecked', isChecked)],
      });

      beforeEach(() => (spectator = createComponent()));

      it('should toggle the host checked class', () => {
        // Act
        isChecked.set(false);
        spectator.fixture.detectChanges();

        // Assert
        expect(spectator.element.classList.contains('checked')).toBe(false);

        // Act
        isChecked.set(true);
        spectator.fixture.detectChanges();

        // Assert
        expect(spectator.element.classList.contains('checked')).toBe(true);
      });
    });
  });

  describe('with SpectatorRouting', () => {
    describe('Input Bindings', () => {
      let spectator: SpectatorRouting<TestCompInput>;
      const value = signal(1);

      const createComponent = createRoutingFactory({
        component: TestCompInput,
        bindings: [inputBinding('value', value)],
      });

      beforeEach(() => (spectator = createComponent()));

      it('should be able to bind to inputs', () => {
        // Assert - Initial state
        expect(spectator.component.value).toBe(1);

        // Act
        value.set(2);
        spectator.fixture.detectChanges();

        // Assert - After change
        expect(spectator.component.value).toBe(2);
      });
    });

    describe('Output Bindings', () => {
      let spectator: SpectatorRouting<TestCompOutput>;
      let count = 0;

      const createComponent = createRoutingFactory({
        component: TestCompOutput,
        bindings: [outputBinding('event', () => count++)],
      });

      beforeEach(() => (spectator = createComponent()));

      it('should be able to bind to outputs', () => {
        // Assert - Initial state
        expect(count).toBe(0);

        // Act
        spectator.click('button');

        // Assert - After click
        expect(count).toBe(1);
      });
    });

    describe('Two-Way Bindings', () => {
      let spectator: SpectatorRouting<TestCompTwoWayBinding>;

      const value = signal('initial');
      const createComponent = createRoutingFactory({
        component: TestCompTwoWayBinding,
        bindings: [twoWayBinding('value', value)],
      });

      beforeEach(() => (spectator = createComponent()));

      it('should be able to bind two-way bindings', () => {
        // Assert - Initial state
        expect(value()).toBe('initial');
        expect(spectator.element.textContent).toBe('Value: initial');

        // Act - Update signal externally
        value.set('1');
        spectator.fixture.detectChanges();

        // Assert - Signal change reflected in component
        expect(value()).toBe('1');
        expect(spectator.element.textContent).toBe('Value: 1');

        // Act - Update component internally
        spectator.component.value = '2';
        spectator.component.valueChange.emit('2');
        spectator.fixture.detectChanges();

        // Assert - Component change reflected in signal
        expect(value()).toBe('2');
        expect(spectator.element.textContent).toBe('Value: 2');
      });
    });

    describe('Host Bindings', () => {
      let spectator: SpectatorRouting<TestCompHost>;
      const isChecked: WritableSignal<string | boolean> = signal('initial');

      const createComponent = createRoutingFactory<TestCompHost>({
        component: TestCompHost,
        imports: [TestCompHost],
        bindings: [inputBinding('isChecked', isChecked)],
      });

      beforeEach(() => (spectator = createComponent()));

      it('should toggle the host checked class', () => {
        // Act
        isChecked.set(false);
        spectator.fixture.detectChanges();

        // Assert
        expect(spectator.element.classList.contains('checked')).toBe(false);

        // Act
        isChecked.set(true);
        spectator.fixture.detectChanges();

        // Assert
        expect(spectator.element.classList.contains('checked')).toBe(true);
      });
    });
  });
});
