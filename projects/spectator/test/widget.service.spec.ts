import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { WidgetDataService } from './widget-data.service';
import { WidgetService } from './widget.service';

describe('WidgetService', () => {
  let spectator: SpectatorService<WidgetService>;
  const createService = createServiceFactory({
    service: WidgetService,
    mocks: [WidgetDataService]
  });

  it('should be defined', () => {
    spectator = createService();
    expect(spectator.service).toBeDefined();
  });
});
