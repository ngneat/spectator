import { ComponentWithoutOverwrittenProvidersComponent } from "./no-overwritten-providers.component";
import { createHostComponentFactory } from "../../lib/src/host";

describe("ComponentWithoutOverwrittenProvidersComponent", () => {
  describe("should not overwrite component's providers and work using createHostComponentFactory ", () => {
    let createHost = createHostComponentFactory({
      component: ComponentWithoutOverwrittenProvidersComponent
    });

    it("with options", () => {
      const { component } = createHost(`
        <app-component-without-overwritten-providers>
        </app-component-without-overwritten-providers>
      `);

      expect(component).toBeDefined();
      expect(component.dummy).toBeDefined();
    });

    it("with component", () => {
      createHost = createHostComponentFactory(
        ComponentWithoutOverwrittenProvidersComponent
      );

      const { component } = createHost(`
        <app-component-without-overwritten-providers>
        </app-component-without-overwritten-providers>
      `);

      expect(component).toBeDefined();
      expect(component.dummy).toBeDefined();
    });
  });
});
