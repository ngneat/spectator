---
id: global-injections
title: Global Injections 
---

It's possible to define injections which will be available for each test without the need to re-declare them in each test:
```ts
// test.ts
import { defineGlobalsInjections } from '@ngneat/spectator';
import { TranslocoModule } from '@ngneat/transloco';

defineGlobalsInjections({
  imports: [TranslocoModule],
});
```

Please be aware, that `defineGlobalsInjections()` must be called before the modules are loaded. In the default Angular `test.ts` this means before this line:

```ts
context.keys().map(context);
```
