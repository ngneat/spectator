#### Testing Angular Modules

Components that are declared in their own module can be tested by defining the component
module in the imports list of the component factory together with the component. For example:

```ts
const createComponent = createComponentFactory({
  component: ButtonComponent,
  imports: [ButtonComponentModule],
});
```

When used like this, however, Spectator internally adds the component `ButtonComponent` to the declarations of the internally created new module. Hence, you will see the following error:

```
Type ButtonComponent is part of the declarations of 2 modules [...]
```

It is possible to tell Spectator not to add the component to the declarations of the internal module and, instead, use the explicitly defined module as is. Simply set the `declareComponent` property of the factory options to `false`:

```ts
const createComponent = createComponentFactory({
  component: ButtonComponent,
  imports: [ButtonComponentModule],
  declareComponent: false,
});
```
