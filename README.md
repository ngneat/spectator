<p align="center">
 <img width="640" height="264" src="https://preview.ibb.co/ef2RUn/01_righteous_clear.png">
</p>

[![Downloads](https://img.shields.io/npm/dt/@netbasal/spectator.svg?style=flat-square)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://semaphoreci.com/api/v1/netanel7799/spectator/branches/master/badge.svg)](https://semaphoreci.com/netanel7799/spectator)

> Angular Tests Made Easy

# 😎 Spectator 
Spectator is written on top of the Angular Testing Framework and provides two things:

- A cleaner API for testing.
- A set of custom matchers that will help you to test DOM elements more easily.

Spectator helps you get rid of all the boilerplate grunt work, leaving you with readable, sleek and streamlined unit tests.

## Installation

`npm install @netbasal/spectator --save-dev`

## Documentation
Learn about it on the [docs site](https://netbasal.gitbook.io/spectator/)

## Spectator CLI
Auto generate specs with the [CLI](https://github.com/NetanelBasal/spectator-cli)

## A Taste of Spectator
```ts
// zippy.component.ts

@Component({
  selector: 'zippy',
  template: `
    <div class="zippy">
      <div (click)="toggle()" class="zippy__title">
        <span class="arrow">{{ visible ? 'Close' : 'Open' }}</span> {{title}}
      </div>
      <div *ngIf="visible" class="zippy__content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ZippyComponent {

  @Input() title;
  visible = false;

  toggle() {
    this.visible = !this.visible;
  }
}

// zippy.component.spec.ts
import { ZippyComponent } from './zippy.component';
import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator';
import { Component } from '@angular/core';

describe('ZippyComponent', () => {
  let host: SpectatorWithHost<ZippyComponent>;

  const createHost = createHostComponentFactory(ZippyComponent);

  it('should display the title', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    expect(host.query('.zippy__title')).toHaveText(( text ) => 'Zippy title');
  });

  it('should display the content', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

    host.click('.zippy__title');

    expect(host.query('.zippy__content')).toHaveText('Zippy content');
  });

  it('should display the "Open" word if closed', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

    expect(host.query('.arrow')).toHaveText('Open');
    expect(host.query('.arrow')).not.toHaveText('Close');
  });

  it('should display the "Close" word if open', () => {
      host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

      host.click('.zippy__title');

      expect(host.query('.arrow')).toHaveText('Close');
      expect(host.query('.arrow')).not.toHaveText('Open');
    }
  );

  it('should be closed by default', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    expect('.zippy__content').not.toExist();
  });

  it('should toggle the content', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    host.click('.zippy__title');
    expect(host.query('.zippy__content')).toExist();

    host.click('.zippy__title');
    expect('.zippy__content').not.toExist();
  });

});
```

![Datorama](https://image.ibb.co/i6AC17/dt_logo_black.png "Datorama")

Spectator is regularly used and maintained by [Datorama](https://datorama.com/).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/638818?v=4" width="100px;"/><br /><sub><b>I. Sinai</b></sub>](https://github.com/theblushingcrow)<br />[📖](https://github.com/NetanelBasal/spectator/commits?author=theblushingcrow "Documentation") [👀](#review-theblushingcrow "Reviewed Pull Requests") [🎨](#design-theblushingcrow "Design") | [<img src="https://avatars3.githubusercontent.com/u/18645670?v=4" width="100px;"/><br /><sub><b>Valentin Buryakov</b></sub>](https://github.com/valburyakov)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=valburyakov "Code") [🤔](#ideas-valburyakov "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;"/><br /><sub><b>Netanel Basal</b></sub>](https://www.netbasal.com)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=NetanelBasal "Code") [🔧](#tool-NetanelBasal "Tools") | [<img src="https://avatars1.githubusercontent.com/u/260431?v=4" width="100px;"/><br /><sub><b>Ben Grynhaus</b></sub>](https://github.com/bengry)<br />[🐛](https://github.com/NetanelBasal/spectator/issues?q=author%3Abengry "Bug reports") [💻](https://github.com/NetanelBasal/spectator/commits?author=bengry "Code") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
