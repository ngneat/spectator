"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spectatorComponentSchematic = spectatorComponentSchematic;
exports.spectatorServiceSchematic = spectatorServiceSchematic;
exports.spectatorDirectiveSchematic = spectatorDirectiveSchematic;
exports.spectatorPipeSchematic = spectatorPipeSchematic;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@schematics/angular/utility/workspace");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
function spectatorComponentSchematic(options) {
    return (0, schematics_1.chain)([
        (0, schematics_1.externalSchematic)('@schematics/angular', 'component', {
            ...omit(options, ['jest', 'withHost', 'withCustomHost', 'unitTestRunner']),
            skipTests: true,
        }),
        async (tree, _context) => {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            await _ensurePath(tree, options);
            const movePath = options.flat ? options.path : (0, core_1.normalize)(options.path + '/' + core_1.strings.dasherize(options.name) || '');
            const specTemplateRule = (0, schematics_1.apply)((0, schematics_1.url)(`./files/${options.withHost ? 'component-host' : options.withCustomHost ? 'component-custom-host' : 'component'}`), [
                (0, schematics_1.template)({
                    ...core_1.strings,
                    ...options,
                    secondaryEntryPoint: getSecondaryEntryPoint(options),
                }),
                (0, schematics_1.move)(movePath),
            ]);
            return (0, schematics_1.mergeWith)(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
function spectatorServiceSchematic(options) {
    return (0, schematics_1.chain)([
        (0, schematics_1.externalSchematic)('@schematics/angular', 'service', {
            ...omit(options, ['jest', 'isDataService', 'unitTestRunner']),
            skipTests: true,
        }),
        async (tree, _context) => {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            await _ensurePath(tree, options);
            const movePath = (0, core_1.normalize)(options.path || '');
            const specTemplateRule = (0, schematics_1.apply)((0, schematics_1.url)(`./files/${options.isDataService ? 'data-service' : `service`}`), [
                (0, schematics_1.template)({
                    ...core_1.strings,
                    ...options,
                    secondaryEntryPoint: getSecondaryEntryPoint(options),
                }),
                (0, schematics_1.move)(movePath),
            ]);
            return (0, schematics_1.mergeWith)(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
function spectatorDirectiveSchematic(options) {
    return (0, schematics_1.chain)([
        (0, schematics_1.externalSchematic)('@schematics/angular', 'directive', {
            ...omit(options, ['jest', 'unitTestRunner']),
            skipTests: true,
        }),
        async (tree, _context) => {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            await _ensurePath(tree, options);
            const movePath = (0, core_1.normalize)(options.path || '');
            const specTemplateRule = (0, schematics_1.apply)((0, schematics_1.url)(`./files/directive`), [
                (0, schematics_1.template)({
                    ...core_1.strings,
                    ...options,
                    secondaryEntryPoint: getSecondaryEntryPoint(options),
                }),
                (0, schematics_1.move)(movePath),
            ]);
            return (0, schematics_1.mergeWith)(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
function spectatorPipeSchematic(options) {
    return (0, schematics_1.chain)([
        (0, schematics_1.externalSchematic)('@schematics/angular', 'pipe', {
            ...omit(options, ['jest', 'unitTestRunner']),
            skipTests: true,
        }),
        async (tree, _context) => {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            await _ensurePath(tree, options);
            const movePath = (0, core_1.normalize)(options.path || '');
            const specTemplateRule = (0, schematics_1.apply)((0, schematics_1.url)(`./files/pipe`), [
                (0, schematics_1.template)({
                    ...core_1.strings,
                    ...options,
                    secondaryEntryPoint: getSecondaryEntryPoint(options),
                }),
                (0, schematics_1.move)(movePath),
            ]);
            return (0, schematics_1.mergeWith)(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
async function _ensurePath(tree, options) {
    const workspace = await (0, workspace_1.getWorkspace)(tree);
    if (!options.project) {
        options.project = workspace.projects.keys().next().value;
    }
    const project = workspace.projects.get(options.project);
    if (options.path === undefined && project) {
        options.path = (0, workspace_1.buildDefaultPath)(project);
    }
    const parsedPath = (0, parse_name_1.parseName)(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
}
function omit(original, keys) {
    return Object.keys(original)
        .filter((key) => !keys.includes(key))
        .reduce((obj, key) => {
        obj[key] = original[key];
        return obj;
    }, {});
}
function getSecondaryEntryPoint(options) {
    const secondaryEntryPoints = {
        jest: 'jest',
        vitest: 'vitest',
        jasmine: null,
    };
    if (options.jest) {
        console.warn('The `jest` option is deprecated and will be removed in the future. Use `unitTestRunner` instead.');
        return secondaryEntryPoints.jest;
    }
    return secondaryEntryPoints[options.unitTestRunner];
}
//# sourceMappingURL=index.js.map