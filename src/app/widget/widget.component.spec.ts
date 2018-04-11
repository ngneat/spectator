import {
  createHostComponentFactory,
  SpectatorWithHost
} from "../../lib/src/host";
import { WidgetComponent } from "./widget.component";
import { WidgetService } from "../widget.service";
import { SpyObject } from "../../lib/src";

describe("WidgetComponent", () => {
  let host: SpectatorWithHost<WidgetComponent>;

  const createHost = createHostComponentFactory<WidgetComponent>({
    component: WidgetComponent,
    mocks: [WidgetService]
  });

  it("should work", () => {
    host = createHost(`<app-widget></app-widget>`);
    expect(host.component).toBeDefined();
  });

  it("should call the service method on button click", () => {
    host = createHost(`<app-widget></app-widget>`);
    host.click("button");
    const widgetService = host.component.widgetService as SpyObject<
      WidgetService
    >;
    expect(widgetService.get).toHaveBeenCalled();
  });
});
