import { defineGlobalsInjections } from './src/lib/globals-injections';
import { TranslatePipe } from './test/translate.pipe';
import { TranslateService } from './test/translate.service';

defineGlobalsInjections({
  providers: [TranslateService],
  declarations: [TranslatePipe],
});
