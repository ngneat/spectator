---
id: testing-pipes
title: Testing Pipes
---

The following example shows how to test a pipe with Spectator:

```ts
import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

import { StatsService } from './stats.service';
import { SumPipe } from './sum.pipe';

describe('SumPipe', () => {
  let spectator: SpectatorPipe<SumPipe>;
  const createPipe = createPipeFactory(SumPipe);

  it('should sum up the given list of numbers (template)', () => {
    spectator = createPipe(`{{ [1, 2, 3] | sum }}`);
    expect(spectator.element).toHaveText('6');
  });

  it('should sum up the given list of numbers (prop)', () => {
    spectator = createPipe(`{{ prop | sum }}`, {
      hostProps: {
        prop: [1, 2, 3]
      }
    });
    expect(spectator.element).toHaveText('6');
  });

  it('should delegate the summation to the service', () => {
    const sum = () => 42;
    const provider = { provide: StatsService, useValue: { sum } };
    spectator = createPipe(`{{ prop | sum }}`, {
      hostProps: {
        prop: [2, 40]
      },
      providers: [provider]
    });
    expect(spectator.element).toHaveText('42');
  });
});
```

The `createPipe()` function returns `SpectatorPipe` with the following properties:
- `hostComponent` - Instance of the host component
- `debugElement` - The debug element of the fixture around the host component
- `element` - The native element of the host component
- `detectChanges()` - A proxy for Angular `TestBed.fixture.detectChanges()`
- `inject()` - A proxy for Angular `TestBed.inject()`

### Setting factory defaults

It is possible to set a default template when creating the factory. Here is an example:

```ts
import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

import { AlternatingSumPipe } from './alternating-sum.pipe';

describe('AlternatingSumPipe', () => {
  let spectator: SpectatorPipe<AlternatingSumPipe>;
  const createPipe = createPipeFactory({
    pipe: AlternatingSumPipe,
    template: `{{ prop | alternatingSum }}`
  });

  it('should compute the alternating sum of a given list of numbers (prop)', () => {
    spectator = createPipe({
      hostProps: {
        prop: [1, 2, 3]
      }
    });
    expect(spectator.element).toHaveText('2');
  });
});
```

### Using Custom Host Component

The following example illustrates how to test a pipe using a custom host component:

```ts
import { Component, Input } from '@angular/core';
import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

import { AveragePipe } from './average.pipe';
import { StatsService } from './stats.service';

@Component({
  template: `<div>{{ prop | avg }}</div>`
})
class CustomHostComponent {
  @Input() public prop: number[] = [1, 2, 3];
}

describe('AveragePipe', () => {
  let spectator: SpectatorPipe<AveragePipe>;
  const createPipe = createPipeFactory({
    pipe: AveragePipe,
    host: CustomHostComponent
  });

  it('should compute the average of a given list of numbers', () => {
    spectator = createPipe();
    expect(spectator.element).toHaveText('2');
  });

  it('should result to 0 when list of numbers is empty', () => {
    spectator = createPipe({
      hostProps: {
        prop: []
      }
    });
    expect(spectator.element).toHaveText('0');
  });

  it('should delegate the calculation to the service', () => {
    const avg = () => 42;
    const provider = { provide: StatsService, useValue: { avg } };
    spectator = createPipe({
      providers: [provider]
    });
    expect(spectator.element).toHaveText('42');
  });
});
```
