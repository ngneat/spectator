import { createService } from "../lib/src/service";
import { WidgetService } from "./widget.service";
import { WidgetDataService } from "./widget-data.service";

describe("WidgetService", () => {
  const spectator = createService({
    service: WidgetService,
    mocks: [WidgetDataService]
  });

  it("should be defined", () => {
    expect(spectator.service).toBeDefined();
  });
});
