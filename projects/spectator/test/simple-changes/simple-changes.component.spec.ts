import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';

import { SimpleChangesComponent } from './simple-changes.component';

describe('SimpleChangesComponent', () => {
  let spectator: Spectator<SimpleChangesComponent>;

  const createComponent = createComponentFactory({
    component: SimpleChangesComponent,
    imports: [CommonModule],
  });

  it('should be sequence of calls is correct', () => {
    spectator = createComponent({
      props: { value: '1' },
    });

    const { hooks } = spectator.component;

    expect(hooks.length).toBe(2);
    expect(hooks[0]).toBe('ngOnChanges');
    expect(hooks[1]).toBe('ngOnInit');
  });

  it('should be set first change value and next updates', () => {
    spectator = createComponent({ props: { value: '1' } });

    const { changes } = spectator.component;

    expect(changes.length).toBe(1, 'size after compile');
    expect(changes[0].currentValue).toBe('1', 'first change currentValue');
    expect(changes[0].previousValue).toBe(undefined, 'first change previousValue');
    expect(changes[0].firstChange).toBe(true, 'first change firstChange');

    spectator.setInput({ value: '2' });

    expect(changes.length).toBe(2, 'size after update');
    expect(changes[1].currentValue).toBe('2', 'after update currentValue');
    expect(changes[1].previousValue).toBe('1', 'after update previousValue');
    expect(changes[1].firstChange).toBe(false, 'after update firstChange');
  });

  it('should not update when value is equal', () => {
    spectator = createComponent({ props: { value: '1' } });

    const { changes } = spectator.component;

    expect(changes.length).toBe(1, 'size after compile');

    spectator.setInput({ value: '1' });
    expect(changes.length).toBe(1, 'not updated');
  });
});
