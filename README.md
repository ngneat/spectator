<p align="center">
 <img width="100%" height="100%" src="https://raw.githubusercontent.com/ngneat/spectator/master/image.svg?sanitize=true">
</p>

[![All Contributors](https://img.shields.io/badge/all_contributors-48-orange.svg?style=flat-square)](#contributors)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/ngneat/spectator.svg?branch=master)](https://travis-ci.org/ngneat/spectator)

> A Powerful Tool to Simplify Your Angular Tests

Spectator helps you get rid of all the boilerplate grunt work, leaving you with readable, sleek and streamlined unit tests.

## Features
- ✅ Support for testing Angular components, directives and services
- ✅ Easy DOM querying
- ✅ Clean API for triggering keyboard/mouse/touch events
- ✅ Testing `ng-content`
- ✅ Custom Jasmine/Jest Matchers (toHaveClass, toBeDisabled..)
- ✅ Routing testing support
- ✅ HTTP testing support
- ✅ Built-in support for entry components
- ✅ Built-in support for component providers
- ✅ Auto-mocking providers
- ✅ Strongly typed
- ✅ Jest Support

## Table of Contents

- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [NPM](#npm)
  - [Yarn](#yarn)
- [Testing Components](#testing-components)
  - [Events API](#events-api)
    - [Custom Events](#custom-events)
    - [Event Creators](#event-creators)
  - [Keyboard helpers](#keyboard-helpers)
  - [Mouse helpers](#mouse-helpers)
  - [Queries](#queries)
    - [String Selector](#string-selector)
    - [Type Selector](#type-selector)
    - [DOM Selector](#dom-selector)
    - [Testing Select Elements](#testing-select-elements)
    - [Mocking Components](#mocking-components)
    - [Testing Single Component/Directive Angular Modules](#testing-single-componentdirective-angular-modules)
- [Testing with Host](#testing-with-host)
  - [Custom Host Component](#custom-host-component)
- [Testing with Routing](#testing-with-routing)
  - [Triggering a navigation](#triggering-a-navigation)
  - [Integration testing with `RouterTestingModule`](#integration-testing-with-routertestingmodule)
  - [Routing Options](#routing-options)
- [Testing Directives](#testing-directives)
- [Testing Services](#testing-services)
  - [Additional Options](#additional-options)
- [Testing Pipes](#testing-pipes)
  - [Using Custom Host Component](#using-custom-host-component)
- [Mocking Providers](#mocking-providers)
  - [Mocking OnInit Dependencies](#mocking-oninit-dependencies)
- [Jest Support](#jest-support)
- [Testing with HTTP](#testing-with-http)
- [Global Injections](#global-injections)
- [Component Providers](#component-providers)
- [Custom Matchers](#custom-matchers)
- [Schematics](#schematics)
- [Default Schematics Collection](#default-schematics-collection)
- [Working Spectator & Jest Sample Repo and Karma Comparison](#working-spectator--jest-sample-repo-and-karma-comparison)
- [Core Team](#core-team)
- [Contributors](#contributors)

## Installation

### NPM

`npm install @ngneat/spectator --save-dev`

### Yarn

`yarn add @ngneat/spectator --dev`

## Testing Components
Create a component factory by using the `createComponentFactory()` function, passing the component class that you want to test.
The `createComponentFactory()` returns a function that will create a fresh component in each `it` block:

```ts
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createComponentFactory(ButtonComponent);

  beforeEach(() => spectator = createComponent());

  it('should have a success class by default', () => {
    expect(spectator.query('button')).toHaveClass('success');
  });

  it('should set the class name according to the [className] input', () => {
    spectator.setInput('className', 'danger');
    expect(spectator.query('button')).toHaveClass('danger');
    expect(spectator.query('button')).not.toHaveClass('success');
  });
});
```

The `createComponentFactory` function can optionally take the following options which extends the basic Angular Testing Module options:

```ts
const createComponent = createComponentFactory({
  component: ButtonComponent,
  imports: [],
  providers: [],
  declarations: [],
  entryComponents: [],
  componentProviders: [], // Override the component's providers
  componentViewProviders: [], // Override the component's view providers
  overrideModules: [], // Override modules
  mocks: [], // Providers that will automatically be mocked
  componentMocks: [], // Component providers that will automatically be mocked
  componentViewProvidersMocks: [], // Component view providers that will be automatically mocked
  detectChanges: false, // Defaults to true
  declareComponent: false, // Defaults to true
  disableAnimations: false, // Defaults to true
  shallow: true, // Defaults to false
});
```

The `createComponent()` function optionally takes the following options:
```ts
it('should...', () => {
  spectator = createComponent({
    // The component inputs
    props: {
      title: 'Click'
    },
    // Override the component's providers
    // Note that you must declare it once in `createComponentFactory`
    providers: [],
    // Whether to run change detection (defaults to true)
    detectChanges: false
  });

  expect(spectator.query('button')).toHaveText('Click');
});
```
The `createComponent()` method returns an instance of `Spectator` which exposes the following API:

- `fixture` - The tested component's fixture
- `component` - The tested component's instance
- `element` - The tested component's native element
- `debugElement` - The tested fixture's debug element

- `inject()` - Provides a wrapper for `TestBed.inject()`:
```ts
const service = spectator.inject(QueryService);

const fromComponentInjector = true;
const service = spectator.inject(QueryService, fromComponentInjector);
```
- `detectChanges()` - Runs detectChanges on the tested element/host:
```ts
spectator.detectChanges();
```

- `detectComponentChanges()` - Runs `detectChanges` on the **tested** component ( not on the `host` ).
  You'll need this method in __rare__ cases when using a `host` and the tested component is `onPush`, and you want to force it to run a change detection cycle.

```ts
spectator.detectComponentChanges();
```

- `setInput()` - Changes the value of an @Input() of the tested component.
  Method runs `ngOnChanges` with `SimpleChanges` manually if it exists.
```ts
it('should...', () => {
  spectator.setInput('className', 'danger');

  spectator.setInput({
    className: 'danger'
  });
});
```
- `output` - Returns an Observable @Output() of the tested component:
```ts
it('should emit the $event on click', () => {
  let output;
  spectator.output('click').subscribe(result => (output = result));

  spectator.component.onClick({ type: 'click' });
  expect(output).toEqual({ type: 'click' });
});
```
- `tick(millis?: number)` - Run the fakeAsync `tick()` function and call `detectChanges()`:
```ts
it('should work with tick', fakeAsync(() => {
  spectator = createComponent(ZippyComponent);
  spectator.component.update();
  expect(spectator.component.updatedAsync).toBeFalsy();
  spectator.tick(6000);
  expect(spectator.component.updatedAsync).not.toBeFalsy();
}))
```

### Events API
Each one of the events can accept a `SpectatorElement` which can be one of the following:

```ts
type SpectatorElement = string | Element | DebugElement | ElementRef | Window | Document | DOMSelector;
```

If not provided, the default element will be the host element of the component under test.

- `click()` - Triggers a click event:
```ts
spectator.click(SpectatorElement);
spectator.click(byText('Element'));
```
- `blur()` - Triggers a blur event:
```ts
spectator.blur(SpectatorElement);
spectator.blur(byText('Element'));
```
Note that if using the jest framework, blur() only works if the element is focused. [Details](https://github.com/ngneat/spectator/issues/373#issuecomment-896285805).
- `focus()` - Triggers a focus event:
```ts
spectator.focus(SpectatorElement);
spectator.focus(byText('Element'));
```
- `typeInElement()` - Simulating the user typing:
```ts
spectator.typeInElement(value, SpectatorElement);
spectator.typeInElement(value, byText('Element'));
```
- `dispatchMouseEvent()` - Triggers a mouse event:
```ts
spectator.dispatchMouseEvent(SpectatorElement, 'mouseout');
spectator.dispatchMouseEvent(SpectatorElement, 'mouseout'), x, y, event);
spectator.dispatchMouseEvent(byText('Element'), 'mouseout');
spectator.dispatchMouseEvent(byText('Element'), 'mouseout', x, y, event);
```
- `dispatchKeyboardEvent()` - Triggers a keyboard event:
```ts
spectator.dispatchKeyboardEvent(SpectatorElement, 'keyup', 'Escape');
spectator.dispatchKeyboardEvent(SpectatorElement, 'keyup', { key: 'Escape', keyCode: 27 })
spectator.dispatchKeyboardEvent(byText('Element'), 'keyup', 'Escape');
spectator.dispatchKeyboardEvent(byText('Element'), 'keyup', { key: 'Escape', keyCode: 27 })
```
- `dispatchTouchEvent()` - Triggers a touch event:
```ts
spectator.dispatchTouchEvent(SpectatorElement, type, x, y);
spectator.dispatchTouchEvent(byText('Element'), type, x, y);
```

#### Custom Events

You can trigger custom events (@Output() of child components) [using](https://github.com/ngneat/spectator/blob/master/projects/spectator/test/child-custom-event/child-custom-event-parent.component.spec.ts) the following method:
```ts
spectator.triggerEventHandler(MyChildComponent, 'myCustomEvent', 'eventValue');
spectator.triggerEventHandler(MyChildComponent, 'myCustomEvent', 'eventValue', { root: true});

spectator.triggerEventHandler('app-child-component', 'myCustomEvent', 'eventValue');
spectator.triggerEventHandler('app-child-component', 'myCustomEvent', 'eventValue', { root: true});

```

#### Event Creators

In case you want to test events independently of any template (e.g. in presenter services) you can fallback on the underlying event creators.
They are basically providing the same signature without the preceding element.
```ts
const keyboardEvent = createKeyboardEvent('keyup', 'ArrowDown'/*, targetElement */);
const mouseEvent = createMouseEvent('mouseout');
const touchEvent = createTouchEvent('touchmove');
const fakeEvent = createFakeEvent('input');
```

### Keyboard helpers
```ts
spectator.keyboard.pressEnter();
spectator.keyboard.pressEscape();
spectator.keyboard.pressTab();
spectator.keyboard.pressBackspace();
spectator.keyboard.pressKey('a');
spectator.keyboard.pressKey('ctrl.a');
spectator.keyboard.pressKey('ctrl.shift.a');
```

### Mouse helpers
```ts
spectator.mouse.contextmenu('.selector');
spectator.mouse.dblclick('.selector');
```

Note that each one of the above methods will also run `detectChanges()`.

### Queries
The Spectator API includes convenient methods for querying the DOM as part of a test: `query`, `queryAll`, `queryLast` , `queryHost` and `queryHostAll`. All query methods are polymorphic and allow you to query using any of the following techniques.

#### String Selector
 Pass a string selector (in the same style as you would when using jQuery or document.querySelector) to query for elements that match that path in the DOM. This method for querying is equivalent to Angular's By.css predicate. Note that native HTML elements will be returned. For example:
 ```ts
// Returns a single HTMLElement
spectator.query('div > ul.nav li:first-child');
// Returns an array of all matching HTMLElements
spectator.queryAll('div > ul.nav li');

// Query from the document context
spectator.query('div', { root: true });

spectator.query('app-child', { read: ChildServiceService });
```
#### Type Selector
Pass a type (such as a component, directive or provider class) to query for instances of that type in the DOM. This is equivalent to Angular's `By.directive` predicate. You can optionally pass in a second parameter to read a specific injection token from the matching elements' injectors. For example:
```ts
// Returns a single instance of MyComponent (if present)
spectator.query(MyComponent);

// Returns the instance of `SomeService` found in the instance of `MyComponent` that exists in the DOM (if present)
spectator.query(MyComponent, { read: SomeService });

spectator.query(MyComponent, { read: ElementRef });
host.queryLast(ChildComponent);
host.queryAll(ChildComponent);
```
#### DOM Selector
Spectator allows you to query for elements using selectors inspired by [dom-testing-library](https://testing-library.com/docs/dom-testing-library/api-queries). The available selectors are:

```ts
spectator.query(byPlaceholder('Please enter your email address'));
spectator.query(byValue('By value'));
spectator.query(byTitle('By title'));
spectator.query(byAltText('By alt text'));
spectator.query(byLabel('By label'));
spectator.query(byText('By text'));
spectator.query(byText('By text', {selector: '#some .selector'}));
spectator.query(byTextContent('By text content', {selector: '#some .selector'}));
spectator.query(byRole('checkbox', { checked: true }));
```

The difference between `byText` and `byTextContent` is that the former doesn't match text inside a nested elements.

For example, in this following HTML `byText('foobar', {selector: 'div'})` won't match the following `div`, but `byTextContent` will:
```html
<div>
  <span>foo</span>
  <span>bar</span>
</div>
```

#### Testing Select Elements
Spectator allows you to test `<select></select>` elements easily, and supports multi select.

Example:
```ts
it('should set the correct options on multi select', () => {
  const select = spectator.query('#test-multi-select') as HTMLSelectElement;
  spectator.selectOption(select, ['1', '2']);
  expect(select).toHaveSelectedOptions(['1', '2']);
});

it('should set the correct option on standard select', () => {
  const select = spectator.query('#test-single-select') as HTMLSelectElement;
  spectator.selectOption(select, '1');
  expect(select).toHaveSelectedOptions('1');
});
```

It also allows you to check if your `change` event handler is acting correctly for each item selected. You can disable this if you need to pre set choices without dispatching the change event.

API:
```ts
spectator.selectOption(selectElement: HTMLSelectElement, options: string | string[] | HTMLOptionElement | HTMLOptionElement[], config: { emitEvents: boolean } = { emitEvents: true });
```

Example:
```ts
it('should dispatch correct number of change events', () => {
  const onChangeSpy = spyOn(spectator.component, 'handleChange');
  const select = spectator.query('#test-onchange-select') as HTMLSelectElement;

  spectator.selectOption(select, ['1', '2'], { emitEvents: true});

  expect(select).toHaveSelectedOptions(['1', '2']);
  expect(onChangeSpy).toHaveBeenCalledTimes(2);
});

it('should not dispatch correct number of change events', () => {
  const onChangeSpy = spyOn(spectator.component, 'handleChange');
  const select = spectator.query('#test-onchange-select') as HTMLSelectElement;

  spectator.selectOption(select, ['1', '2'], { emitEvents: false});

  expect(select).toHaveSelectedOptions(['1', '2']);
  expect(onChangeSpy).not.toHaveBeenCalledTimes(2);
});
```
You can also pass `HTMLOptionElement`(s) as arguments to `selectOption` and the `toHaveSelectedOptions` matcher. This is particularly useful when you are using `[ngValue]` binding on the `<option>`:
```ts
it('should set the correct option on single select when passing the element', () => {
  const select = spectator.query('#test-single-select-element') as HTMLSelectElement;

  spectator.selectOption(select, spectator.query(byText('Two')) as HTMLOptionElement);

  expect(select).toHaveSelectedOptions(spectator.query(byText('Two')) as HTMLOptionElement);
});
```

#### Mocking Components
If you need to mock components, you can use the [ng-mocks](https://github.com/ike18t/ng-mocks) library. Instead of using `CUSTOM_ELEMENTS_SCHEMA`,which might hide some issues and won't help you to set inputs, outputs, etc., `ng-mocks` will auto mock the inputs, outputs, etc. for you.

Example:

```ts
import { createHostFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { FooComponent } from './path/to/foo.component';

const createHost = createHostFactory({
  component: YourComponentToTest,
  declarations: [
    MockComponent(FooComponent)
  ]
});
```

#### Testing Single Component/Directive Angular Modules

Components (or Directives) that are declared in their own module can be tested by defining the component
module in the imports list of the component factory together with the component. For example:

```ts
const createComponent = createComponentFactory({
  component: ButtonComponent,
  imports: [ButtonComponentModule],
});
```

When used like this, however, Spectator internally adds the component `ButtonComponent` to the declarations of the internally created new module. Hence, you will see the following error:

```
Type ButtonComponent is part of the declarations of 2 modules [...]
```

It is possible to tell Spectator not to add the component to the declarations of the internal module and, instead, use the explicitly defined module as is. Simply set the `declareComponent` property of the factory options to `false`:

```ts
const createComponent = createComponentFactory({
  component: ButtonComponent,
  imports: [ButtonComponentModule],
  declareComponent: false,
});
```

When using createDirectiveFactory set the `declareDirective` property of the factory options to `false`:

```ts
const createDirective = createDirectiveFactory({
  component: HighlightComponent,
  imports: [HighlightComponentModule],
  declareDirective: false,
});
```



## Testing with Host
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
- `queryHost` - Read more about querying in Spectator
- `queryHostAll` - Read more about querying in Spectator

### Custom Host Component
Sometimes it's helpful to pass your own host implementation. We can pass a custom host component to the `createHostFactory()` that will replace the default one:

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

## Testing with Routing
For components which use routing, there is a special factory available that extends the default one, and provides a stubbed `ActivatedRoute` so that you can configure additional routing options.

```ts
describe('ProductDetailsComponent', () => {
  let spectator: SpectatorRouting<ProductDetailsComponent>;
  const createComponent = createRoutingFactory({
    component: ProductDetailsComponent,
    params: { productId: '3' },
    data: { title: 'Some title' }
  });

  beforeEach(() => spectator = createComponent());

  it('should display route data title', () => {
    expect(spectator.query('.title')).toHaveText('Some title');
  });

  it('should react to route changes', () => {
    spectator.setRouteParam('productId', '5');

     // your test here...
  });
});
```

### Triggering a navigation
The `SpectatorRouting` API includes convenient methods for updating the current route:

```ts
interface SpectatorRouting<C> extends Spectator<C> {
  /**
   * Simulates a route navigation by updating the Params, QueryParams and Data observable streams.
   */
  triggerNavigation(options?: RouteOptions): void;

  /**
   * Updates the route params and triggers a route navigation.
   */
  setRouteParam(name: string, value: string): void;

  /**
   * Updates the route query params and triggers a route navigation.
   */
  setRouteQueryParam(name: string, value: string): void;

  /**
   * Updates the route data and triggers a route navigation.
   */
  setRouteData(name: string, value: any): void;

  /**
   * Updates the route fragment and triggers a route navigation.
   */
  setRouteFragment(fragment: string | null): void;

  /**
   * Updates the route url and triggers a route navigation.
   */
  setRouteUrl(url: UrlSegment[]): void;
}
```

### Integration testing with `RouterTestingModule`

If you set the `stubsEnabled` option to `false`, you can pass a real routing configuration
and setup an integration test using the `RouterTestingModule` from Angular.

Note that this requires promises to resolve. One way to deal with this, is by making your test async:

```ts
describe('Routing integration test', () => {
  const createComponent = createRoutingFactory({
    component: MyComponent,
    declarations: [OtherComponent],
    stubsEnabled: false,
    routes: [
      {
        path: '',
        component: MyComponent
      },
      {
        path: 'foo',
        component: OtherComponent
      }
    ]
  });

  it('should navigate away using router link', async () => {
    const spectator = createComponent();

    // wait for promises to resolve...
    await spectator.fixture.whenStable();

    // test the current route by asserting the location
    expect(spectator.inject(Location).path()).toBe('/');

    // click on a router link
    spectator.click('.link-1');

    // don't forget to wait for promises to resolve...
    await spectator.fixture.whenStable();

    // test the new route by asserting the location
    expect(spectator.inject(Location).path()).toBe('/foo');
  });
});
```

### Routing Options

The `createRoutesFactory` function can take the following options, on top of the default Spectator options:

* `params`: initial params to use in `ActivatedRoute` stub
* `queryParams`: initial query params to use in `ActivatedRoute` stub
* `data`: initial data to use in `ActivatedRoute` stub
* `fragment`: initial fragment to use in `ActivatedRoute` stub
* `url`: initial URL segments to use in `ActivatedRoute` stub
* `root`: the value for `root` for the `ActivatedRoute` stub
* `parent`: the value for `parent` for the `ActivatedRoute` stub
* `children`: the value for `children` for the `ActivatedRoute` stub
* `firstChild`: the value for `firstChild` for the `ActivatedRoute` stub
* `stubsEnabled` (default: `true`): enables the `ActivatedRoute` stub, if set to `false` it uses `RouterTestingModule` instead
* `routes`: if `stubsEnabled` is set to false, you can pass a `Routes` configuration for `RouterTestingModule`

## Testing Directives

There is a special test factory for testing directives. Let's say we have the following directive:

```ts
@Directive({ selector: '[highlight]' })
export class HighlightDirective {

  @HostBinding('style.background-color') backgroundColor : string;

  @HostListener('mouseover')
  onHover() {
    this.backgroundColor = '#000000';
  }

  @HostListener('mouseout')
  onLeave() {
    this.backgroundColor = '#ffffff';
  }
}
```
Let's see how we can test directives easily with Spectator:
```ts
describe('HighlightDirective', () => {
  let spectator: SpectatorDirective<HighlightDirective>;
  const createDirective = createDirectiveFactory(HighlightDirective);

  beforeEach(() => {
    spectator = createDirective(`<div highlight>Testing Highlight Directive</div>`);
  });

  it('should change the background color', () => {
    spectator.dispatchMouseEvent(spectator.element, 'mouseover');

    expect(spectator.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)'
    });

    spectator.dispatchMouseEvent(spectator.element, 'mouseout');
    expect(spectator.element).toHaveStyle({
      backgroundColor: '#fff'
    });
  });

  it('should get the instance', () => {
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });
});
```

## Testing Services

The following example shows how to test a service with Spectator:

```ts
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { AuthService } from 'auth.service.ts';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory(AuthService);

  beforeEach(() => spectator = createService());

  it('should not be logged in', () => {
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });
});
```

The `createService()` function returns `SpectatorService` with the following properties:
- `service` - Get an instance of the service
- `inject()` - A proxy for Angular `TestBed.inject()`

### Additional Options

It's also possible to pass an object with options. For example, when testing a service
you often want to mock its dependencies, as we focus on the service being tested.

For example:
```ts
@Injectable()
export class AuthService {
  constructor( private dateService: DateService )  {}

  isLoggedIn() {
    if( this.dateService.isExpired('timestamp') ) {
      return false;
    }
    return true;
  }
}
```
In this case we can mock the `DateService` dependency.
```ts
import { createServiceFactory } from '@ngneat/spectator';

import { AuthService } from 'auth.service.ts';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory({
    service: AuthService,
    providers: [],
    entryComponents: [],
    mocks: [DateService]
  });

  beforeEach(() => spectator = createService());

  it('should be logged in', () => {
    const dateService = spectator.inject(DateService);
    dateService.isExpired.and.returnValue(false);

    expect(spectator.service.isLoggedIn()).toBeTruthy();
  });
});
```

## Testing Pipes

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

## Mocking Providers

For every Spectator factory, we can easily mock any provider.

Every service that we pass to the `mocks` property will be mocked using the `mockProvider()` function.
The `mockProvider()` function converts each method into a Jasmine spy. (i.e `jasmine.createSpy()`).

Here are some of the methods it exposes:

```ts
dateService.isExpired.and.callThrough();
dateService.isExpired.and.callFake(() => fake);
dateService.isExpired.and.throwError('Error');
dateService.isExpired.andCallFake(() => fake);
```
However, if you use Jest as test framework and you want to utilize its mocking mechanism instead, import the `mockProvider()` from `@ngneat/spectator/jest`.
This will automatically use the `jest.fn()` function to create a Jest compatible mock instead.

`mockProvider()` doesn't include properties. In case you need to have properties on your mock you can use 2nd argument:
```ts
const createService = createServiceFactory({
  service: AuthService,
  providers: [
    mockProvider(OtherService, {
      name: 'Martin',
      emitter: new Subject(),
      mockedMethod: () => 'mocked'
    })
  ],
});
```

### Mocking OnInit dependencies

If a component relies on a service being mocked in the [OnInit](https://angular.io/api/core/OnInit) lifecycle method, change-detection needs to be disabled until after the services have been injected.

To configure this, change the `createComponent` method to have the `detectChanges` option set to false and then manually call `detectChanges` on the spectator after setting up the injected services.

```ts
const createComponent = createComponentFactory({
  component: WeatherDashboardComponent
});

it('should call the weather api on init', () => {
  const spectator = createComponent({
    detectChanges: false
  });
  const weatherService = spectator.inject(WeatherDataApi);
  weatherService.getWeatherData.andReturn(of(mockWeatherData));
  spectator.detectChanges();
  expect(weatherService.getWeatherData).toHaveBeenCalled();
})
```

## Jest Support
By default, Spectator uses Jasmine for creating spies. If you are using Jest as test framework instead, you can let Spectator create Jest-compatible spies.

Just import one of the following functions from `@ngneat/spectator/jest`(instead of @ngneat/spectator), and it will use Jest instead of Jasmine.
`createComponentFactory()`, `createHostFactory()`, `createServiceFactory()`, `createHttpFactory()`, `mockProvider()`.

```ts
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { AuthService } from './auth.service';
import { DateService } from './date.service';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory({
    service: AuthService,
    mocks: [DateService]
  });

  beforeEach(() => spectator = createService());

  it('should not be logged in', () => {
    const dateService = spectator.inject<DateService>(DateService);
    dateService.isExpired.mockReturnValue(true);
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });

  it('should be logged in', () => {
    const dateService = spectator.inject<DateService>(DateService);
    dateService.isExpired.mockReturnValue(false);
    expect(spectator.service.isLoggedIn()).toBeTruthy();
  });
});
```

When using the component schematic you can specify the `--jest` flag to have the Jest imports used.  In order to Jest imports the default, update `angular.json`:
```json
"schematics": {
  "@ngneat/spectator:spectator-component": {
    "jest": true
  }
}
```

## Testing with HTTP
Spectator makes testing data services, which use the Angular HTTP module, a lot easier. For example, let's say that you have service with three methods, one performs a GET, one a POST and one performs
concurrent requests:

```ts
export class TodosDataService {
  constructor(private httpClient: HttpClient) {}

  getTodos() {
    return this.httpClient.get('api/todos');
  }

  postTodo(id: number) {
    return this.httpClient.post('api/todos', { id });
  }

  collectTodos() {
    return merge(
      this.httpClient.get('/api1/todos'),
      this.httpClient.get('/api2/todos')
    );
  }
}
```

The test for the above service should look like:
```ts
import { createHttpFactory, HttpMethod } from '@ngneat/spectator';
import { TodosDataService } from './todos-data.service';

describe('HttpClient testing', () => {
  let spectator: SpectatorHttp<TodosDataService>;
  const createHttp = createHttpFactory(TodosDataService);

  beforeEach(() => spectator = createHttp());

  it('can test HttpClient.get', () => {
    spectator.service.getTodos().subscribe();
    spectator.expectOne('api/todos', HttpMethod.GET);
  });

  it('can test HttpClient.post', () => {
    spectator.service.postTodo(1).subscribe();

    const req = spectator.expectOne('api/todos', HttpMethod.POST);
    expect(req.request.body['id']).toEqual(1);
  });

  it('can test current http requests', () => {
    spectator.service.getTodos().subscribe();
    const reqs = spectator.expectConcurrent([
        { url: '/api1/todos', method: HttpMethod.GET },
        { URL: '/api2/todos', method: HttpMethod.GET }
    ]);

    spectator.flushAll(reqs, [{}, {}, {}]);
  });
});
```
We need to create an HTTP factory by using the `createHttpFactory()` function, passing the service that you want to test. The `createHttpFactory()` returns a function which can be called to get an instance of SpectatorHttp with the following properties:
- `controller` - A proxy for Angular `HttpTestingController`
- `httpClient` - A proxy for Angular `HttpClient`
- `service` - The service instance
- `inject()` - A proxy for Angular `TestBed.inject()`
- `expectOne()` - Expect that a single request was made which matches the given URL and it's method, and return its mock request


## Global Injections
It's possible to define injections which will be available for each test without the need to re-declare them in each test:
```ts
// test.ts
import { defineGlobalsInjections } from '@ngneat/spectator';
import { TranslocoModule } from '@ngneat/transloco';

defineGlobalsInjections({
  imports: [TranslocoModule],
});
```
Please be aware, that `defineGlobalsInjections()` must be called before the modules are loaded. In the default Angular `test.ts` this means before this line:
```ts
context.keys().map(context);
```

## Component Providers

By default, the original component providers (e.g. the `providers` on the `@Component`) are not touched.

However, in most cases, you want to access the component's providers in your test or replace them with mocks.

For example:

```ts
@Component({
  template: '...',
  providers: [FooService]
})
class FooComponent {
  constructor(private fooService: FooService} {}

  // ...
}
```

Use the `componentProviders` to replace the `FooService` provider:

```ts
const createComponent = createComponentFactory({
  component: FooComponent,
  componentProviders: [
    {
      provide: FooService,
      useValue: someThingElse
    }
  ]
})
```

Or mock the service by using `componentMocks`:

```ts
const createComponent = createComponentFactory({
  component: FooComponent,
  componentMocks: [FooService]
});
```

To access the provider, get it from the component injector using the `fromComponentInjector` parameter:

```ts
spectator.inject(FooService, true)
```

In the same way you can also override the component view providers by using the `componentViewProviders` and `componentViewProvidersMocks`.

The same rules also apply to directives using the `directiveProviders` and `directiveMocks` parameters.


## Custom Matchers
```ts
expect('.zippy__content').not.toExist();
expect('.zippy__content').toHaveLength(3);
expect('.zippy__content').toHaveId('id');
expect(spectator.query('.zippy')).toHaveAttribute('id', 'zippy');
expect(spectator.query('.zippy')).toHaveAttribute({id: 'zippy'});
expect(spectator.query('.checkbox')).toHaveProperty('checked', true);
expect(spectator.query('.img')).toHaveProperty({src: 'assets/myimg.jpg'});
expect(spectator.query('.img')).toContainProperty({src: 'myimg.jpg'});

// Note that toHaveClass accepts classes only in strict order. If order is irrelevant, disable strict mode manually.
expect('.zippy__content').toHaveClass('class');
expect('.zippy__content').toHaveClass('class-a, class-b');
expect('.zippy__content').not.toHaveClass('class-b, class-a');
expect('.zippy__content').toHaveClass(['class-a', 'class-b']);
expect('.zippy__content').not.toHaveClass(['class-b', 'class-a']);

expect('.zippy__content').toHaveClass('class', { strict: false });
expect('.zippy__content').toHaveClass('class-a, class-b', { strict: false });
expect('.zippy__content').toHaveClass('class-b, class-a', { strict: false });
expect('.zippy__content').toHaveClass(['class-b', 'class-a'], { strict: false });
expect('.zippy__content').toHaveClass(['class-b', 'class-a'], { strict: false });

// Note that toHaveText only looks for the existence of a string, not if the string is exactly the same. If you want to verify that the string is completely the same, use toHaveExactText.
// Note that if you pass multiple values, Spectator checks the text of each array element against the index of the element found. 
expect('.zippy__content').toHaveText('Content');
expect('.zippy__content').toHaveText(['Content A', 'Content B']);
expect('.zippy__content').toHaveText((text) => text.includes('..'));
expect('.zippy__content').toContainText('Content');
expect('.zippy__content').toContainText(['Content A', 'Content B']);
expect('.zippy__content').toHaveExactText('Content');
expect('.zippy__content').toHaveExactText(['Content A', 'Content B']);
expect('.zippy__content').toHaveValue('value');
expect('.zippy__content').toContainValue('value');

// Note this looks for multiple elements with the class and checks the value of each array element against the index of the element found
expect('.zippy__content').toHaveValue(['value a', 'value b']);
expect('.zippy__content').toContainValue(['value a', 'value b']);
expect(spectator.element).toHaveStyle({backgroundColor: 'rgba(0, 0, 0, 0.1)'});
expect('.zippy__content').toHaveData({data: 'role', val: 'admin'});
expect('.checkbox').toBeChecked();
expect('.button').toBeDisabled();
expect('div').toBeEmpty();
expect('div').toBeHidden();
expect('element').toBeSelected();
// Notice that due to restrictions within Jest (not applying actual layout logic in virtual DOM), certain matchers may result in false positives. For example width and height set to 0
expect('element').toBeVisible();
expect('input').toBeFocused();
expect('div').toBeMatchedBy('.js-something');
expect(spectator.component.object).toBePartial({ aProperty: 'aValue' });
expect('div').toHaveDescendant('.child');
expect('div').toHaveDescendantWithText({selector: '.child', text: 'text'});
```
## Schematics
Generate component, service, and directive with Spectator spec templates with Angular Cli: (when using it as default)

**Component**
* Default spec: `ng g cs dashrized-name`
* Spec with a host: `ng g cs dashrized-name --withHost=true`
* Spec with a custom host: `ng g cs dashrized-name --withCustomHost=true`

**Service:**
* Default spec: `ng g ss dashrized-name`
* Spec for testing http data service: `ng g ss dashrized-name --isDataService=true`

**Directive:**

`ng g ds dashrized-name`

## Default Schematics Collection

To use `spectator` as the default collection in your Angular CLI project,
add it to your `angular.json`:

```sh
ng config cli.defaultCollection @ngneat/spectator
```

The `spectator` schematics extend the default `@schematics/angular` collection. If you want to set defaults for schematics such as generating components with scss file, you must change the schematics package name from `@schematics/angular` to `@ngneat/spectator` in `angular.json`:

```json
"schematics": {
  "@ngneat/spectator:spectator-component": {
    "style": "scss"
  }
}
```

## Working Spectator & Jest Sample Repo and Karma Comparison

The [examples in Karma]((https://stackblitz.com/angular/pmqopjovvvb?file=src%2Fapp%2Fapp.component.html)) from Angular docs [testing developer guide](https://angular.io/guide/testing) has been reproduced in Spectator and Jest. 
(For convenience, [this is the local version](https://github.com/muratkeremozcan/books/tree/master/Angular_with_Typescript/angular-unit-testing-with-Karma) of the Karma examples.)

The Spectator & Jest version can be accessed [here](https://github.com/muratkeremozcan/angular-playground).

## Core Team

<table>
  <tr>
    <td align="center"><a href="https://www.netbasal.com"><img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;" alt="Netanel Basal"/><br /><sub><b>Netanel Basal</b></sub></a></td>
    <td align="center"><a href="https://github.com/dirkluijk"><img src="https://avatars2.githubusercontent.com/u/2102973?v=4" width="100px;" alt="Dirk Luijk"/><br /><sub><b>Dirk Luijk</b></sub></a></td>
    <td align="center"><a href="http://benjaminelliott.co.uk"><img src="https://avatars1.githubusercontent.com/u/4996462?v=4" width="100px;" alt="Ben Elliott"/><br /><sub><b>Ben Elliott</b></sub></a></td>
    </tr>
</table>

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):~~~~

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/theblushingcrow"><img src="https://avatars3.githubusercontent.com/u/638818?v=4?s=100" width="100px;" alt=""/><br /><sub><b>I. Sinai</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=theblushingcrow" title="Documentation">📖</a> <a href="https://github.com/ngneat/spectator/pulls?q=is%3Apr+reviewed-by%3Atheblushingcrow" title="Reviewed Pull Requests">👀</a> <a href="#design-theblushingcrow" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/valburyakov"><img src="https://avatars3.githubusercontent.com/u/18645670?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Valentin Buryakov</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=valburyakov" title="Code">💻</a> <a href="#ideas-valburyakov" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/bengry"><img src="https://avatars1.githubusercontent.com/u/260431?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ben Grynhaus</b></sub></a><br /><a href="https://github.com/ngneat/spectator/issues?q=author%3Abengry" title="Bug reports">🐛</a> <a href="https://github.com/ngneat/spectator/commits?author=bengry" title="Code">💻</a></td>
    <td align="center"><a href="http://www.nuc.cz"><img src="https://avatars2.githubusercontent.com/u/681176?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Martin Nuc</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=MartinNuc" title="Code">💻</a></td>
    <td align="center"><a href="https://medium.com/@LayZeeDK"><img src="https://avatars1.githubusercontent.com/u/6364586?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lars Gyrup Brink Nielsen</b></sub></a><br /><a href="#platform-LayZeeDK" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/ngneat/spectator/commits?author=LayZeeDK" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/thekiba"><img src="https://avatars0.githubusercontent.com/u/1910515?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Grekov</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=thekiba" title="Code">💻</a> <a href="#tool-thekiba" title="Tools">🔧</a></td>
    <td align="center"><a href="http://twitter.com/jpzwarte"><img src="https://avatars1.githubusercontent.com/u/3968?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Zwartepoorte</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=jpzwarte" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/oschlegel"><img src="https://avatars1.githubusercontent.com/u/11634412?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Oliver Schlegel</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=oschlegel" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rexebin"><img src="https://avatars1.githubusercontent.com/u/10893959?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rex Ye</b></sub></a><br /><a href="#tool-rexebin" title="Tools">🔧</a> <a href="https://github.com/ngneat/spectator/commits?author=rexebin" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/tchmura"><img src="https://avatars0.githubusercontent.com/u/36368505?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tchmura</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=tchmura" title="Code">💻</a></td>
    <td align="center"><a href="http://www.theneuralnetwork.nl"><img src="https://avatars2.githubusercontent.com/u/4572798?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yoeri Nijs</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=YoeriNijs" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/askarby"><img src="https://avatars1.githubusercontent.com/u/44014?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anders Skarby</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=askarby" title="Code">💻</a></td>
    <td align="center"><a href="https://medium.com/@gregor.woiwode"><img src="https://avatars3.githubusercontent.com/u/444278?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gregor Woiwode</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=GregOnNet" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/asheremetev"><img src="https://avatars2.githubusercontent.com/u/10629571?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexander Sheremetev</b></sub></a><br /><a href="https://github.com/ngneat/spectator/issues?q=author%3Aasheremetev" title="Bug reports">🐛</a> <a href="https://github.com/ngneat/spectator/commits?author=asheremetev" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Hypopheralcus"><img src="https://avatars1.githubusercontent.com/u/550162?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mike</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=Hypopheralcus" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mehmet-erim"><img src="https://avatars0.githubusercontent.com/u/34455572?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mehmet Erim</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=mehmet-erim" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Plysepter"><img src="https://avatars0.githubusercontent.com/u/8854614?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brett Eckert</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=Plysepter" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kanafghan"><img src="https://avatars3.githubusercontent.com/u/4976816?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ismail Faizi</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=kanafghan" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/maxime1992"><img src="https://avatars0.githubusercontent.com/u/4950209?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maxime</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=maxime1992" title="Documentation">📖</a></td>
    <td align="center"><a href="https://e-weap.fr"><img src="https://avatars1.githubusercontent.com/u/1033191?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonathan Bonnefoy</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=eweap" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Coly010"><img src="https://avatars2.githubusercontent.com/u/12140467?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Colum Ferry</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=Coly010" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/cjcoops"><img src="https://avatars1.githubusercontent.com/u/20629635?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chris Cooper</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=cjcoops" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/MarcScheib"><img src="https://avatars1.githubusercontent.com/u/5886709?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marc Scheib</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=MarcScheib" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dgsmith2"><img src="https://avatars1.githubusercontent.com/u/2036391?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dgsmith2</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=dgsmith2" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dedwardstech"><img src="https://avatars1.githubusercontent.com/u/50801476?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dedwardstech</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=dedwardstech" title="Code">💻</a> <a href="#ideas-dedwardstech" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/tamasfoldi"><img src="https://avatars2.githubusercontent.com/u/11571461?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tamasfoldi</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=tamasfoldi" title="Code">💻</a> <a href="#ideas-tamasfoldi" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/IlCallo"><img src="https://avatars0.githubusercontent.com/u/10036108?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Paolo Caleffi</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=IlCallo" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/tonivj5"><img src="https://avatars2.githubusercontent.com/u/7110786?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Toni Villena</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=tonivj5" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/itayod"><img src="https://avatars2.githubusercontent.com/u/6719615?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Itay Oded</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=itayod" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/Wykks"><img src="https://avatars0.githubusercontent.com/u/1236069?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Guillaume de Jabrun</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=Wykks" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/codeNoobie"><img src="https://avatars2.githubusercontent.com/u/5392144?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anand Tiwary</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=codeNoobie" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/AlesDo"><img src="https://avatars3.githubusercontent.com/u/13190278?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ales Doganoc</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=AlesDo" title="Code">💻</a></td>
    <td align="center"><a href="https://zoltan.nz"><img src="https://avatars3.githubusercontent.com/u/1009783?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zoltan</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=zoltan-nz" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Coffee-Tea"><img src="https://avatars1.githubusercontent.com/u/13370430?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vitalii Baziuk</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=Coffee-Tea" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/clementlemarc-certua"><img src="https://avatars0.githubusercontent.com/u/50454150?v=4?s=100" width="100px;" alt=""/><br /><sub><b>clementlemarc-certua</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=clementlemarc-certua" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/th0r"><img src="https://avatars1.githubusercontent.com/u/302213?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yuriy Grunin</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=th0r" title="Code">💻</a></td>
    <td align="center"><a href="https://t.me/L2jLiga"><img src="https://avatars2.githubusercontent.com/u/11780854?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrey Chalkin</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=L2jLiga" title="Code">💻</a></td>
    <td align="center"><a href="https://stevenharrisdev.com"><img src="https://avatars3.githubusercontent.com/u/7720242?s=400&v=4?s=100" width="100px;" alt=""/><br /><sub><b>Steven Harris</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=Steven-Harris" title="Code">💻</a> <a href="https://github.com/ngneat/spectator/commits?author=Steven-Harris" title="Documentation">📖</a></td>
    <td align="center"><a href="http://rjgunning.com"><img src="https://avatars2.githubusercontent.com/u/4697912?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Richard Sahrakorpi</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=RGunning" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kremerd"><img src="https://avatars2.githubusercontent.com/u/13023533?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dominik Kremer</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=kremerd" title="Code">💻</a></td>
    <td align="center"><a href="https://medium.com/@ozanturhan"><img src="https://avatars1.githubusercontent.com/u/5039606?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mehmet Ozan Turhan</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=ozanturhan" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/thunderer199"><img src="https://avatars2.githubusercontent.com/u/13765663?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vlad Lashko</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=thunderer199" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/williamjuan027"><img src="https://avatars0.githubusercontent.com/u/20136906?v=4?s=100" width="100px;" alt=""/><br /><sub><b>William Tjondrosuharto</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=williamjuan027" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/Cgatian"><img src="https://avatars0.githubusercontent.com/u/1752170?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chaz Gatian</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=cgatian" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/shirados90"><img src="https://avatars2.githubusercontent.com/u/27703381?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pavel Korobov</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=shirados90" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/EnnoLohmann"><img src="https://avatars3.githubusercontent.com/u/25953659?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Enno Lohmann</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=EnnoLohmann" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/bogusweb"><img src="https://avatars2.githubusercontent.com/u/5169399?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pawel Boguslawski</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=bogusweb" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/twittwer"><img src="https://avatars1.githubusercontent.com/u/8677948?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tobias Wittwer</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=twittwer" title="Code">💻</a> <a href="https://github.com/ngneat/spectator/commits?author=twittwer" title="Documentation">📖</a></td>
    <td align="center"><a href="http://matheo.co/"><img src="https://avatars.githubusercontent.com/u/260185?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mateo Tibaquirá</b></sub></a><br /><a href="https://github.com/ngneat/spectator/commits?author=matheo" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org/docs/en/emoji-key) specification. Contributions of any kind welcome!
