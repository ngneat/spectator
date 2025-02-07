import { createComponentFactory, createHostFactory, Spectator, SpectatorHost } from '@ngneat/spectator';
import { FunctionOutputComponent } from './function-output.component';
import { fakeAsync, tick } from '@angular/core/testing';

describe('FunctionOutputComponent', () => {
  describe('with Spectator', () => {
    let spectator: Spectator<FunctionOutputComponent>;

    const createComponent = createComponentFactory({
      component: FunctionOutputComponent,
    });

    beforeEach(() => {
      spectator = createComponent();
    });

    it('should emit the event on button click', () => {
      let output = false;
      spectator.output('buttonClick').subscribe((result) => (output = result));

      spectator.click('button');

      expect(output).toEqual(true);
    });

    it('should emit the event on button click - EventEmitter', () => {
      let output = false;
      spectator.output('buttonClickedEvent').subscribe((result) => (output = result));

      spectator.click('button');

      expect(output).toEqual(true);
    });

    it('should emit the event on button click - Subject', () => {
      let output = false;
      spectator.output('buttonClickedSubject').subscribe((result) => (output = result));
      spectator.click('button');

      expect(output).toEqual(true);
    });
  });

  describe('with SpectatorHost', () => {
    let host: SpectatorHost<FunctionOutputComponent>;

    const createHost = createHostFactory({
      component: FunctionOutputComponent,
      template: `<app-function-output/>`,
    });

    beforeEach(() => {
      host = createHost();
    });

    it('should emit the event on button click', () => {
      let output = false;
      host.output('buttonClick').subscribe((result) => (output = result));

      host.click('button');

      expect(output).toEqual(true);
    });

    it('should emit the event on button click - EventEmitter', () => {
      let output = false;
      host.output('buttonClickedEvent').subscribe((result) => (output = result));

      host.click('button');

      expect(output).toEqual(true);
    });

    it('should emit the event on button click - Subject', () => {
      let output = false;
      host.output('buttonClickedSubject').subscribe((result) => (output = result));

      host.click('button');

      expect(output).toEqual(true);
    });
  });
});
