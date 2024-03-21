import { Component, Input } from '@angular/core';
import { createComponentFactory } from '@ngneat/spectator';

describe('SetInputAliasNames', () => {
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
});
