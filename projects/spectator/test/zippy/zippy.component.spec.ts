import { Component } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { createHostFactory, SpectatorHost, byText } from '@ngneat/spectator';

import { QueryService } from '../query.service';
import { CalcComponent } from '../calc/calc.component';

import { ZippyComponent } from './zippy.component';

describe('ZippyComponent', () => {
  let host: SpectatorHost<ZippyComponent>;

  const createHost = createHostFactory({
    component: ZippyComponent,
    mocks: [QueryService],
    declarations: [CalcComponent],
    componentProviders: [{ provide: QueryService, useValue: 'componentProviders' }]
  });

  it('should should have a zippy component', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    expect('zippy').toExist();
    expect(host.queryHost('zippy')).toExist();
    expect(host.query('zippy')).not.toExist();

    expect('.non-existing').not.toExist();
    expect(host.queryHost('.non-existing')).not.toExist();
    expect(host.query('.non-existing')).not.toExist();
  });

  it('should display the title', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);
    expect(host.query('.zippy__title')).toHaveText('Zippy title');
  });

  it('should display the title from component property', () => {
    host = createHost(`<zippy></zippy>`, {
      props: {
        title: 'ZIPPY'
      }
    });
    expect(host.query('.zippy__title')).toHaveText('ZIPPY');
  });

  it('should display the title from host property', () => {
    host = createHost(`<zippy [title]="title"></zippy>`, {
      hostProps: {
        title: 'ZIPPY2'
      }
    });
    expect(host.query('.zippy__title')).toHaveText('ZIPPY2');
  });

  it('should support objects', () => {
    host = createHost(`<zippy></zippy>`, {
      detectChanges: true,
      props: {
        options: { color: 'blue' }
      }
    });

    expect(host.query('.color')).toHaveText('blue');
  });

  it('should have attribute', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);
    const a = document.querySelectorAll('.fiv');
    const b = host.query('.color');

    expect(host.query('.zippy')).toHaveAttribute('id');
  });

  it('should have attribute with value', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);
    const a = document.querySelectorAll('.fiv');
    const b = host.query('.color');

    expect(host.query('.zippy')).toHaveAttribute('id', 'zippy');
  });

  it('should be checked', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

    expect(host.query('.checkbox')).toHaveProperty('checked', true);
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
  });

  it('should be closed by default', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    expect('.zippy__content').not.toExist();
  });

  it('should toggle the content when clicked', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    host.click('.zippy__title');
    expect(host.query('.zippy__content')).toExist();

    host.click('.zippy__title');
    expect('.zippy__content').not.toExist();
  });

  it('should toggle the content when pressing "Enter"', () => {
    host = createHost(`
      <zippy title="Zippy title">
        <app-calc></app-calc>
      </zippy>`);

    expect(host.query(CalcComponent)).toBe(null);
    expect(host.queryAll(CalcComponent).length).toBe(0);
    expect(host.queryLast(CalcComponent)).toBe(null);

    host.keyboard.pressEnter('.zippy__title');
    expect(host.query(CalcComponent)).toExist();

    expect(host.query(CalcComponent)).toBeDefined();
    expect(host.queryAll(CalcComponent).length).toBe(1);
    expect(host.queryLast(CalcComponent)).toBeDefined();

    host.keyboard.pressEnter('.zippy__title');
    expect('.zippy__content').not.toExist();
  });

  it('should work on the host', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);
    host.keyboard.pressEscape();
    expect(host.query('.zippy__content')).toExist();

    host.keyboard.pressEscape();
    expect('.zippy__content').not.toExist();
  });
});

describe('ZippyComponent with default template', () => {
  let host: SpectatorHost<ZippyComponent>;

  const createHost = createHostFactory({
    component: ZippyComponent,
    componentProviders: [{ provide: QueryService, useValue: 'componentProviders' }],
    template: `<zippy [title]="title"></zippy>`
  });

  it('should display the title from host property', () => {
    host = createHost(undefined, {
      hostProps: {
        title: 'ZIPPY_DEFAULT'
      }
    });
    expect(host.query('.zippy__title')).toHaveText('ZIPPY_DEFAULT');
  });
});

@Component({ selector: 'app-custom-host', template: '' })
class CustomHostComponent {
  public title = 'Custom HostComponent';
  public options = { color: 'blue' };
}

describe('With Custom Host Component', () => {
  let host: SpectatorHost<ZippyComponent, CustomHostComponent>;

  const createHost = createHostFactory({
    component: ZippyComponent,
    componentProviders: [{ provide: QueryService, useValue: 'componentProviders' }],
    host: CustomHostComponent
  });

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`);

    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent');
  });

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title" [options]="options"></zippy>`);

    expect(host.query('.color')).toHaveText('blue');
  });

  it('should work with tick', fakeAsync(() => {
    host = createHost(`<zippy [title]="title"></zippy>`);
    host.component.update();
    expect(host.component.updatedAsync).toBeFalsy();
    host.tick(6000);
    expect(host.component.updatedAsync).not.toBeFalsy();
  }));

  it('should query from root by string selector', () => {
    host = createHost(`<zippy [title]="title"></zippy>`);
    const head = host.query('head', { root: true });
    expect(head).toBeDefined();
  });

  describe('Queries with "root: true" param', () => {
    const title = 'Some Zippy page title';

    beforeEach(() => {
      host = createHost(`<zippy [title]="title"></zippy>`);

      host.component.setPageTitle(title);
    });

    it('should query from root by title string selector', () => {
      const titleElement = host.query('title', { root: true });
      expect((<Element>titleElement).textContent).toBe(title);
    });

    it('should query from root by DOMSelector selector', () => {
      const titleElement = host.query(byText(title), { root: true });
      expect((<Element>titleElement).textContent).toBe(title);
    });

    it('should query all from root by title string selector', () => {
      const titleElements = host.queryAll('title', { root: true });
      expect(titleElements[0].textContent).toBe(title);
    });

    it('should query all from root by DOMSelector selector', () => {
      const titleElements = host.queryAll(byText(title), { root: true });
      expect(titleElements[0].textContent).toBe(title);
    });

    it('should query last from root by title string selector', () => {
      const lastTitleElement = host.queryLast('title', { root: true });
      expect((<Element>lastTitleElement).textContent).toBe(title);
    });

    it('should query last from root by DOMSelector selector', () => {
      const lastTitleElement = host.queryLast(byText(title), { root: true });
      expect((<Element>lastTitleElement).textContent).toBe(title);
    });
  });
});
