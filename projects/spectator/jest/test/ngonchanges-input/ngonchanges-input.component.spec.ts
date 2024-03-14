import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NgOnChangesInputComponent } from '../../../test/ngonchanges-input/ngonchanges-input.component';

describe('NgOnChangesInputComponent', () => {
  describe('with Spectator', () => {
    let spectator: Spectator<NgOnChangesInputComponent>;

    const createComponent = createComponentFactory({
      component: NgOnChangesInputComponent,
    });

    beforeEach(() => {
      spectator = createComponent();
    });

    it('should re-render when updating fields in ngOnChanges', () => {
      expect(spectator.query('button')).toBeDisabled();
      expect(spectator.query('button')).toHaveText('Button disabled');

      spectator.setInput({ btnDisabled: false });
      expect(spectator.query('button')).not.toBeDisabled();
      expect(spectator.query('button')).toHaveText('Button enabled');
    });
  });
});
