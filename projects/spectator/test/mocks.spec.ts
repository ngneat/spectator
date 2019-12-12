import { mockProvider } from '@ngneat/spectator';

import { WidgetService } from './widget.service';

describe('mockProvider', () => {
  it('should not modify the object passed in 2nd argument when running the mock factory', () => {
    const customPropertiesAndMethods: Partial<Record<keyof WidgetService, any>> = {
      testingProperty: 'overriden'
    };
    const { useFactory: factory } = mockProvider(WidgetService, customPropertiesAndMethods);
    factory();
    expect(customPropertiesAndMethods).toEqual({
      testingProperty: 'overriden'
    });
  });
});
