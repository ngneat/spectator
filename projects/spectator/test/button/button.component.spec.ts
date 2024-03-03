import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';

import { QueryService } from '../query.service';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;

  const createComponent = createComponentFactory({
    component: ButtonComponent,
    componentProviders: [mockProvider(QueryService)],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should set the "success" class by default', () => {
    expect(spectator.query('button')).toHaveClass('success');
  });

  it('should set the class name according to the [className]', () => {
    spectator.setInput('className', 'danger');
    expect(spectator.query('button')).toHaveClass('danger');
    expect(spectator.query('button')).not.toHaveClass('success');
  });

  it('should set the title according to the [title]', () => {
    spectator = createComponent({
      props: { title: 'Click' },
    });

    expect(spectator.query('button')).toHaveText('Click');
  });

  it('should emit the $event on click', () => {
    let output;
    spectator.output<{ type: string }>('click').subscribe((result) => (output = result));

    spectator.component.onClick({ type: 'click' });
    expect(output).toEqual({ type: 'click' });
  });

  it('should mock the service', () => {
    spectator = createComponent({
      detectChanges: false,
    });
    spectator.inject(QueryService, true).selectName.and.returnValue(of('Netanel'));
    spectator.detectChanges();
    expect(spectator.query('p')).toHaveText('Netanel');
  });

  it('should support contextmenu', () => {
    spectator = createComponent();
    spyOn(spectator.component, 'contextmenu');
    spectator.mouse.contextmenu('.contextmenu');
    expect(spectator.component.contextmenu).toHaveBeenCalled();
  });

  it('should support dblclick', () => {
    spectator = createComponent();
    spyOn(spectator.component, 'dblclick');
    spectator.mouse.dblclick('.dblclick');
    expect(spectator.component.dblclick).toHaveBeenCalled();
  });
});

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;

  const createComponent = createComponentFactory({
    component: ButtonComponent,
    componentProviders: [mockProvider(QueryService)],
    detectChanges: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should not run cd by default', () => {
    expect(spectator.query('button')).not.toHaveClass('success');
    spectator.detectChanges();
    expect(spectator.query('button')).toHaveClass('success');
  });
});
