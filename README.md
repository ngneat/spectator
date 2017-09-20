[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

# ngx-easy-test
ngx-easy-test provides two extensions for Angular 4 Testing Framework:

- a cleaner API for testing
- a set of custom matchers

## Note
Currently, it only supports Angular 4+ and Jasmine. 

## Introduction
Writing tests for our code is part of our daily routine. When working on large applications with many components, it can take time and effort.
Although Angular provides us with great tools to deal with these things, it still requires quite a lot of boilerplate work.
For this reason, I decided to create a library that will make it easier for us to write tests by cutting the boilerplate and add custom Jasmine matchers. 

## Installation
Using npm by running ```npm install ngx-easy-test --save-dev```

Using yarn by running ```yarn add ngx-easy-test --dev```


## Example
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
```
```ts
// zippy.component.spec.ts

import { createHost, EasyTestWithHost } from 'ngx-easy-test';

describe('ZippyComponent', () => {
  type Context = EasyTestWithHost<ZippyComponent>;

  createHost(ZippyComponent);

  it('should display the title', function ( this : Context ) {
    this.create(`<zippy title="Zippy title"></zippy>`);
    expect(this.query('.zippy__title')).toContainText('Zippy title');
  });

  it('should display the content', function ( this : Context ) {
    this.create(`<zippy title="Zippy title">Zippy content</zippy>`);
    this.trigger('click', '.zippy__title');
    expect(this.query('.zippy__content')).toContainText('Zippy content');
  });

  it('should display the "Open" word if closed', function ( this : Context ) {
    this.create(`<zippy title="Zippy title">Zippy content</zippy>`);
    expect(this.query('.arrow')).toContainText('Open');
    expect(this.query('.arrow')).not.toContainText('Close');
  });

  it('should display the "Close" word if open', function ( this : Context ) {
    this.create(`<zippy title="Zippy title">Zippy content</zippy>`);
    this.trigger('click', '.zippy__title');
    expect(this.query('.arrow')).toContainText('Close');
    expect(this.query('.arrow')).not.toContainText('Open');
  });

  it('should be closed by default', function ( this : Context ) {
    this.create(`<zippy title="Zippy title"></zippy>`);
    expect('.zippy__content').not.toBeInDOM();
  });

  it('should toggle the content', function ( this : Context ) {
    this.create(`<zippy title="Zippy title"></zippy>`);
    this.trigger('click', '.zippy__title');
    expect('.zippy__content').toBeInDOM();
    this.trigger('click', '.zippy__title');
    expect('.zippy__content').not.toBeInDOM();
  });

});
```

## Without Host
```ts
// button.component.ts

@Component({
  selector: 'app-button',
  template: `
    <button class="{{className}}" (click)="onClick($event)">{{title}}</button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() className = 'success';
  @Input() title = '';
  @Output() click = new EventEmitter();

  onClick( $event ) {
    this.click.emit($event);
  }
}
```

```ts
// button.component.spec.ts


import { ButtonComponent } from './button.component';
import { EasyTest, easyTest } from 'ngx-easy-test';

describe('ButtonComponent', () => {

  type Context = EasyTest<ButtonComponent>;

  easyTest(ButtonComponent);

  it('should set the "success" class by default', function ( this : Context ) {
    expect(this.query('button')).toHaveClass('success');
  });

  it('should set the class name according to the [className]', function ( this : Context ) {
    this.whenInput({ className: 'danger' });
    expect(this.query('button')).toHaveClass('danger');
    expect(this.query('button')).not.toHaveClass('success');
  });

  it('should set the title according to the [title]', function ( this : Context ) {
    this.whenInput('title', 'Click');
    expect(this.query('button')).toContainText('Click');
  });

  it('should emit the $event on click', function ( this : Context ) {
    let output;
    this.whenOutput<{ type: string }>('click', result => output = result);
    this.trigger('click', 'button', { type: 'click' });
    expect(output).toEqual({ type: 'click' });
  });

});
```

## With Custom Host Component
```ts
@Component({ selector: 'custom-host', template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent';
}
describe('With Custom Host Component', function () {
  type Context = EasyTestWithHost<AlertComponent, CustomHostComponent>;

  createHost(AlertComponent, CustomHostComponent);

  it('should display the host component title', function ( this : Context ) {
    const fixture = this.create(`<app-alert [title]="title"></app-alert>`);
    expect(this.query('.alert')).toContainText('Custom HostComponent');
  });
});
```

## Testing Services
```ts
import { CounterService } from './counter.service';
import { EasyTestService, testService } from './ngx-easy-test';

describe('CounterService Without Mock', () => {
  type Context = EasyTestService<CounterService>;

  testService<CounterService>(CounterService);

  it('should be 0', function ( this : Context ) {
    expect(this.service.counter).toEqual(0);
  });
});

class MockCounterService {
  counter = 2
}

describe('CounterService With Mock', () => {
  type Context = EasyTestService<MockCounterService>;

  testService<CounterService, MockCounterService>(CounterService, MockCounterService);

  it('should be 2', function ( this : Context ) {
    expect(this.service.counter).toEqual(2);
  });
});
```

## API
 - `easyTest<T>( testedType : Type<T>, moduleMetadata? : TestModuleMetadata )`
 - `createHost<T, H>( testedType : Type<T>, hostType?, moduleMetadata? : TestModuleMetadata )`
 - `testService<S, M = null>( service : Type<S>, mock? : Type<M> )`
### Methods
- `detectChanges()`
  - Run detect changes on the tested element/host
- `query(selector: string)`
  - Query a DOM element from the tested element
- `queryAll(selector: string)`
  - Query a DOM elements from the tested element
- `whenInput(input : object | string, inputValue? : any)`
  - Change an @Input() of the tested component
- `whenOutput<T>( output : string, cb : ( result : T ) => any )`
  - Listen for an @Output() of the tested component and get the result
- `trigger<T>( event : string, selector : string, eventObj = null  )`
  - Trigger an event on the selector element

### Properties
- `tested` - The fixture debug element
- `testedComponent` - The tested component instance
- `testedElement` - The host native element. The component is rendered inside the host.
- `hostComponent` - The host component instance (Available only when using `createHost`)
- `hostFixture` - The host fixture (Available only when using `createHost`)

## Matchers
- `toBeChecked()`
  - Only for tags that have checked attribute
  - e.g. `expect(this.query('input[type="checkbox"]')).toBeChecked();`
- `toBeDisabled()`
  - e.g. `expect(this.query('.radio')).toBeDisabled();`
- `toBeInDOM()`
  - Checks to see if the matched element is attached to the DOM
  - e.g. `expect(this.query('.ngIf')).toBeInDOM()`
- `toHaveAttr({attr, val})`
    - e.g. `expect(this.testedElement).toHaveAttr({
                                          attr: 'role',
                                          val: 'newRole'
    });`
- `toHaveClass(className)`
  - e.g. `expect(this.query('.alert')).toHaveClass('danger');`
- `toHaveStyle(style)`
  - e.g. `expect(this.query('.alert')).toHaveStyle({ height: '200px' });`
  - **Note: Colors only works with rgb(a) and hex (six numbers) values**
- `toContainText(text)`
  - e.g. `expect(this.query('.alert')).toContainText('Text');`
- `toHaveValue(value)`
  - only for elements on which `val` can be called (`input`, `textarea`, etc)
  - e.g. `expect(this.query('.input')).toHaveValue('Value!!');`
