const replace = require('replace-in-file');
const basePath = `...`;
const files = `${basePath}/**/*.spec.ts`;

const lib = {
  files,
  from: /@netbasal\/spectator/,
  to: '@ngneat/spectator'
};

const componentFactory = {
  files,
  from: /createTestComponentFactory/g,
  to: 'createComponentFactory'
};

const hostFactory = {
  files,
  from: /createHostComponentFactory/g,
  to: 'createHostFactory'
};

const httpFactory = {
  files,
  from: /createHTTPFactory/g,
  to: 'createHttpFactory'
};

const SpectatorWithHost = {
  files,
  from: /SpectatorWithHost/g,
  to: 'SpectatorHost'
};

const SpectatorHTTP = {
  files,
  from: /SpectatorHTTP/g,
  to: 'SpectatorHttp'
};

const changes = [lib, componentFactory, hostFactory, httpFactory, SpectatorWithHost, SpectatorHTTP];

changes.forEach(options => {
  replace.sync(options);
});
