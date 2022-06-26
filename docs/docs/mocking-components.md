---
id: mocking-components
title: Mocking Components 
---

If you need to mock dependencies such as modules, components and other declarations, you can use the [ng-mocks](https://ng-mocks.sudo.eu) library and its [`MockBuilder`](https://ng-mocks.sudo.eu/extra/with-3rd-party#ngneatspectator-and-mockbuilder). Instead of using `CUSTOM_ELEMENTS_SCHEMA`, which might hide some issues and won't help you to set inputs, outputs, etc., `ng-mocks` will auto mock the inputs, outputs, etc. for you.

Example:

```ts
import { createHostFactory } from '@ngneat/spectator';
import { MockBuilder } from 'ng-mocks';
import { FooComponent } from './path/to/foo.component';

// All imports, declarations and exports of ItsModule will be mocked.
// The same applies to standalone components, simply omit the module.
const dependencies = MockBuilder(YourComponentToTest, ItsModule).build();

const createHost = createHostFactory({
  component: YourComponentToTest,
  ...dependencies,
});
```
