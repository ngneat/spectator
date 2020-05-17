---
id: mocking-components
title: Mocking Components 
---

If you need to mock components, you can use the [ng-mocks](https://github.com/ike18t/ng-mocks) library. Instead of using `CUSTOM_ELEMENTS_SCHEMA`,which might hide some issues and won't help you to set inputs, outputs, etc., `ng-mocks` will auto mock the inputs, outputs, etc. for you.

Example:

```ts
import { createHostFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { FooComponent } from './path/to/foo.component';

const createHost = createHostFactory({
  component: YourComponentToTest,
  declarations: [
    MockComponent(FooComponent)
  ]
});
```
