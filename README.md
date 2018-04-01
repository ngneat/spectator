<p align="center">
 <img width="640" height="264" src="https://preview.ibb.co/ef2RUn/01_righteous_clear.png">
</p>

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://semaphoreci.com/api/v1/netanel7799/spectator/branches/master/badge.svg)](https://semaphoreci.com/netanel7799/spectator)

> Angular Tests Made Easy

# 😎 Spectator 
Spectator is written on top of the Angular Testing Framework and provides two things:

- A cleaner API for testing.
- A set of custom matchers that will help you to test DOM elements more easily.

## 🤔 Why
Writing tests for our code is part of our daily routine. When working on large applications with many components, it can take up a lot of time and effort.
Although Angular provides us with great tools to deal with these things, it still requires quite **a lot of boilerplate work**.
For this reason, I decided to create a library that will make it easier for us to write tests by cutting down on the boilerplate and adding custom Jasmine matchers.

## Installation
#### NPM
To install spectator via NPM run: 

```npm install @netbasal/spectator --save-dev```
#### Yarn
To install spectator via Yarn run: 

```yarn add @netbasal/spectator --dev```

## Table of Contents
-  [Testing Components](#testing-components)
-  [Testing Components with Host](#testing-components-with-host)
-  [Testing Components with Custom Host Component](#testing-components-with-custom-host-component)
-  [Testing Directives](#testing-directives)
-  [Testing Services](#testing-services)
-  [Testing Services with Mocks](#testing-services-with-mocks)
-  [Typed Mocks](#typed-mocks)
-  [Testing Data Services](#testing-data-services)

## Testing Components
```ts
// button.component.ts

@Component({
  selector: 'app-button',
  template: `
    <button class="{{className}}" (click)="onClick($event)">{{title}}</button>
  `
})
export class ButtonComponent {
  @Input() className = 'success';
  @Input() title = '';
  @Output() click = new EventEmitter();

  onClick( $event ) {
    this.click.emit($event);
  }
}

// button.component.spec.ts

import { ButtonComponent } from './button.component';
import { Spectator, createTestComponentFactory } from '@netbasal/spectator';

describe('ButtonComponent', () => {

  let spectator: Spectator<ButtonComponent>;
  const createComponent = createTestComponentFactory(ButtonComponent);

  it('should set the "success" class by default', () => {
    spectator = createComponent();
    expect(spectator.query('button')).toHaveClass('success');
  });

  it('should set the class name according to the [className]', () => {
    spectator = createComponent({ className: 'danger' });

    expect(spectator.query('button')).toHaveClass('danger');
    expect(spectator.query('button')).not.toHaveClass('success');
  });

  it('should set the title according to the [title]', () => {
    spectator = createComponent({ 'title': 'Click' });

    expect(spectator.query('button')).toHaveText('Click');
  });

  it('should emit the $event on click', () => {
    const detectChanges = false;
    spectator = createComponent({}, detectChanges);
    let output;
    spectator.output<{ type: string }>('click').subscribe(result => output = result);

    spectator.component.onClick({ type: 'click' });
    spectator.detectChanges();
    expect(output).toEqual({ type: 'click' });
  });
});
```

## Testing Components with host
```ts
// zippy.component.ts

@Component({
  selector: 'zippy',
  template: `
    <div class="zippy">
      <div (click)="toggle()" class="zippy__title">
        <span class="arrow">{{ visible ? 'Close' : 'Open' }}</span> {{title}}
      </div>
      <div *ngIf="visible" class="zippy__content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ZippyComponent {

  @Input() title;
  visible = false;

  toggle() {
    this.visible = !this.visible;
  }
}

// zippy.component.spec.ts
import { ZippyComponent } from './zippy.component';
import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator';
import { Component } from '@angular/core';

describe('ZippyComponent', () => {
  let host: SpectatorWithHost<ZippyComponent>;

  const createHost = createHostComponentFactory(ZippyComponent);

  it('should display the title', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    expect(host.query('.zippy__title')).toHaveText(( text ) => 'Zippy title');
  });

  it('should have attribute', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

    expect(host.query('.zippy')).toHaveAttr({ attr: 'id', val: 'zippy' });
  });

  it('should be checked', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

    expect(host.query('.checkbox')).toHaveProp({ prop: 'checked', val: true });
  });

  it('should display the content', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

    host.click('.zippy__title');

    expect(host.query('.zippy__content')).toHaveText('Zippy content');
  });

  it('should display the "Open" word if closed', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

    expect(host.query('.arrow')).toHaveText('Open');
    expect(host.query('.arrow')).not.toHaveText('Close');
  });

  it('should display the "Close" word if open', () => {
      host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

      host.click('.zippy__title');

      expect(host.query('.arrow')).toHaveText('Close');
      expect(host.query('.arrow')).not.toHaveText('Open');
    }
  );

  it('should be closed by default', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    expect('.zippy__content').not.toExist();
  });

  it('should toggle the content', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    host.click('.zippy__title');
    expect(host.query('.zippy__content')).toExist();

    host.click('.zippy__title');
    expect('.zippy__content').not.toExist();
  });

});
```

## Testing Components with custom host component
```ts
@Component({ selector: 'custom-host', template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent';
}

describe('With Custom Host Component', function () {
  let host: SpectatorWithHost<ZippyComponent, CustomHostComponent>;

  const createHost = createHostComponentFactory({ component: ZippyComponent, host: CustomHostComponent });

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`);

    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent');
  });
});

```

## Testing Directives
```ts
@Directive({
  selector: '[highlight]'
})
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

```ts
import { HighlightDirective } from './highlight.directive';
import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator';

describe('HighlightDirective', function () {
  let host: SpectatorWithHost<HighlightDirective>;

  const createHost = createHostComponentFactory(HighlightDirective);

  it('should change the background color', () => {
    host = createHost(`<div highlight>Testing HighlightDirective</div>`);

    host.dispatchMouseEvent(host.element, 'mouseover');

    expect(host.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)'
    });

    host.dispatchMouseEvent(host.element, 'mouseout');
    expect(host.element).toHaveStyle({
      backgroundColor: '#fff'
    });
  });

});

```

## Testing Services
```ts
import { CounterService } from './counter.service';
import { createService } from '@netbasal/spectator';
 
describe('CounterService Without Mock', () => {
  const spectator = createService(service: CounterService);
 
  it('should be 0', () => {
    expect(spectator.service.counter).toEqual(0);
  });
});
```

## Testing Services with mocks
```ts
import { CounterService } from './counter.service';
import { createService } from '@netbasal/spectator';

describe('TodosService', () => {
  const spectator = createService({ service: TodosService, mocks: [OtherService] });

  it('should', () => {
    let otherService = spectator.get<OtherService>(OtherService);
    otherService.someMethod.andReturn(customValue);
    otherService.someMethod.and.callThrough();
    otherService.someMethod.and.callFake(() => fake);
    otherService.someMethod.and.throwError('Error');
    otherService.someMethod.andCallFake(() => fake);
    spectator.service.remove();
    expect(spectator.service.someProp).toBeTruthy();
  });
});
```

## Typed Mocks
```ts
import { SpyObject, mockProvider } from '@netbasal/spectator';
 
 let otherService: SpyObject<OtherService>;
 let service: TestedService;
 
 beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestedService,
        mockProvider(OtherService)
      ],
    });
 
    otherService = TestBed.get(OtherService);
    service = TestBed.get(GoogleBooksService);
  });
  
  it('should be 0', () => {
    otherService.method.andReturn('mocked value'); // mock is strongly typed
  
   // then test serivce 
  });
