import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { HelloComponent } from '../../../test/hello/hello.component';

describe('HelloComponent', () => {
  let host: SpectatorHost<HelloComponent>;

  const createHost = createHostFactory(HelloComponent);

  it('should display the title', () => {
    host = createHost(`<hello></hello> `, {
      props: {
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

    expect('div h2').toHaveText(' some title ', true);

    expect('div h2').toHaveExactText(' some title ');
    expect('div h2').toHaveExactText('some title', {trim: true});
    expect('div h2').not.toHaveExactText('ome title', {trim: true});

    expect('div h2').toHaveExactTrimmedText('some title');
    expect('div h2').not.toHaveExactTrimmedText('ome title');
  });
});
