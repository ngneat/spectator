import { createHostComponentFactory } from '@netbasal/spectator/jest';
import { mockProvider } from '@netbasal/spectator';

import { ComponentWithoutOverwrittenProvidersComponent } from '../../../test/no-overwritten-providers/no-overwritten-providers.component';
import { DummyService } from '../../../test/no-overwritten-providers/dummy.service';

describe('ComponentWithoutOverwrittenProvidersComponent', () => {
  describe('with options', () => {
    const createHost = createHostComponentFactory({
      component: ComponentWithoutOverwrittenProvidersComponent,
      componentProviders: [mockProvider(DummyService)]
    });

    it("should not overwrite component's providers and work using createHostComponentFactory", () => {
      const { component } = createHost(`
        <app-component-without-overwritten-providers>
        </app-component-without-overwritten-providers>
      `);

      expect(component).toBeDefined();
      expect(component.dummy).toBeDefined();
    });
  });

  // describe('with component', () => {
  //   let createHost = createHostComponentFactory(ComponentWithoutOverwrittenProvidersComponent);
  //
  //   it('should not overwrite component\'s providers and work using createHostComponentFactory', () => {
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
