import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { ZippyComponent } from '../../test/zippy/zippy.component';

describe('Override type-safety', () => {
  describe('Default host with type inference and custom properties', () => {
    const createHost = createHostFactory({
      component: ZippyComponent
    });

    it('should allow accessing the overridden property', () => {
      const host = createHost('<zippy></zippy>', {
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
    let host: SpectatorHost<ZippyComponent, { control: FormControl }>;
    const createHost = createHostFactory({
      component: ZippyComponent
    });

    beforeEach(() => {
      host = createHost('<zippy></zippy>', {
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

    let host: SpectatorHost<ZippyComponent, CustomHostComponent>;
    const createHost = createHostFactory({
      component: ZippyComponent,
      host: CustomHostComponent,
      imports: [ReactiveFormsModule]
    });

    beforeEach(() => {
      host = createHost('<zippy></zippy>', {
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
