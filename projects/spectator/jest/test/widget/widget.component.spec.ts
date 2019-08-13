import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator/jest';

import { WidgetComponent } from '../../../test/widget/widget.component';
import { WidgetService } from '../../../test/widget.service';

describe('WidgetComponent', () => {
  let host: SpectatorWithHost<WidgetComponent>;

  const createHost = createHostComponentFactory({
    component: WidgetComponent,
    mocks: [WidgetService]
  });

  it('should work', () => {
    host = createHost(`<app-widget></app-widget>`);
    expect(host.component).toBeDefined();
  });

  it('should call the service method on button click', () => {
    host = createHost(`<app-widget></app-widget>`);
    host.click('button');
    const widgetService = host.component.widgetService;
    expect(widgetService.get).toHaveBeenCalled();
  });
});
