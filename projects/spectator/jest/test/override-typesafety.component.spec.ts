import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({ selector: 'my-component', template: '' })
class MyComponent {}

describe('Override type-safety', () => {
  describe('Default host with type inference and custom properties', () => {
    const createHost = createHostFactory({
      component: MyComponent,
    });

    it('should allow accessing the overridden property', () => {
      const spectator = createHost('<my-component></my-component>', {
        hostProps: {
          control: new FormControl(),
          x: 'x',
        },
      });

      spectator.hostComponent.control.patchValue('x');
      spectator.hostComponent.x = 'y';
      // spectator.hostComponent.foo = 'y'; // should not compile
    });
  });

  describe('Default host without type inference and custom properties', () => {
    let spectator: SpectatorHost<MyComponent, { control: FormControl }>;
    const createHost = createHostFactory({
      component: MyComponent,
    });

    beforeEach(() => {
      spectator = createHost('<my-component></my-component>', {
        hostProps: {
          control: new FormControl(),
          x: 'x',
        },
      });
    });

    it('should allow accessing the overridden property', () => {
      spectator.hostComponent.control.patchValue('x');
      // spectator.hostComponent.x = 'y'; // should not compile
      // spectator.hostComponent.foo = 'y'; // should not compile
    });
  });

  describe('Custom Host should not allow custom properties', () => {
    @Component({ template: '' })
    class CustomHostComponent {
      public foo: string = 'bar';
    }

    let spectator: SpectatorHost<MyComponent, CustomHostComponent>;
    const createHost = createHostFactory({
      component: MyComponent,
      host: CustomHostComponent,
      imports: [ReactiveFormsModule],
    });

    beforeEach(() => {
      spectator = createHost('<my-component></my-component>', {
        hostProps: {
          // control: new FormControl(), // should not compile
          foo: 'x',
        },
      });

      expect(spectator.hostComponent.foo).toBe('x');
    });

    it('should allow setting the defined properties', () => {
      spectator.hostComponent.foo = 'bar';
      // spectator.hostComponent.bar = 'bar'; // should not compile
    });
  });

  describe('Custom Host should not allow custom properties (type inference)', () => {
    @Component({ template: '' })
    class CustomHostComponent {
      public foo: string = 'bar';
    }

    const createHost = createHostFactory({
      component: MyComponent,
      host: CustomHostComponent,
      imports: [ReactiveFormsModule],
    });

    it('should allow setting the defined properties', () => {
      const spectator = createHost('<my-component></my-component>', {
        hostProps: {
          // control: new FormControl(), // should not compile
          foo: 'x',
        },
      });

      expect(spectator.hostComponent.foo).toBe('x');

      spectator.hostComponent.foo = 'bar';
      // spectator.hostComponent.bar = 'bar'; // should not compile
    });
  });
});
