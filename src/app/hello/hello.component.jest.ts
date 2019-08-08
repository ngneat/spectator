import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator/jest';
import { HelloComponent } from './hello.component';

describe('HelloComponent', () => {
  let host: SpectatorWithHost<HelloComponent>;

  const createHost = createHostComponentFactory(HelloComponent);

  it('should display the title', () => {
    host = createHost(`<hello></hello> `, {
      properties: {
        title: 'some title',
        widthRaw: 20
      }
    });

    expect((host.query('div') as HTMLElement).style.width).toBe('20px');

    expect('div h1').toHaveText(''); // This should return true, according to the original code
    expect('div h1').toHaveText('some title');
    expect('div h1').toHaveText('ome title');

    expect('div h1').toHaveText('some title', true);
    expect('div h1').not.toHaveText('ome title', true);

    expect('div h1').toHaveExactText('some title');
    expect('div h1').not.toHaveExactText('ome title');
    expect('div h1').not.toHaveExactText('');
  });
});
