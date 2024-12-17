import { createServiceFactory, SpectatorService } from '@ngneat/spectator/vitest';

import { WidgetDataService } from '../../test/widget-data.service';
import { WidgetService } from '../../test/widget.service';

describe('WidgetService', () => {
  let spectator: SpectatorService<WidgetService>;
  const createService = createServiceFactory({
    service: WidgetService,
    mocks: [WidgetDataService],
  });

  beforeEach(() => (spectator = createService()));

  it('should be defined', () => {
    expect(spectator.service).toBeDefined();
  });
});
