import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { AutoFocusDirective } from './auto-focus.directive';
import { AutoFocusModule } from './auto-focus.module';

describe('AutoFocusDirectiveModule', () => {
  let spectator: SpectatorDirective<AutoFocusDirective>;

  const createDirective = createDirectiveFactory({
    directive: AutoFocusDirective,
    imports: [AutoFocusModule],
    declareDirective: false
  });

  it('should be declare AutoFocusDirective', () => {
    spectator = createDirective(`<input [datoAutoFocus]="false"/>`);
    expect(spectator.directive).toBeDefined();
  });
});
