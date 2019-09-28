<p align="center">
 <img width="100%" height="100%" src="https://raw.githubusercontent.com/ngneat/spectator/master/image.svg?sanitize=true">
</p>

[![All Contributors](https://img.shields.io/badge/all_contributors-14-orange.svg?style=flat-square)](#contributors)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/ngneat/spectator.svg?branch=master)](https://travis-ci.org/ngneat/spectator)

> A Powerful Tool to Simplify Your Angular Tests

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

- [Installation](#installation)
- [Testing Components](#testing-components)
  - [Events API](#events-api)
  - [Keyboard helpers](#keyboard-helpers)
  - [Mouse helpers](#mouse-helpers)
  - [Queries](#queries)
    - [String Selector](#string-selector)
    - [Type Selector](#type-selector)
    - [DOM Selector](#dom-selector)
- [Testing with Host](#testing-with-host)
  - [Custom Host Component](#custom-host-component)
- [Testing with Routing](#testing-with-routing)
- [Testing Directives](#testing-directives)
- [Testing Services](#testing-services)
- [Mocking Providers](#mocking-providers)
- [Jest Support](#jest-support)
- [Testing with HTTP](#testing-with-http)
- [Global Injections](#global-injections)
- [Component Providers](#component-providers)
- [Custom Matchers](#custom-matchers)
- [Schematics](#schematics)

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
  mocks: [], // Providers that will automatically be mocked
  componentMocks: [], // Component providers that will automatically be mocked
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
- `get()` - Provides a wrapper for `TestBed.get()`:
```ts
const service = spectator.get(QueryService);

const fromComponentInjector = true;
const service = spectator.get(QueryService, fromComponentInjector);
```
- `detectChanges()` - Runs detectChanges on the tested element/host:
```ts
spectator.detectChanges();
```
- `setInput()` - Changes the value of an @Input() of the tested component:
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

### Events API
Each one of the events can accept a `SpectatorElement` which can be one of the following: 

```ts
type SpectatorElement = string | Element | DebugElement | ElementRef | Window | Document;
```

If not provided, the default element will be the host element of the component under test.

- `click()` - Triggers a click event:
```ts
spectator.click(SpectatorElement);
```
- `blur()` - Triggers a blur event:
```ts
spectator.blur(SpectatorElement);
```
- `focus()` - Triggers a focus event:
```ts
spectator.focus(SpectatorElement);
```
- `typeInElement()` - Simulating the user typing:
```ts
spectator.typeInElement(value, SpectatorElement);
```
- `dispatchMouseEvent()` - Triggers a mouse event:
```ts
spectator.dispatchMouseEvent(SpectatorElement, 'mouseout');
spectator.dispatchMouseEvent(SpectatorElement, 'mouseout'), x, y, event);
```
- `dispatchKeyboardEvent()` - Triggers a keyboard event:
```ts
spectator.dispatchKeyboardEvent(SpectatorElement, 'keyup', 'Escape');
```
- `dispatchTouchEvent()` - Triggers a touch event:
```ts
spectator.dispatchTouchEvent(SpectatorElement, type, x, y);
```

### Keyboard helpers
```ts
spectator.keyboard.pressEnter();
spectator.keyboard.pressEscape();
spectator.keyboard.pressTab();
spectator.keyboard.pressBackspace();
spectator.keyboard.pressKey('a');
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
    spectator.setParam('productId', '5');

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
  setRouteData(name: string, value: string): void;
  
  /**
   * Updates the route fragment and triggers a route navigation.
   */
  setRouteFragment(fragment: string | null): void;
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
    expect(spectator.get(Location).path()).toBe('/');

    // click on a router link
    spectator.click('.link-1');

    // don't forget to wait for promises to resolve...
    await spectator.fixture.whenStable();
    
    // test the new route by asserting the location
    expect(spectator.get(Location).path()).toBe('/foo');
  });
});
```

### Routing Options

The `createRoutesFactory` function can take the following options, on top of the default Spectator options:

* `params`: initial params to use in `ActivatedRoute` stub
* `queryParams`: initial query params to use in `ActivatedRoute` stub
* `data`: initial data to use in `ActivatedRoute` stub
* `fragment`: initial fragment to use in `ActivatedRoute` stub
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
- `get()` - A proxy for Angular `TestBed.get()`

### Additional Options

It's also possible to pass an object with options. For example, when testing a service 
you often want to mock its dependencies, as we focus on the service being tested.

For example:
```ts
@Injectable()
export class AuthService {
  constructor( private dateService: DateService  {}

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
    const dateService = spectator.get(DateService);
    dateService.isExpired.and.returnValue(false);

    expect(spectator.service.isLoggedIn()).toBeTruthy();
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

## Jest Support
By default, Spectator uses Jasmine for creating spies. If you are using Jest as test framework instead, you can let Spectator create Jest-compatible spies.

Just import one of the following functions from `@ngneat/spectator/jest`(instead of @ngneat/spectator), and it will use Jest instead of Jasmine.
`createComponentFactory()`, `createHostFactory()`, `createServiceFactory()`, `createHttpFactory()`, `mockProvider()`

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
    const dateService = spectator.get<DateService>(DateService);
    dateService.isExpired.mockReturnValue(true);
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });

  it('should be logged in', () => {
    const dateService = spectator.get<DateService>(DateService);
    dateService.isExpired.mockReturnValue(false);
    expect(spectator.service.isLoggedIn()).toBeTruthy();
  });
});
```

## Testing with HTTP 
Spectator makes testing data services, which use the Angular HTTP module, a lot easier. For example, let's say that you have service with two methods, one performs a GET and one a POST:

```ts
export class TodosDataService {
  constructor(private httpClient: HttpClient) {}

  getTodos() {
    return this.httpClient.get('api/todos');
  }

  postTodo(id: number) {
    return this.httpClient.post('api/todos', { id });
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
});
```
We need to create an HTTP factory by using the `createHttpFactory()` function, passing the service that you want to test. The `createHttpFactory()` returns a function which can be called to get an instance of SpectatorHttp with the following properties:
- `controller` - A proxy for Angular `HttpTestingController`
- `httpClient` - A proxy for Angular `HttpClient`
- `service` - The service instance
- `get()` - A proxy for Angular `TestBed.get()`
- `expectOne()` - Expect that a single request was made which matches the given URL and it's method, and return its mock request

## Global Injections
It's possible to define injections which will be available for each test without the need to re-declare them in each test:
```ts
// test.ts
import { defineGlobalsInjections } from '@ngneat/spectator';
import { TranslocoModule } from '@ngneat/tranlsoco';

defineGlobalsInjections({
  imports: [TranslocoModule],
});
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
spectator.get(FooService, true)
```

## Custom Matchers
```ts
expect('.zippy__content').not.toExist();
expect('.zippy__content').toHaveLength(3);
expect('.zippy__content').toHaveId('id');
expect('.zippy__content').toHaveClass('class');
expect('.zippy__content').toHaveClass('class a, class b');
expect(spectator.query('.zippy')).toHaveAttribute('id', 'zippy');
expect(spectator.query('.checkbox')).toHaveProperty('checked', true);
expect('.zippy__content').toHaveText('Content');
expect('.zippy__content').toHaveText((text) => text.includes('..'));
expect('.zippy__content').toHaveValue('value');
expect(spectator.element).toHaveStyle({backgroundColor: 'rgba(0, 0, 0, 0.1)'});
expect('.zippy__content').toHaveData({data: 'role', val: 'admin'});
expect('.checkbox').toBeChecked();
expect('.button').toBeDisabled();
expect('div').toBeEmpty();
expect('div').toBeHidden();
expect('element').toBeSelected();
expect('element').toBeVisible();
expect('input').toBeFocused();
expect('div').toBeMatchedBy('.js-something');
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

The `spectator` schematics extend the default `@schematics/angular` collection. If you want to set defaults for schematics such as generating components with scss file, you must change the schematics package name from `@schematics/angular` to `@netbasal/spectator` in `angular.json`:

```json
"schematics": {
  "@ngneat/spectator:component": {
    "styleext": "scss"
  }
}
```

## Core Team

<table>
  <tr>
    <td align="center"><a href="https://www.netbasal.com"><img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;" alt="Netanel Basal"/><br /><sub><b>Netanel Basal</b></sub></a></td>
    <td align="center"><a href="https://github.com/dirkluijk"><img src="https://avatars2.githubusercontent.com/u/2102973?v=4" width="100px;" alt="Dirk Luijk"/><br /><sub><b>Dirk Luijk</b></sub></a></td>
    <td align="center"><a href="http://benjaminelliott.co.uk"><img src="https://avatars1.githubusercontent.com/u/4996462?v=4" width="100px;" alt="Ben Elliott"/><br /><sub><b>Ben Elliott</b></sub></a></td>
    </tr>
</table>

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/638818?v=4" width="100px;"/><br /><sub><b>I. Sinai</b></sub>](https://github.com/theblushingcrow)<br />[📖](https://github.com/ngneat/spectator/commits?author=theblushingcrow "Documentation") [👀](#review-theblushingcrow "Reviewed Pull Requests") [🎨](#design-theblushingcrow "Design") | [<img src="https://avatars3.githubusercontent.com/u/18645670?v=4" width="100px;"/><br /><sub><b>Valentin Buryakov</b></sub>](https://github.com/valburyakov)<br />[💻](https://github.com/ngneat/spectator/commits?author=valburyakov "Code") [🤔](#ideas-valburyakov "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/260431?v=4" width="100px;"/><br /><sub><b>Ben Grynhaus</b></sub>](https://github.com/bengry)<br />[🐛](https://github.com/ngneat/spectator/issues?q=author%3Abengry "Bug reports") [💻](https://github.com/ngneat/spectator/commits?author=bengry "Code") | [<img src="https://avatars2.githubusercontent.com/u/681176?v=4" width="100px;"/><br /><sub><b>Martin Nuc</b></sub>](http://www.nuc.cz)<br />[💻](https://github.com/ngneat/spectator/commits?author=MartinNuc "Code") | [<img src="https://avatars1.githubusercontent.com/u/6364586?v=4" width="100px;"/><br /><sub><b>Lars Gyrup Brink Nielsen</b></sub>](https://medium.com/@LayZeeDK)<br />[📦](#platform-LayZeeDK "Packaging/porting to new platform") [⚠️](https://github.com/ngneat/spectator/commits?author=LayZeeDK "Tests") | [<img src="https://avatars0.githubusercontent.com/u/1910515?v=4" width="100px;"/><br /><sub><b>Andrew Grekov</b></sub>](https://github.com/thekiba)<br />[💻](https://github.com/ngneat/spectator/commits?author=thekiba "Code") [🔧](#tool-thekiba "Tools") | [<img src="https://avatars1.githubusercontent.com/u/3968?v=4" width="100px;"/><br /><sub><b>Jeroen Zwartepoorte</b></sub>](http://twitter.com/jpzwarte)<br />[💻](https://github.com/ngneat/spectator/commits?author=jpzwarte "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/11634412?v=4" width="100px;"/><br /><sub><b>Oliver Schlegel</b></sub>](https://github.com/oschlegel)<br />[💻](https://github.com/ngneat/spectator/commits?author=oschlegel "Code") | [<img src="https://avatars1.githubusercontent.com/u/10893959?v=4" width="100px;"/><br /><sub><b>Rex Ye</b></sub>](https://github.com/rexebin)<br />[🔧](#tool-rexebin "Tools") [💻](https://github.com/ngneat/spectator/commits?author=rexebin "Code") | [<img src="https://avatars0.githubusercontent.com/u/36368505?v=4" width="100px;"/><br /><sub><b>tchmura</b></sub>](https://github.com/tchmura)<br />[💻](https://github.com/ngneat/spectator/commits?author=tchmura "Code") | [<img src="https://avatars2.githubusercontent.com/u/4572798?v=4" width="100px;"/><br /><sub><b>Yoeri Nijs</b></sub>](http://www.theneuralnetwork.nl)<br />[💻](https://github.com/ngneat/spectator/commits?author=YoeriNijs "Code") | [<img src="https://avatars1.githubusercontent.com/u/44014?v=4" width="100px;"/><br /><sub><b>Anders Skarby</b></sub>](https://github.com/askarby)<br />[💻](https://github.com/ngneat/spectator/commits?author=askarby "Code") | [<img src="https://avatars3.githubusercontent.com/u/444278?v=4" width="100px;"/><br /><sub><b>Gregor Woiwode</b></sub>](https://medium.com/@gregor.woiwode)<br />[💻](https://github.com/ngneat/spectator/commits?author=GregOnNet "Code") | [<img src="https://avatars2.githubusercontent.com/u/10629571?v=4" width="100px;"/><br /><sub><b>Alexander Sheremetev</b></sub>](https://github.com/asheremetev)<br />[🐛](https://github.com/ngneat/spectator/issues?q=author%3Aasheremetev "Bug reports") [💻](https://github.com/ngneat/spectator/commits?author=asheremetev "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org/docs/en/emoji-key) specification. Contributions of any kind welcome!
