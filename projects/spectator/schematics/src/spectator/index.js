"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spectatorPipeSchematic = exports.spectatorDirectiveSchematic = exports.spectatorServiceSchematic = exports.spectatorComponentSchematic = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@schematics/angular/utility/workspace");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
function spectatorComponentSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'component', {
            ...omit(options, ['jest', 'withHost', 'withCustomHost']),
            skipTests: true,
        }),
        async (tree, _context) => {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            await _ensurePath(tree, options);
            const movePath = options.flat ? options.path : core_1.normalize(options.path + '/' + core_1.strings.dasherize(options.name) || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/${options.withHost ? 'component-host' : options.withCustomHost ? 'component-custom-host' : 'component'}`), [
                schematics_1.template({
                    ...core_1.strings,
                    ...options,
                }),
                schematics_1.move(movePath),
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
exports.spectatorComponentSchematic = spectatorComponentSchematic;
function spectatorServiceSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'service', {
            ...omit(options, ['jest', 'isDataService']),
            skipTests: true,
        }),
        async (tree, _context) => {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            await _ensurePath(tree, options);
            const movePath = core_1.normalize(options.path || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/${options.isDataService ? 'data-service' : `service`}`), [
                schematics_1.template({
                    ...core_1.strings,
                    ...options,
                }),
                schematics_1.move(movePath),
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
exports.spectatorServiceSchematic = spectatorServiceSchematic;
function spectatorDirectiveSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'directive', {
            ...omit(options, ['jest']),
            skipTests: true,
        }),
        async (tree, _context) => {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            await _ensurePath(tree, options);
            const movePath = core_1.normalize(options.path || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/directive`), [
                schematics_1.template({
                    ...core_1.strings,
                    ...options,
                }),
                schematics_1.move(movePath),
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
exports.spectatorDirectiveSchematic = spectatorDirectiveSchematic;
function spectatorPipeSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'pipe', {
            ...omit(options, ['jest']),
            skipTests: true,
        }),
        async (tree, _context) => {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            await _ensurePath(tree, options);
            const movePath = core_1.normalize(options.path || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/pipe`), [
                schematics_1.template({
                    ...core_1.strings,
                    ...options,
                }),
                schematics_1.move(movePath),
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        },
    ]);
}
exports.spectatorPipeSchematic = spectatorPipeSchematic;
async function _ensurePath(tree, options) {
    const workspace = await workspace_1.getWorkspace(tree);
    if (!options.project) {
        options.project = workspace.projects.keys().next().value;
    }
    const project = workspace.projects.get(options.project);
    if (options.path === undefined && project) {
        options.path = workspace_1.buildDefaultPath(project);
    }
    const parsedPath = parse_name_1.parseName(options.path, options.name);
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