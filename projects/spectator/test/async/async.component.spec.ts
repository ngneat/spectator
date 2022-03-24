import { Component, Input } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

@Component({
  selector: 'app-foo',
  template: '',
  host: {
    '[class.bar]': 'bar',
  },
})
class FooComponent {
  @Input() bar!: boolean;
}

describe('FooComponenent', () => {
  const createComponent = createComponentFactory({
    component: FooComponent,
  });

  let spectator: Spectator<FooComponent>;

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should set the class name "bar"', () => {
    spectator.setInput({ bar: true });

    expect(spectator.element).toHaveClass('bar');
  });
});
