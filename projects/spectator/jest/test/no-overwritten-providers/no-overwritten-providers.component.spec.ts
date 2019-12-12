import { createHostFactory } from '@ngneat/spectator/jest';
import { mockProvider } from '@ngneat/spectator';

import { ComponentWithoutOverwrittenProvidersComponent } from '../../../test/no-overwritten-providers/no-overwritten-providers.component';
import { DummyService } from '../../../test/no-overwritten-providers/dummy.service';

describe('ComponentWithoutOverwrittenProvidersComponent', () => {
  describe('with options', () => {
    const createHost = createHostFactory({
      component: ComponentWithoutOverwrittenProvidersComponent,
      componentProviders: [mockProvider(DummyService)]
    });

    it('should not overwrite components providers and work using createHostFactory', () => {
      const { component } = createHost(`
        <app-component-without-overwritten-providers>
        </app-component-without-overwritten-providers>
      `);

      expect(component).toBeDefined();
      expect(component.dummy).toBeDefined();
    });
  });

  // describe('with component', () => {
  //   let createHost = createHostFactory(ComponentWithoutOverwrittenProvidersComponent);
  //
  //   it('should not overwrite component\'s providers and work using createHostFactory', () => {
  //     const { component } = createHost(`
  //       <app-component-without-overwritten-providers>
  //       </app-component-without-overwritten-providers>
  //     `);
  //
  //     expect(component).toBeDefined();
  //     expect(component.dummy).toBeDefined();
  //   });
  // });
});
