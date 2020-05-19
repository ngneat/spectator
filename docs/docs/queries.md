---
id: queries
title: Queries
---

The Spectator API includes convenient methods for querying the DOM as part of a test: `query`, `queryAll`, `queryLast` , `queryHost` and `queryHostAll`. All query methods are polymorphic and allow you to query using any of the following techniques.

## String Selector
 Pass a string selector (in the same style as you would when using jQuery or document.querySelector) to query for elements that match that path in the DOM. This method for querying is equivalent to Angular's By.css predicate. Note that native HTML elements will be returned. For example:
 ```ts
// Returns a single HTMLElement
spectator.query('div > ul.nav li:first-child');
// Returns an array of all matching HTMLElements
spectator.queryAll('div > ul.nav li');

// Query from the document context
spectator.query('div', { root: true });

spectator.query('app-child', { read: ChildServiceService });
```
## Type Selector
Pass a type (such as a component, directive or provider class) to query for instances of that type in the DOM. This is equivalent to Angular's `By.directive` predicate. You can optionally pass in a second parameter to read a specific injection token from the matching elements' injectors. For example:
```ts
// Returns a single instance of MyComponent (if present)
spectator.query(MyComponent);

// Returns the instance of `SomeService` found in the instance of `MyComponent` that exists in the DOM (if present)
spectator.query(MyComponent, { read: SomeService });

spectator.query(MyComponent, { read: ElementRef });
host.queryLast(ChildComponent);
host.queryAll(ChildComponent);
```
## DOM Selector
Spectator allows you to query for elements using selectors inspired by [dom-testing-library](https://testing-library.com/docs/dom-testing-library/api-queries). The available selectors are:

```ts
spectator.query(byPlaceholder('Please enter your email address'));
spectator.query(byValue('By value'));
spectator.query(byTitle('By title'));
spectator.query(byAltText('By alt text'));
spectator.query(byLabel('By label'));
spectator.query(byText('By text'));
spectator.query(byText('By text', {selector: '#some .selector'}));
spectator.query(byTextContent('By text content', {selector: '#some .selector'}));
```

The difference between `byText` and `byTextContent` is that the former doesn't match text inside a nested elements.

For example, in this following HTML `byText('foobar', {selector: 'div'})` won't match the following `div`, but `byTextContent` will:
```html
<div>
  <span>foo</span>
  <span>bar</span>
</div>
```

## Testing Select Elements
Spectator allows you to test `<select></select>` elements easily, and supports multi select.

Example:
```ts
it('should set the correct options on multi select', () => {
  const select = spectator.query('#test-multi-select') as HTMLSelectElement;
  spectator.selectOption(select, ['1', '2']);
  expect(select).toHaveSelectedOptions(['1', '2']);
});

it('should set the correct option on standard select', () => {
  const select = spectator.query('#test-single-select') as HTMLSelectElement;
  spectator.selectOption(select, '1');
  expect(select).toHaveSelectedOptions('1');
});
```

It also allows you to check if your `change` event handler is acting correctly for each item selected. You can disable this if you need to pre set choices without dispatching the change event.

API:
```ts
spectator.selectOption(selectElement: HTMLSelectElement, options: string | string[] | HTMLOptionElement | HTMLOptionElement[], config: { emitEvents: boolean } = { emitEvents: true });
```

Example:
```ts
it('should dispatch correct number of change events', () => {
  const onChangeSpy = spyOn(spectator.component, 'handleChange');
  const select = spectator.query('#test-onchange-select') as HTMLSelectElement;

  spectator.selectOption(select, ['1', '2'], { emitEvents: true});

  expect(select).toHaveSelectedOptions(['1', '2']);
  expect(onChangeSpy).toHaveBeenCalledTimes(2);
});

it('should not dispatch correct number of change events', () => {
  const onChangeSpy = spyOn(spectator.component, 'handleChange');
  const select = spectator.query('#test-onchange-select') as HTMLSelectElement;

  spectator.selectOption(select, ['1', '2'], { emitEvents: false});

  expect(select).toHaveSelectedOptions(['1', '2']);
  expect(onChangeSpy).not.toHaveBeenCalledTimes(2);
});
```
You can also pass `HTMLOptionElement`(s) as arguments to `selectOption` and the `toHaveSelectedOptions` matcher. This is particularly useful when you are using `[ngValue]` binding on the `<option>`:
```ts
it('should set the correct option on single select when passing the element', () => {
  const select = spectator.query('#test-single-select-element') as HTMLSelectElement;

  spectator.selectOption(select, spectator.query(byText('Two')) as HTMLOptionElement);

  expect(select).toHaveSelectedOptions(spectator.query(byText('Two')) as HTMLOptionElement);
});
```
