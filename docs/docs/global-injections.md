## Global Injections
It's possible to define injections which will be available for each test without the need to re-declare them in each test:
```ts
// test.ts
import { defineGlobalsInjections } from '@ngneat/spectator';
import { TranslocoModule } from '@ngneat/tranlsoco';

defineGlobalsInjections({
  imports: [TranslocoModule],
});
```
