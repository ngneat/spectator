---
id: custom-matchers
title: Custom Matchers
---

```ts
expect('.zippy__content').not.toExist();
expect('.zippy__content').toHaveLength(3);
expect('.zippy__content').toHaveId('id');
expect('.zippy__content').toHaveClass('class');
expect('.zippy__content').toHaveClass('class a, class b');
expect('.zippy__content').toHaveClass(['class a', 'class b']);
expect(spectator.query('.zippy')).toHaveAttribute('id', 'zippy');
expect(spectator.query('.zippy')).toHaveAttribute({id: 'zippy'});
expect(spectator.query('.checkbox')).toHaveProperty('checked', true);
expect(spectator.query('.img')).toHaveProperty({src: 'assets/myimg.jpg'});
expect(spectator.query('.img')).toContainProperty({src: 'myimg.jpg'});
expect('.zippy__content').toHaveText('Content');
expect('.zippy__content').toContainText('Content');

// Note this looks for multiple elements with the class and checks the text of each array element against the index of the element found
expect('.zippy__content').toHaveText(['Content A', 'Content B']);
expect('.zippy__content').toContainText(['Content A', 'Content B']);
expect('.zippy__content').toHaveText((text) => text.includes('..'));
expect('.zippy__content').toHaveValue('value');
expect('.zippy__content').toContainValue('value');

// Note this looks for multiple elements with the class and checks the value of each array element against the index of the element found
expect('.zippy__content').toHaveValue(['value a', 'value b']);
expect('.zippy__content').toContainValue(['value a', 'value b']);
expect(spectator.element).toHaveStyle({backgroundColor: 'rgba(0, 0, 0, 0.1)'});
expect('.zippy__content').toHaveData({data: 'role', val: 'admin'});
expect('.checkbox').toBeChecked();
expect('.checkbox').toBeIndeterminate();
expect('.button').toBeDisabled();
expect('div').toBeEmpty();
expect('div').toBeHidden();
expect('element').toBeSelected();
// Notice that due to restrictions within Jest (not applying actual layout logic in virtual DOM), certain matchers may result in false positives. For example width and height set to 0
expect('element').toBeVisible();
expect('input').toBeFocused();
expect('div').toBeMatchedBy('.js-something');
expect('div').toHaveDescendant('.child');
expect('div').toHaveDescendantWithText({selector: '.child', text: 'text'});
```
