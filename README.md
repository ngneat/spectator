

[![Downloads](https://img.shields.io/npm/dt/@netbasal/spectator.svg?style=flat-square)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-16-orange.svg?style=flat-square)](#contributors)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://semaphoreci.com/api/v1/netanel7799/spectator/branches/master/badge.svg)](https://semaphoreci.com/netanel7799/spectator)

> Angular Tests Made Easy

# 😎 Spectator
Spectator helps you get rid of all the boilerplate grunt work, leaving you with readable, sleek and streamlined unit tests.

## Features
- ✅ Testing `ng-content`
- ✅ Custom Jasmine Matchers (toHaveClass, toBeDisabled..)
- ✅ Clean API for triggering keyboard/mouse/touch events
- ✅ Services testing support
- ✅ Routing testing support
- ✅ HTTP testing support
- ✅ Built-in support for entry components
- ✅ Built-in support for component's providers

#Table of Contents
TODO

## Installation
`ng add @netbasal/spectator`

## Testing Components
Create a component factory by using the `createTestComponentFactory()` function, passing the component class that you want to test.
The `createTestComponentFactory()` returns a function that will create a fresh component in each `it` block:

```ts
import { ButtonComponent } from './button.component';
import { Spectator, createTestComponentFactory } from '@netbasal/spectator';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createTestComponentFactory(ButtonComponent);
  
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

The `createTestComponentFactory` function can optionally take the following options which extends the basic Angular Testing Module options:

```ts
  const createComponent = createTestComponentFactory({
     component: ButtonComponent,
     imports: [],
     providers: [],
     declarations: [],
     entryComponents: [],
     componentProviders: [], // Override the component's providers 
     mocks: [], // Providers that will automatically mocked out
     detectChanges: false, // Defaults to true
     declareComponent: false, // Defaults to true
     disableAnimations: false, // Defaults to true
     shallow: true, // Defaults to false
  });
```

The `createComponent()` function optionally takes the following options:
```ts
  it('should set the title according to the [title] input', () => {
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

## Events API
Each one of the events can accept a `SpectatorElement` which can be one of the following: 
`type SpectatorElement = string | Element | DebugElement | ElementRef | Window | Document;`

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
#### Keyboard Helpers
```ts
spectator.keyboard.pressEnter();
spectator.keyboard.pressEscape();
spectator.keyboard.pressTab();
spectator.keyboard.pressBackspace();
spectator.keyboard.pressKey('a');
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
Note that each one of the above methods will also run `detectChanges()`.

### Queries
Spectator's API includes convenient methods for querying the DOM as part of a test: `query`, `queryAll`, `queryLast` , `queryHost` and `queryHostAll`. All query methods are polymorphic and allow you to query using any of the following techniques:

#### String selector:
 Pass a string selector (in the same style as you would when using jQuery or document.querySelector) to query for elements that match that path in the DOM. This method for querying is equivalent to Angular's By.css predicate. Note that native HTML elements will be returned. For example:
 ```ts
// Returns a single HTMLElement
spectator.query('div > ul.nav li:first-child');
// Returns an array of all matching HTMLElements
spectator.queryAll('div > ul.nav li');

spectator.query('app-child', { read: ChildServiceService });
```
 #### Type selector:
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
#### DOMSelector
Spectator allows you to query for elements using selectors inspired by [dom-testing-library](https://github.com/testing-library/dom-testing-library). The available selectors are:

```ts
spectator.query(byPlaceholder('Please enter your email address'));
spectator.query(byValue('By value'));
spectator.query(byTitle('By title'));
spectator.query(byAltText('By alt text'));
spectator.query(byLabel('By label'));
spectator.query(byText('By text'));
```

## Testing with Host
Testing a component with a host is a more elegant and powerful technique to test your component. It basically gives you the ability to write your tests in the same way that you write your code. Let's see it in action:

```ts
import { createHostComponentFactory } from '@netbasal/spectator';

describe('ZippyComponent', () => {
  let host: SpectatorWithHost<ZippyComponent>;

  const createHost = createHostComponentFactory(ZippyComponent);

  it('should display the title from host property', () => {
    host = createHost(`<zippy [title]="title"></zippy>`, {
      hostProps: {
        title: 'ZIPPY2'
      }
    });
    expect(host.query('.zippy__title')).toHaveText('ZIPPY2');
  });

  it('should display the "Close" word if open', () => {
      host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

      host.click('.zippy__title');

      expect(host.query('.arrow')).toHaveText('Close');
      expect(host.query('.arrow')).not.toHaveText('Open');
  });
});
```
The host method returns an instance of `SpectatorWithHost` which extends `Spectator` with the following additional API:
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
  let host: SpectatorWithHost<ZippyComponent, CustomHostComponent>;

  const createHost = createHostComponentFactory({
    component: ZippyComponent,
    host: CustomHostComponent
  });

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`);
    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent');
  });
});
```
## Testing Directives
Let's say we have the following directive:

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
  let host: SpectatorWithHost<HighlightDirective>;
  const createHost = createHostComponentFactory(HighlightDirective);

  beforeEach(() => {
    host = createHost(`<div highlight>Testing Highlight Directive</div>`);
  });

  it('should change the background color', () => {
    host.dispatchMouseEvent(host.element, 'mouseover');

    expect(host.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)'
    });

    host.dispatchMouseEvent(host.element, 'mouseout');
    expect(host.element).toHaveStyle({
      backgroundColor: '#fff'
    });
  });

  it('should get the instance', () => {
    const instance = host.query(HighlightDirective);
    expect(instance).toBeDefined();
  });
});
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

## Testing Services
When testing a service it’s often the case that we want to mock other services in its DI, as we focus on the service being tested. For example:
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
The following example shows how to test the `AuthService` with Spectator:
```ts
import { createService } from "@netbasal/spectator";

