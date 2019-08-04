import { SomeService, OverrideProviderComponent } from './override-provider.component';
import { createTestComponentFactory, Spectator } from '@netbasal/spectator';

describe('OverrideProviderComponent', () => {
  let spectator: Spectator<OverrideProviderComponent>;
  const createComponent = createTestComponentFactory({
    component: OverrideProviderComponent,
    providers: [SomeService]
  });

  it('should use the original', () => {
    spectator = createComponent();
    expect(spectator.query('h1')).toHaveText('original');
  });

  it('should override the provider', () => {
    spectator = createComponent({}, { providers: [{ provide: SomeService, useValue: { text: 'override' } }] });
    expect(spectator.query('h1')).toHaveText('override');
  });
});
