import { createHostComponentFactory, mockProvider } from '@netbasal/spectator';
import { ComponentWithoutOverwrittenProvidersComponent } from './no-overwritten-providers.component';
import { DummyService } from './dummy.service';

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
  //   const createHost = createHostComponentFactory(ComponentWithoutOverwrittenProvidersComponent);
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
