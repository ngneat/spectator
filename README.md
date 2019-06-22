<p align="center">
 <img width="640" height="264" src="https://preview.ibb.co/ef2RUn/01_righteous_clear.png">
</p>

[![Downloads](https://img.shields.io/npm/dt/@netbasal/spectator.svg?style=flat-square)]()
[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors)
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

`ng add @netbasal/spectator`

## Documentation
Learn about it on the [docs site](https://netbasal.gitbook.io/spectator/)

## Spectator CLI
Auto generate specs with the [CLI](https://github.com/NetanelBasal/spectator-cli)

## Schematics
Generate component, service and directive with Spectator spec templates with Angular Cli:

**Component**
* Default spec: `ng g cs dashrized-name`  
* Spec with a host: `ng g cs dashrized-name --withHost=true`
* Spec with a custom host: `ng g cs dashrized-name --withCustomHost=true`

**Service:**
* Default spec: `ng g ss dashrized-name`
* Spec for testing http data service: `ng g ss dashrized-name --isDataService=true`

**Directive:**
 
`ng g ds dashrized-name`

## Default Schematics Collection

To use `spectator` as the default collection in your Angular CLI project,
add it to your `angular.json`:

```sh
ng config cli.defaultCollection @netbasal/spectator
```

The `spectator` schematics extend the default `@schematics/angular` collection. If you want to set defaults for schematics such as generating components with scss file, you must change the schematics package name from `@schematics/angular` to `@netbasal/spectator` in `angular.json`:

```json
"schematics": {
  "@netbasal/spectator:component": {
    "styleext": "scss"
  }
}
```


## Testing in Angular
```ts
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let instance: ButtonComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    instance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  }));

  it('should set the class name according to the [className] input', () => {
    instance.className = 'danger';
    fixture.detectChanges();
    const button = debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.classList.contains('danger')).toBeTruthy();
    expect(button.classList.contains('success')).toBeFalsy();
  });

});
```

## Testing in Spectator
```ts
import { ButtonComponent } from './button.component';
import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
​
describe('ButtonComponent', () => {
​
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createTestComponentFactory(ButtonComponent);

  beforeEach(() => spectator = createComponent());

  it('should set the class name according to the [className] input', () => {
    spectator.setInput('className', 'danger');
    expect(spectator.query('button')).toHaveClass('danger');
    expect(spectator.query('button')).not.toHaveClass('success');
  });
});
```

## Features
- ng-content testing
- Custom Jasmine Matchers (toHaveClass, toBeDisabled..)
- Built-in support for entry components
- Support for triggering keyboard/mouse/touch events
- Support for component providers
- Support for services/component/directives mocks
- Support for http service

![Datorama](https://image.ibb.co/i6AC17/dt_logo_black.png "Datorama")

Spectator is regularly used and maintained by [Datorama](https://datorama.com/).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/638818?v=4" width="100px;"/><br /><sub><b>I. Sinai</b></sub>](https://github.com/theblushingcrow)<br />[📖](https://github.com/NetanelBasal/spectator/commits?author=theblushingcrow "Documentation") [👀](#review-theblushingcrow "Reviewed Pull Requests") [🎨](#design-theblushingcrow "Design") | [<img src="https://avatars3.githubusercontent.com/u/18645670?v=4" width="100px;"/><br /><sub><b>Valentin Buryakov</b></sub>](https://github.com/valburyakov)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=valburyakov "Code") [🤔](#ideas-valburyakov "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;"/><br /><sub><b>Netanel Basal</b></sub>](https://www.netbasal.com)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=NetanelBasal "Code") [🔧](#tool-NetanelBasal "Tools") | [<img src="https://avatars1.githubusercontent.com/u/260431?v=4" width="100px;"/><br /><sub><b>Ben Grynhaus</b></sub>](https://github.com/bengry)<br />[🐛](https://github.com/NetanelBasal/spectator/issues?q=author%3Abengry "Bug reports") [💻](https://github.com/NetanelBasal/spectator/commits?author=bengry "Code") | [<img src="https://avatars1.githubusercontent.com/u/4996462?v=4" width="100px;"/><br /><sub><b>Ben Elliott</b></sub>](http://benjaminelliott.co.uk)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=benelliott "Code") | [<img src="https://avatars2.githubusercontent.com/u/681176?v=4" width="100px;"/><br /><sub><b>Martin Nuc</b></sub>](http://www.nuc.cz)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=MartinNuc "Code") | [<img src="https://avatars2.githubusercontent.com/u/2102973?v=4" width="100px;"/><br /><sub><b>Dirk Luijk</b></sub>](https://github.com/dirkluijk)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=dirkluijk "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/6364586?v=4" width="100px;"/><br /><sub><b>Lars Gyrup Brink Nielsen</b></sub>](https://medium.com/@LayZeeDK)<br />[📦](#platform-LayZeeDK "Packaging/porting to new platform") [⚠️](https://github.com/NetanelBasal/spectator/commits?author=LayZeeDK "Tests") | [<img src="https://avatars0.githubusercontent.com/u/1910515?v=4" width="100px;"/><br /><sub><b>Andrew Grekov</b></sub>](https://github.com/thekiba)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=thekiba "Code") [🔧](#tool-thekiba "Tools") | [<img src="https://avatars1.githubusercontent.com/u/3968?v=4" width="100px;"/><br /><sub><b>Jeroen Zwartepoorte</b></sub>](http://twitter.com/jpzwarte)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=jpzwarte "Code") | [<img src="https://avatars1.githubusercontent.com/u/11634412?v=4" width="100px;"/><br /><sub><b>Oliver Schlegel</b></sub>](https://github.com/oschlegel)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=oschlegel "Code") | [<img src="https://avatars1.githubusercontent.com/u/10893959?v=4" width="100px;"/><br /><sub><b>Rex Ye</b></sub>](https://github.com/rexebin)<br />[🔧](#tool-rexebin "Tools") [💻](https://github.com/NetanelBasal/spectator/commits?author=rexebin "Code") | [<img src="https://avatars0.githubusercontent.com/u/36368505?v=4" width="100px;"/><br /><sub><b>tchmura</b></sub>](https://github.com/tchmura)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=tchmura "Code") | [<img src="https://avatars2.githubusercontent.com/u/4572798?v=4" width="100px;"/><br /><sub><b>Yoeri Nijs</b></sub>](http://www.theneuralnetwork.nl)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=YoeriNijs "Code") |
| [<img src="https://avatars1.githubusercontent.com/u/44014?v=4" width="100px;"/><br /><sub><b>Anders Skarby</b></sub>](https://github.com/askarby)<br />[💻](https://github.com/NetanelBasal/spectator/commits?author=askarby "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org/docs/en/emoji-key) specification. Contributions of any kind welcome!
