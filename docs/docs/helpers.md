---
id: helpers
title: Helpers
---

## Keyboard helpers
```ts
spectator.keyboard.pressEnter();
spectator.keyboard.pressEscape();
spectator.keyboard.pressTab();
spectator.keyboard.pressBackspace();
spectator.keyboard.pressKey('a');
spectator.keyboard.pressKey('ctrl.a');
spectator.keyboard.pressKey('ctrl.shift.a');
```

## Mouse helpers
```ts
spectator.mouse.contextmenu('.selector');
spectator.mouse.dblclick('.selector');
```

Note that each one of the above methods will also run `detectChanges()`.
