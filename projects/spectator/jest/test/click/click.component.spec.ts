import { fakeAsync } from '@angular/core/testing';
import { byText, createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ClickComponent } from '../../../test/click/click.component';

describe('ClickComponent', () => {
  let component: ClickComponent;
  let spectator: Spectator<ClickComponent>;

  const createComponent = createComponentFactory(ClickComponent);

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should changed on click with click query shorthand', fakeAsync(() => {
    spectator.click('button');
    spectator.tick(100);

    expect('p').toHaveText('changed');
  }));

  it('should changed on click with click dom selector', fakeAsync(() => {
    spectator.click(byText('Change'));
    spectator.tick(100);

    expect('p').toHaveText('changed');
  }));
});
