import { Component, Input, input } from '@angular/core';
import { createComponentFactory } from '@ngneat/spectator/jest';

describe('SetInputAliasNames', () => {
  describe('input decorators', () => {
    @Component({
      selector: 'app-root',
      template: `
        <div data-test="set-input--name">{{ name }}</div>
        <div data-test="set-input--age">{{ numOfYears }}</div>
      `,
      standalone: true,
    })
    class DummyComponent {
      @Input('userName') name!: string;
      @Input({ alias: 'age' }) numOfYears!: number;
    }

    const createComponent = createComponentFactory(DummyComponent);

    it('setInput should respect the alias names', () => {
      // Arrange
      const spectator = createComponent();

      const nameElement = spectator.query('[data-test="set-input--name"]')!;
      const ageElement = spectator.query('[data-test="set-input--age"]')!;

      // Act
      spectator.setInput('userName', 'John');
      spectator.setInput('age', '123');

      // Assert
      expect(nameElement.innerHTML).toBe('John');
      expect(ageElement.innerHTML).toBe('123');
    });

    it('setInput with object should respect the alias names', () => {
      // Arrange
      const spectator = createComponent();

      const nameElement = spectator.query('[data-test="set-input--name"]')!;
      const ageElement = spectator.query('[data-test="set-input--age"]')!;

      // Act
      spectator.setInput({
        userName: 'John',
        age: '123',
      });

      // Assert
      expect(nameElement.innerHTML).toBe('John');
      expect(ageElement.innerHTML).toBe('123');
    });
  });

  describe('signal inputs', () => {
    @Component({
      selector: 'app-root',
      template: `
        <div data-test="set-input--name">{{ name() }}</div>
        <div data-test="set-input--age">{{ numOfYears() }}</div>
      `,
      standalone: true,
    })
    class DummyComponent {
      name = input.required({ alias: 'userName' });
      numOfYears = input(0, { alias: 'age' });
    }

    const createComponent = createComponentFactory(DummyComponent);

    it('setInput should respect the alias names', () => {
      // Arrange
      const spectator = createComponent({
        detectChanges: false,
      });

      const nameElement = spectator.query('[data-test="set-input--name"]')!;
      const ageElement = spectator.query('[data-test="set-input--age"]')!;

      // Act
      spectator.setInput('userName', 'John');
      spectator.setInput('age', '123');

      // Assert
      expect(nameElement.innerHTML).toBe('John');
      expect(ageElement.innerHTML).toBe('123');
    });

    it('setInput with object should respect the alias names', () => {
      // Arrange
      const spectator = createComponent({
        detectChanges: false,
      });

      const nameElement = spectator.query('[data-test="set-input--name"]')!;
      const ageElement = spectator.query('[data-test="set-input--age"]')!;

      // Act
      spectator.setInput({
        userName: 'John',
        age: '123',
      });

      // Assert
      expect(nameElement.innerHTML).toBe('John');
      expect(ageElement.innerHTML).toBe('123');
    });
  });
});
