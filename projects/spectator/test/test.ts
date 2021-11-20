// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'core-js/es/reflect';
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { defineGlobalsInjections } from '../src/lib/globals-injections';

import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';

declare const require: any;

defineGlobalsInjections({
  providers: [TranslateService],
  declarations: [TranslatePipe],
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: true },
});
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