describe("AuthService", () => {
  const spectator = createService({
    service: AuthService,
    providers: [],
    entryComponents: [],
    mocks: [DateService]
  });

  it("should not be logged in", () => {
    let dateService = spectator.get<DateService>(DateService);
    dateService.isExpired.and.returnValue(true);
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });

  it("should be logged in", () => {
    let dateService = spectator.get<DateService>(DateService);
    dateService.isExpired.and.returnValue(false);
    expect(spectator.service.isLoggedIn()).toBeTruthy();
  });
});
```

#### Mock Services
Every service that we pass to the `mocks` property will be called with the `mockProvider()` function. The `mockProvider()` function converts each service method to a jasmine spy. (i.e `jasmine.createSpy()`). Here are some of the methods it exposes:
```ts
dateService.isExpired.and.callThrough();
dateService.isExpired.and.callFake(() => fake);
dateService.isExpired.and.throwError('Error');
dateService.isExpired.andCallFake(() => fake);
```
However, if you use Jest as test framework and you want to utilize its mocking mechanism instead, import the `mockProvider()` from `@netbasal/spectator/jest`. This will automatically use the `jest.fn()` function to create a Jest compatible mock instead.

The `createService()` function returns a plain object with the following properties:
- `service` - Get an instance of the service
- `get()` - A proxy for Angular `TestBed.get()`

`mockProvider()` doesn't include properties. In case you need to have properties on your mock you can use 2nd argument:
```ts
 const spectator = createService({
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

## Testing Angular's HTTP Client 
Spector makes testing data services, which use the Angular HTTP module, a lot easier. For example, let's say that you have data service with two methods, one performs a GET and one a POST:

```ts
export class TodosDataService {
  constructor(private http) {}

  get() {
    return this.http.get('todos');
  }

  post(id: number) {
    return this.http.post('todos', { id });
  }
}
```

The test for the above service should look like:
```ts
import { TodosDataService } from './todos-data.service';
import { createHTTPFactory, HTTPMethod } from '@netbasal/spectator';

describe('HttpClient testing', () => {
  let http = createHTTPFactory<TodosDataService>(TodosDataService);

  it('can test HttpClient.get', () => {
    let { dataService, controller, expectOne } = http();

    dataService.get().subscribe();
    expectOne('todos', HTTPMethod.GET);
  });

  it('can test HttpClient.post', () => {
    let { dataService, controller, expectOne } = http();

    dataService.post(1).subscribe();

    const req = expectOne('todos', HTTPMethod.POST);
    expect(req.request.body['id']).toEqual(1);
  });
});
```
We need to create an HTTP factory by using the `createHTTPFactory()` function, passing the data service that you want to test. The `createHTTPFactory()` returns a function which can be called to get an instance of SpectatorHTTP with the following properties:
- `controller` - A proxy for Angular `HttpTestingController`
- `httpClient` - A proxy for Angular `HttpClient`
- `dataService` - The data service instance
- `get()` - A proxy for Angular `TestBed.get()`
- `expectOne()` - Expect that a single request was made which matches the given URL and it's method, and return its mock request

## Routing Testing
TODO

## Jest Support
By default, Spectator uses Jasmine for creating spies. If you are using Jest as test framework instead, you can let Spectator create Jest-compatible spies.

Just import one of the following functions from `@netbasal/spectator/jest`(instead of @netbasal/spectator), and it will use Jest instead of Jasmine.
`createTestComponentFactory()`, `createHostComponentFactory()`, `createService()`, `createHTTPFactory()`, `mockProvider()`

```ts
import { AuthService } from './auth.service';
import { DateService } from './date.service';
import { createService } from '@netbasal/spectator/jest';

describe('AuthService', () => {
  const spectator = createService({
    service: AuthService,
    mocks: [DateService]
  });

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/638818?v=4" width="100px;"/><br /><sub><b>I. Sinai</b></sub>](https://github.com/theblushingcrow)<br />[📖](https://github.com/NetanelBasal/spectator/commits?author=theblushingcrow "Documentation") [👀](#review-theblushingcrow "Reviewed Pull Requests") [🎨](#design-theblushingcrow "Design") | [<img src="https://avatars3.githubusercontent.com/u/18645670?v=4" width="100px;"/><br /><sub><b>Valentin Buryakov</b></sub>](https://github.com/valburyakov)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=valburyakov "Code") [🤔](#ideas-valburyakov "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;"/><br /><sub><b>Netanel Basal</b></sub>](https://www.netbasal.com)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=NetanelBasal "Code") [🔧](#tool-NetanelBasal "Tools") | [<img src="https://avatars1.githubusercontent.com/u/260431?v=4" width="100px;"/><br /><sub><b>Ben Grynhaus</b></sub>](https://github.com/bengry)<br />[🐛](https://github.com/NetanelBasal/spectator/issues?q=author%3Abengry "Bug reports") [💻](https://github.com/NetanelBasal/spectator/commits?author=bengry "Code") | [<img src="https://avatars1.githubusercontent.com/u/4996462?v=4" width="100px;"/><br /><sub><b>Ben Elliott</b></sub>](http://benjaminelliott.co.uk)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=benelliott "Code") | [<img src="https://avatars2.githubusercontent.com/u/681176?v=4" width="100px;"/><br /><sub><b>Martin Nuc</b></sub>](http://www.nuc.cz)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=MartinNuc "Code") | [<img src="https://avatars2.githubusercontent.com/u/2102973?v=4" width="100px;"/><br /><sub><b>Dirk Luijk</b></sub>](https://github.com/dirkluijk)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=dirkluijk "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/6364586?v=4" width="100px;"/><br /><sub><b>Lars Gyrup Brink Nielsen</b></sub>](https://medium.com/@LayZeeDK)<br />[📦](#platform-LayZeeDK "Packaging/porting to new platform") [⚠️](https://github.com/NetanelBasal/spectator/commits?author=LayZeeDK "Tests") | [<img src="https://avatars0.githubusercontent.com/u/1910515?v=4" width="100px;"/><br /><sub><b>Andrew Grekov</b></sub>](https://github.com/thekiba)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=thekiba "Code") [🔧](#tool-thekiba "Tools") | [<img src="https://avatars1.githubusercontent.com/u/3968?v=4" width="100px;"/><br /><sub><b>Jeroen Zwartepoorte</b></sub>](http://twitter.com/jpzwarte)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=jpzwarte "Code") | [<img src="https://avatars1.githubusercontent.com/u/11634412?v=4" width="100px;"/><br /><sub><b>Oliver Schlegel</b></sub>](https://github.com/oschlegel)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=oschlegel "Code") | [<img src="https://avatars1.githubusercontent.com/u/10893959?v=4" width="100px;"/><br /><sub><b>Rex Ye</b></sub>](https://github.com/rexebin)<br />[🔧](#tool-rexebin "Tools") [💻](https://github.com/NetanelBasal/spectator/commits?author=rexebin "Code") | [<img src="https://avatars0.githubusercontent.com/u/36368505?v=4" width="100px;"/><br /><sub><b>tchmura</b></sub>](https://github.com/tchmura)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=tchmura "Code") | [<img src="https://avatars2.githubusercontent.com/u/4572798?v=4" width="100px;"/><br /><sub><b>Yoeri Nijs</b></sub>](http://www.theneuralnetwork.nl)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=YoeriNijs "Code") |
| [<img src="https://avatars1.githubusercontent.com/u/44014?v=4" width="100px;"/><br /><sub><b>Anders Skarby</b></sub>](https://github.com/askarby)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=askarby "Code") | [<img src="https://avatars3.githubusercontent.com/u/444278?v=4" width="100px;"/><br /><sub><b>Gregor Woiwode</b></sub>](https://medium.com/@gregor.woiwode)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=GregOnNet "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org/docs/en/emoji-key) specification. Contributions of any kind welcome!
