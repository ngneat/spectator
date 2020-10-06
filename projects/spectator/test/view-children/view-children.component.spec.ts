import { ElementRef } from '@angular/core';
import { createHostFactory, createComponentFactory, Spectator, SpectatorHost } from '@ngneat/spectator';

import { ChildServiceService } from '../child-service.service';
import { ChildComponent } from '../child/child.component';

import { ViewChildrenComponent } from './view-children.component';

describe('ViewChildrenComponent', () => {
  let spectator: Spectator<ViewChildrenComponent>;
  const createComponent = createComponentFactory({
    component: ViewChildrenComponent,
    providers: [ChildServiceService],
    declarations: [ChildComponent]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should exist', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should expose the view child', () => {
    const serviceFromChild = spectator.query(ChildComponent, { read: ChildServiceService });
    const div = spectator.query('div');
    const component = spectator.query(ChildComponent);
    spectator.query(ChildComponent, {
      read: ElementRef
    });
    const button = spectator.query('button');

    expect(serviceFromChild).toBeDefined();
    expect(component).toBeDefined();
    expect(div).toExist();
  });

  it('should expose the view children', () => {
    const serviceFromChild = spectator.queryAll(ChildComponent, { read: ChildServiceService });
    const divs = spectator.queryAll('div');
    const components = spectator.queryAll(ChildComponent);
    expect(serviceFromChild.length).toBe(4);
    expect(components.length).toBe(4);
    expect(divs.length).toBe(2);

    expect(spectator.queryAll(ChildComponent, { read: ChildServiceService })).toEqual(serviceFromChild);
    expect(spectator.queryAll('app-child', { read: ChildServiceService })).toEqual(serviceFromChild);
  });
});

describe('ContentChild', () => {
  let host: SpectatorHost<ViewChildrenComponent>;

  const createHost = createHostFactory({
    component: ViewChildrenComponent,
    providers: [ChildServiceService],
    declarations: [ChildComponent]
  });

  it('should get also the content childs', () => {
    host = createHost(`
       <app-view-children>
         <app-child></app-child>
         <app-child></app-child>
      </app-view-children>
    `);

    const contentChilds = host.queryAll(ChildComponent);
    expect(contentChilds.length).toBe(6);

    const lastContentChild = host.queryLast(ChildComponent);

    expect(host.query('app-child:last-child', { read: ChildComponent })).toBe(lastContentChild);
  });
});
