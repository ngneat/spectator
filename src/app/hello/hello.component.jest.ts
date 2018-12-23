import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator/jest';
import { HelloComponent } from './hello.component';

describe('HelloComponent', () => {
  let host: SpectatorWithHost<HelloComponent>;

  const createHost = createHostComponentFactory(HelloComponent);

  it('should display the title', () => {
    host = createHost(
      `
      <hello></hello>
    `,
      true,
      {
        title: 'some title',
        widthRaw: 20
      }
    );

    expect((host.query('div') as HTMLElement).style.width).toBe('20px');
  });
});
