### Events API
Each one of the events can accept a `SpectatorElement` which can be one of the following:

```ts
type SpectatorElement = string | Element | DebugElement | ElementRef | Window | Document;
```

If not provided, the default element will be the host element of the component under test.

- `click()` - Triggers a click event:
```ts
spectator.click(SpectatorElement);
```
- `blur()` - Triggers a blur event:
```ts
spectator.blur(SpectatorElement);
```
- `focus()` - Triggers a focus event:
```ts
spectator.focus(SpectatorElement);
```
- `typeInElement()` - Simulating the user typing:
```ts
spectator.typeInElement(value, SpectatorElement);
```
- `dispatchMouseEvent()` - Triggers a mouse event:
```ts
spectator.dispatchMouseEvent(SpectatorElement, 'mouseout');
spectator.dispatchMouseEvent(SpectatorElement, 'mouseout'), x, y, event);
```
- `dispatchKeyboardEvent()` - Triggers a keyboard event:
```ts
spectator.dispatchKeyboardEvent(SpectatorElement, 'keyup', 'Escape');
spectator.dispatchKeyboardEvent(SpectatorElement, 'keyup', { key: 'Escape', keyCode: 27 })
```
- `dispatchTouchEvent()` - Triggers a touch event:
```ts
spectator.dispatchTouchEvent(SpectatorElement, type, x, y);
```

#### Custom Events

You can trigger custom events (@Output() of child components) [using](https://github.com/ngneat/spectator/blob/master/projects/spectator/test/child-custom-event/child-custom-event-parent.component.spec.ts) the following method:
```ts
spectator.triggerEventHandler(MyChildComponent, 'myCustomEvent', 'eventValue');
spectator.triggerEventHandler('app-child-component', 'myCustomEvent', 'eventValue');
```
