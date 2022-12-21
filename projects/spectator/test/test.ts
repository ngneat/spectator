import { defineGlobalsInjections } from '../src/lib/globals-injections';

import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';

defineGlobalsInjections({
  providers: [TranslateService],
  declarations: [TranslatePipe],
});
