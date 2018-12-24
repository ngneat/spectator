import { createHostComponentFactory } from '@netbasal/spectator/jest';
import { ComponentWithoutOverwrittenProvidersComponent } from './no-overwritten-providers.component';

describe('ComponentWithoutOverwrittenProvidersComponent', () => {
  describe('with options', () => {
    let createHost = createHostComponentFactory({
      component: ComponentWithoutOverwrittenProvidersComponent
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

  describe('with component', () => {
    let createHost = createHostComponentFactory(ComponentWithoutOverwrittenProvidersComponent);

    it("should not overwrite component's providers and work using createHostComponentFactory", () => {
      const { component } = createHost(`
        <app-component-without-overwritten-providers>
        </app-component-without-overwritten-providers>
      `);

      expect(component).toBeDefined();
      expect(component.dummy).toBeDefined();
    });
  });
});
