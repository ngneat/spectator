import 'jest-preset-angular';
import { defineGlobalsInjections } from '../projects/spectator/src/lib/globals-injections';
import { TranslateService } from './app/translate.service';
import { TranslatePipe } from './app/translate.pipe';

defineGlobalsInjections({
  providers: [TranslateService],
  declarations: [TranslatePipe]
});
