// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { defineGlobalsInjections } from '../projects/spectator/src/lib/globals-injections';
import { TranslateService } from './app/translate.service';
import { TranslatePipe } from './app/translate.pipe';

declare const require: any;

defineGlobalsInjections({
  providers: [TranslateService],
  declarations: [TranslatePipe]
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
