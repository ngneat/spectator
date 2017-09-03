# ngx-easy-test [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)
ngx-easy-test provides two extensions for Angular 4 Testing Framework:

- a cleaner API for testing
- a set of custom matchers

## Note
Currently, it only supports Angular 4+ and jasmine. 

## Installation
Using npm by running ```npm install ngx-easy-test --save-dev```

Using yarn by running ```yarn add ngx-easy-test --dev```


## Example
```ts
// alert.component.ts

@Component({
  selector: 'app-alert',
  template: `
    <div class="{{type}} alert" [ngStyle]="style">
      {{title}}
    </div>
    <p class="ngIf" *ngIf="show">Toggle element</p>
    <button (click)="click()" class="title-changer">Change title</button>
    <button (click)="toggle()" class="toggle">Toggle element</button>
    <button class="height-changer" (click)="changeHeight()">Change height</button>
    <button class="changeRole" (click)="role = 'newRole'">Change role</button>
    <input type="checkbox" [checked]="checked" (change)="checked = !checked"/>
    <input type="radio" disabled="true" class="radio">
    <input type="text" value="Value!!" class="input">
  `,
  styles: [`p {
    height: 100px;
  }`]
})
export class AlertComponent {
  @HostBinding('attr.role') role = 'role';
  @Input() title = 'Alert Works!';
  @Input() type = 'success';
  @Output() clicked = new EventEmitter();
  checked = true;
  show = true;
  style = {
    height: '100px'
  }

  toggle() {
    this.show = !this.show;
  }

  click() {
    this.title = 'Title after clicked';
    this.clicked.emit(this.title);
  }

  changeHeight() {
    this.style.height = '200px';
  }
}

```

```ts
// alert.component.spec.ts

describe('AlertComponent', () => {
  type Context = EasyTest<AlertComponent>;

  easyTest(AlertComponent);

  it('should display the default text', function ( this : Context ) {
    expect(this.query('.alert')).toContainText('Alert Works!');
  });

  it('change the text when we change the @Input()', function ( this : Context ) {
    this.whenInput({
      title: 'Wow!'
    });
    expect(this.query('.alert')).toContainText('Wow!');
  });

  it('should have a success class by default', function ( this : Context ) {
    expect(this.query('.alert')).toHaveClass('success');
  });

  it('change the class when we change the @Input()', function ( this : Context ) {
    this.whenInput('type', 'danger');
    expect(this.query('.alert')).toHaveClass('danger');
  });

  it('should change the title on @click', function ( this : Context ) {
    this.trigger('click', '.title-changer');
    expect(this.query('.alert')).toContainText('Title after clicked');
  });

  it('should emit the new title on @click', function ( this : Context ) {
    let output;
    this.whenOutput<string>('clicked', result => output = result);
    this.trigger('click', '.title-changer');
    expect(output).toBe('Title after clicked');
  });

  it('should change the height on @click', function ( this : Context ) {
    this.trigger('click', '.height-changer');
    expect(this.query('.alert')).toHaveStyle({ height: '200px' });
  });

  it('should be in the DOM', function ( this : Context ) {
    expect('.ngIf').toBeInDOM();
  });

  it('should toggle on @cilck', function ( this : Context ) {
    this.trigger('click', '.toggle');
    expect('.ngIf').not.toBeInDOM();
    this.trigger('click', '.toggle');
    expect(this.query('.ngIf')).toBeInDOM();
  });

  it('should be checked by default', function ( this : Context ) {
    expect(this.query('input[type="checkbox"]')).toBeChecked();
  });

  it('should not be checked on @click', function ( this : Context ) {
    this.trigger('change', 'input[type="checkbox"]');
    expect(this.query('input[type="checkbox"]')).not.toBeChecked();
  });

  it('should be disabled', function ( this : Context ) {
    expect(this.query('.radio')).toBeDisabled();
  });

  it('should have the correct value', function ( this : Context ) {
    expect(this.query('.input')).toHaveValue('Value!!');
  });

  it('should change the role on @click', function ( this : Context ) {
    this.trigger('click', '.changeRole');
    expect(this.testedElement).toHaveAttr({
      attr: 'role',
      val: 'newRole'
    });
  });

});
```
## With Host Component
```ts
describe('With Host Component', function () {
  type Context = EasyTestWithHost<AlertComponent>;

  createHost(AlertComponent);

  it('should display the default text', function ( this : Context ) {
    const fixture = this.create(`<app-alert></app-alert>`);
    expect(this.query('.alert')).toContainText('Alert Works!');
  });

  it('change the text when we change the @Input()', function ( this : Context ) {
    const fixture = this.create(`<app-alert title="Wow!"></app-alert>`);
    expect(this.query('.alert')).toContainText('Wow!');
  });

  it('change the class when we change the @Input()', function ( this : Context ) {
    const fixture = this.create(`<app-alert type="danger"></app-alert>`);
    expect(this.query('.alert')).toHaveClass('danger');
  });

  it('should change the height on @click', function ( this : Context ) {
    const fixture = this.create(`<app-alert></app-alert>`);
    this.trigger('click', '.height-changer');
    expect(this.query('.alert')).toHaveStyle({ height: '200px' });
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
## API
 - `easyTest<T>( testedType : Type<T>, moduleMetadata? : TestModuleMetadata )`
 - `createHost<T, H>( testedType : Type<T>, hostType?, moduleMetadata? : TestModuleMetadata )`

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
- `tested` - fixture debug element
- `testedComponent` - tested component instance
- `testedElement` - tested native element
- `hostComponent` - host component instance (Available only when using `createHost`)
- `hostFixture` - host fixture (Available only when using `createHost`)

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