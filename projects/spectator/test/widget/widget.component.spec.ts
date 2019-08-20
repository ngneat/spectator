import { createHostFactory, SpectatorWithHost, SpyObject } from '@ngneat/spectator';

import { WidgetService } from '../widget.service';

import { WidgetComponent } from './widget.component';

describe('WidgetComponent', () => {
  let host: SpectatorWithHost<WidgetComponent>;

  const createHost = createHostFactory({
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
    const widgetService = host.component.widgetService as SpyObject<WidgetService>;
    expect(widgetService.get).toHaveBeenCalled();
  });
});