```

## Testing Data Services
```ts
import { TodosDataService } from './todos-data.service';
import { createHTTPFactory, HTTPMethod } from '@netbasal/spectator';

describe('HttpClient testing', () => {
  let http = createHTTPFactory<TodosDataService>(TodosDataService);

  it('can test HttpClient.get', () => {
    let { dataService, controller, expectOne } = http();

    dataService.get().subscribe();
    expectOne('url', HTTPMethod.GET);
  });

  it('can test HttpClient.post', () => {
    let { dataService, controller, expectOne } = http();

    dataService.post(1).subscribe();

    const req = expectOne('url', HTTPMethod.POST);
    expect(req.request.body['id']).toEqual(1);

  });
});

```

## API
 - `createTestComponentFactory<T>(options: SpectatorOptions<T> | Type<T>): (componentParameters?: Partial<T>, detectChanges?: boolean) => Spectator<T>`
 - `createHostComponentFactory<T, H = HostComponent>(options: SpectatorOptions<T, H> | Type<T>): (template: string, detectChanges?: boolean) => SpectatorWithHost<T, H>`
 - `createService<S>(options: Params<S> | Type<S>): SpectatorService<S>`
 - `createHTTPFactory<T>(dataService: Type<T>, providers = [])`
 - `mockProvider<T>(type: Type<T>): Provider`
 
### Spectator Methods
- `detectChanges()`
  - Runs detectChanges on the tested element/host
- `query(selector: string) : HTMLElement`
  - Returns the first element that is a descendant of the element on which it is invoked that matches the specified group of selectors
- `queryAll(selector: string) : NodeList`
  - Returns a static NodeList representing a list of elements matching the specified group of selectors which are descendants of the element on which the method was called
- `setInput(input : object | string, inputValue? : any)`
  - Changes the value of an @Input() of the tested component
- `whenOutput<T>( output : string) : Observable`
  - Returns an Observable @Output() of the tested component
- `get<T>(type: Type<T> | InjectionToken<T>): T`
 	- Provides a wrapper for TestBed.get()
- `click(selector: string)`
  - Triggers a click event
- `dispatchMouseEvent(node: Node, type: string, x = 0, y = 0, event = createMouseEvent(type, x, y)): MouseEvent`
  - Triggers a mouse event
 - `dispatchKeyboardEvent(node: Node, type: string, keyCode: number, target?: Element): KeyboardEvent`
   - Triggers a keyboard event
 - `dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event`
   - Triggers any event
- `dispatchTouchEvent(node: Node, type: string, x = 0, y = 0)`
   - Triggers a touch event   
-  `typeInElement(value: string, element: HTMLInputElement)`
  	- Sets focus on the input element, sets its value and dispatches the `input` event, simulating the user typing.
- `patchElementFocus(element: HTMLElement)`
  - Patches an elements focus and blur methods to emit events consistently and predictably
   

### Spectator Properties
- `fixture` - The tested component's fixture
- `component` - The tested component's instance
- `element` - The tested component's native element
- `debugElement` - The tested fixture's debug element

### Spectator with Host Properties
- `hostFixture` - The host's fixture
- `hostComponent` - The host's component instance 
- `hostElement` - The host's native element
- `hostDebugElement` - The host's fixture debug element
- `component` - The tested component's instance
- `element` - The tested component's native element
- `debugElement` - The tested component's debug element

## Matchers
- `toExist()`
  - e.g. `expect('.zippy__content').not.toExist();`
- `toHaveLength()`
  - e.g. `expect('.zippy__content').toHaveLength(3);`
- `toHaveId()`
  - e.g. `expect('.zippy__content').toHaveId('ID')`
- `toHaveClass(class)`
    - e.g. `expect('.zippy__content').toHaveClass('class');`
    - e.g. `expect('.zippy__content').toHaveClass('class a, class b');`
- `toHaveAttr({attr, val})`
  - e.g. `expect(host.query('.zippy')).toHaveAttr({ attr: 'id', val: 'zippy' });`
- `toHaveProp({prop, val})`
  - e.g. `expect(host.query('.checkbox')).toHaveProp({ prop: 'checked', val: true });`
- `toHaveText(text)`
  - e.g. `expect('.zippy__content').toHaveText('Content');`
  - e.g. `expect('.zippy__content').toHaveText((text) => text.includes('..')`
- `toHaveValue(value)`
  - e.g. `expect('.zippy__content').toHaveValue('value');`
- `toHaveStyle(value)`
  - e.g. `expect(host.element).toHaveStyle({
           backgroundColor: ‘rgba(0, 0, 0, 0.1)’
          });`
- `toHaveData({data, val})`
  - e.g. `expect('.zippy__content').toHaveData({data: 'role', val: 'admin'});`
- `toBeChecked()`
  - e.g. `expect('.checkbox').toBeDisabled();`
- `toBeDisabled()`
  - e.g. `expect('.button').toBeDisabled();`
- `toBeEmpty()`
  - e.g. `expect('div').toBeEmpty();`
- `toBeEmpty()`
  - e.g. `expect('div').toBeEmpty();`
- `toBeHidden()`
  - e.g. `expect('div').toBeHidden();`
- `toBeSelected()`
  - e.g. `expect('element').toBeSelected();`
- `toBeVisible()`
  - e.g. `expect('element').toBeVisible();`
- `toBeFocused()`
  - e.g. `expect('input').toBeFocused();`
- `toBeMatchedBy(selector)`
  - e.g. `expect('div').toBeMatchedBy('.js-something')`
- `toHaveDescendant(selector)`
  - e.g. `expect('div').toHaveDescendant('.child')`
- `toHaveDescendantWithText({selector, text})`
  - e.g. `expect('div').toHaveDescendantWithText({selector: '.child', text: 'text'})`
## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/638818?v=4" width="100px;"/><br /><sub><b>I. Sinai</b></sub>](https://github.com/theblushingcrow)<br />[📖](https://github.com/NetanelBasal/spectator/commits?author=theblushingcrow "Documentation") [👀](#review-theblushingcrow "Reviewed Pull Requests") [🎨](#design-theblushingcrow "Design") | [<img src="https://avatars3.githubusercontent.com/u/18645670?v=4" width="100px;"/><br /><sub><b>Valentin Buryakov</b></sub>](https://github.com/valburyakov)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=valburyakov "Code") [🤔](#ideas-valburyakov "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;"/><br /><sub><b>Netanel Basal</b></sub>](https://www.netbasal.com)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=NetanelBasal "Code") [🔧](#tool-NetanelBasal "Tools") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
