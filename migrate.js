#!/usr/bin/env node

// tslint:disable

const replace = require("replace-in-file");

const lib = {
  from: /@netbasal\/spectator/,
  to: "@ngneat/spectator",
};

const componentFactory = {
  from: /createTestComponentFactory/g,
  to: "createComponentFactory",
};

const hostFactory = {
  from: /createHostComponentFactory/g,
  to: "createHostFactory",
};

const httpFactory = {
  from: /createHTTPFactory/g,
  to: "createHttpFactory",
};

const spectatorWithHost = {
  from: /SpectatorWithHost/g,
  to: "SpectatorHost",
};

const spectatorHTTP = {
  from: /SpectatorHTTP/g,
  to: "SpectatorHttp",
};

const getDirectiveInstance = {
  from: /\.getDirectiveInstance/g,
  to: ".queryHost",
};

const changes = [
  lib,
  componentFactory,
  hostFactory,
  httpFactory,
  spectatorWithHost,
  spectatorHTTP,
  getDirectiveInstance
];

changes.forEach(({ from, to }) => {
  replace.sync({
    files: "**/*.spec.ts",
    from,
    ignore: "node_modules/**/*",
    to,
  });
});
