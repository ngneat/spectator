"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spectatorPipeSchematic = exports.spectatorDirectiveSchematic = exports.spectatorServiceSchematic = exports.spectatorComponentSchematic = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@schematics/angular/utility/workspace");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
function spectatorComponentSchematic(options) {
    return (0, schematics_1.chain)([
        (0, schematics_1.externalSchematic)('@schematics/angular', 'component', {
            ...omit(options, ['jest', 'withHost', 'withCustomHost']),
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
                }),
                (0, schematics_1.move)(movePath),
            ]);
            return (0, schematics_1.mergeWith)(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
exports.spectatorComponentSchematic = spectatorComponentSchematic;
function spectatorServiceSchematic(options) {
    return (0, schematics_1.chain)([
        (0, schematics_1.externalSchematic)('@schematics/angular', 'service', {
            ...omit(options, ['jest', 'isDataService']),
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
                }),
                (0, schematics_1.move)(movePath),
            ]);
            return (0, schematics_1.mergeWith)(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
exports.spectatorServiceSchematic = spectatorServiceSchematic;
function spectatorDirectiveSchematic(options) {
    return (0, schematics_1.chain)([
        (0, schematics_1.externalSchematic)('@schematics/angular', 'directive', {
            ...omit(options, ['jest']),
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
                }),
                (0, schematics_1.move)(movePath),
            ]);
            return (0, schematics_1.mergeWith)(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
exports.spectatorDirectiveSchematic = spectatorDirectiveSchematic;
function spectatorPipeSchematic(options) {
    return (0, schematics_1.chain)([
        (0, schematics_1.externalSchematic)('@schematics/angular', 'pipe', {
            ...omit(options, ['jest']),
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
                }),
                (0, schematics_1.move)(movePath),
            ]);
            return (0, schematics_1.mergeWith)(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
exports.spectatorPipeSchematic = spectatorPipeSchematic;
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
//# sourceMappingURL=index.js.map