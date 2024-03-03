import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { WidgetComponent } from '../../../test/widget/widget.component';
import { WidgetService } from '../../../test/widget.service';

describe('WidgetComponent', () => {
  let host: SpectatorHost<WidgetComponent>;

  const createHost = createHostFactory({
    component: WidgetComponent,
    mocks: [WidgetService],
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
