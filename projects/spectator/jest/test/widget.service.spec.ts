import { createService } from '@netbasal/spectator/jest';

import { WidgetDataService } from '../../test/widget-data.service';
import { WidgetService } from '../../test/widget.service';

describe('WidgetService', () => {
  const spectator = createService({
    service: WidgetService,
    mocks: [WidgetDataService]
  });

  it('should be defined', () => {
    expect(spectator.service).toBeDefined();
  });
});
