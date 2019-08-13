import 'jest-preset-angular';

import { defineGlobalsInjections } from './src/lib/globals-injections';
import { TranslateService } from './test/translate.service';
import { TranslatePipe } from './test/translate.pipe';

defineGlobalsInjections({
  providers: [TranslateService],
  declarations: [TranslatePipe]
});
