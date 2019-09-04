import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({ selector: 'my-component', template: '' })
class MyComponent {}

describe('Override type-safety', () => {
  describe('Default host with type inference and custom properties', () => {
    const createHost = createHostFactory({
      component: MyComponent
    });

    it('should allow accessing the overridden property', () => {
      const host = createHost('<my-component></my-component>', {
        hostProps: {
          control: new FormControl(),
          x: 'x'
        }
      });

      host.hostComponent.control.patchValue('x');
      host.hostComponent.x = 'y';
    });
  });

  describe('Default host without type inference and custom properties', () => {
    let host: SpectatorHost<MyComponent, { control: FormControl }>;
    const createHost = createHostFactory({
      component: MyComponent
    });

    beforeEach(() => {
      host = createHost('<my-component></my-component>', {
        hostProps: {
          control: new FormControl(),
          x: 'x'
        }
      });
    });

    it('should allow accessing the overridden property', () => {
      host.hostComponent.control.patchValue('x');
    });
  });

  describe('Custom Host should not allow custom properties', () => {
    @Component({ template: '' })
    class CustomHostComponent {
      public foo: string = 'bar';
    }

    let host: SpectatorHost<MyComponent, CustomHostComponent>;
    const createHost = createHostFactory({
      component: MyComponent,
      host: CustomHostComponent,
      imports: [ReactiveFormsModule]
    });

    beforeEach(() => {
      host = createHost('<my-component></my-component>', {
        hostProps: {
          // control: new FormControl(), // should not compile
          foo: 'x'
        }
      });
    });

    it('should allow setting the defined properties', () => {
      host.hostComponent.foo = 'bar';
      // host.hostComponent.bar = 'bar'; // should not compile
    });
  });
});
