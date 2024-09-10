import { createComponentFactory, createHostFactory, Spectator, SpectatorHost } from '@ngneat/spectator/jest';
import { FunctionOutputComponent } from '../../../test/function-output/function-output.component';

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
      let output;
      spectator.output('buttonClick').subscribe((result) => (output = result));

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
      let output;
      host.output('buttonClick').subscribe((result) => (output = result));

      host.click('button');

      expect(output).toEqual(true);
    });
  });
});
