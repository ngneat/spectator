---
id: testing-with-host
title: Testing With Host 
---

Testing a component with a host component is a more elegant and powerful technique to test your component.
It basically gives you the ability to write your tests in the same way that you write your code. Let's see it in action:

```ts
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

describe('ZippyComponent', () => {
  let spectator: SpectatorHost<ZippyComponent>;
  const createHost = createHostFactory(ZippyComponent);

  it('should display the title from host property', () => {
    spectator = createHost(`<zippy [title]="title"></zippy>`, {
      hostProps: {
        title: 'Spectator is Awesome'
      }
    });
    expect(spectator.query('.zippy__title')).toHaveText('Spectator is Awesome');
  });

  it('should display the "Close" word if open', () => {
    spectator = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

    spectator.click('.zippy__title');

    expect(spectator.query('.arrow')).toHaveText('Close');
    expect(spectator.query('.arrow')).not.toHaveText('Open');
  });
});
```
The host method returns an instance of `SpectatorHost` which extends `Spectator` with the following additional API:
- `hostFixture` - The host's fixture
- `hostComponent` - The host's component instance
- `hostElement` - The host's native element
- `hostDebugElement` - The host's fixture debug element
- `setHostInput` -  Changes the value of an `@Input()` of the host component
- `queryHost` - Read more about [querying](./queries) in Spectator
- `queryHostAll` - Read more about [querying](./queries) in Spectator

### Setting factory defaults

It is possible to set a default template when creating the factory. Here is an example:

```ts
describe('With default template', () => {
  let spectator: SpectatorWithHost<ZippyComponent>;

  const createHost = createHostFactory({
    component: ZippyComponent,
    template: `<zippy [title]="title"></zippy>`
  });

  it('should display the title from host property', () => {
    spectator = createHost(undefined, {
      hostProps: {
        title: 'Spectator is Awesome'
      }
    });
    expect(spectator.query('.zippy__title')).toHaveText('Spectator is Awesome');
  });
});
```

### Custom Host Component
Sometimes it's helpful to pass your own host implementation. We can pass a custom host component to the `createHostComponentFactory()` that will replace the default one:

```ts
@Component({ selector: 'custom-host', template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent';
}

describe('With Custom Host Component', function () {
  let spectator: SpectatorHost<ZippyComponent, CustomHostComponent>;
  const createHost = createHostFactory({
    component: ZippyComponent,
    host: CustomHostComponent
  });

  it('should display the host component title', () => {
    spectator = createHost(`<zippy [title]="title"></zippy>`);
    expect(spectator.query('.zippy__title')).toHaveText('Custom HostComponent');
  });
});
```
