import { createHostFactory, SpectatorWithHost } from '@ngneat/spectator';

import { HelloComponent } from './hello.component';

describe('HelloComponent', () => {
  let host: SpectatorWithHost<HelloComponent>;

  const createHost = createHostFactory(HelloComponent);

  it('should display the title', () => {
    host = createHost(`<hello></hello>`, {
      props: {
        title: 'some title',
        widthRaw: 20
      }
    });

    expect((host.query('div') as HTMLElement).style.width).toBe('20px');

    expect(host.query('div') as HTMLElement).toHaveStyle({ width: '20px' });
    expect(host.query('div') as HTMLElement).not.toHaveStyle({ width: '30px' });
    expect(host.query('div') as HTMLElement).toHaveStyle({ display: 'flex' });
    expect(host.query('div') as HTMLElement).not.toHaveStyle({ display: 'block' });
    expect(host.query('div') as HTMLElement).toHaveStyle({ width: '20px', display: 'flex' });
    expect(host.query('div') as HTMLElement).not.toHaveStyle({ width: '20px', display: 'block' });

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
