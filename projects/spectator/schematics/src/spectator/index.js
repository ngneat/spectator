"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("@schematics/angular/utility/config");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
function spectatorComponentSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'component', Object.assign(Object.assign({}, options), { skipTests: true, spec: false })),
        (tree, _context) => {
            _ensurePath(tree, options);
            const movePath = options.flat ? options.path : core_1.normalize(options.path + '/' + core_1.strings.dasherize(options.name) || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/${options.withHost ? 'component-host' : options.withCustomHost ? 'component-custom-host' : 'component'}`), [
                schematics_1.template(Object.assign(Object.assign({}, core_1.strings), options)),
                schematics_1.move(movePath)
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        }
    ]);
}
exports.spectatorComponentSchematic = spectatorComponentSchematic;
function spectatorServiceSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'service', Object.assign(Object.assign({}, options), { skipTests: true, spec: false })),
        (tree, _context) => {
            _ensurePath(tree, options);
            const movePath = core_1.normalize(options.path || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/${options.isDataService ? 'data-service' : `service`}`), [
                schematics_1.template(Object.assign(Object.assign({}, core_1.strings), options)),
                schematics_1.move(movePath)
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        }
    ]);
}
exports.spectatorServiceSchematic = spectatorServiceSchematic;
function spectatorDirectiveSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'directive', Object.assign(Object.assign({}, options), { skipTests: true, spec: false })),
        (tree, _context) => {
            _ensurePath(tree, options);
            const movePath = core_1.normalize(options.path || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/directive`), [
                schematics_1.template(Object.assign(Object.assign({}, core_1.strings), options)),
                schematics_1.move(movePath)
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        }
    ]);
}
exports.spectatorDirectiveSchematic = spectatorDirectiveSchematic;
function _ensurePath(tree, options) {
    const workspace = config_1.getWorkspace(tree);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];
    if (options.path === undefined) {
        const root = project.sourceRoot ? `/${project.sourceRoot}/` : `/${project.root}/src/app`;
        const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
        options.path = `${root}${projectDirName}`;
    }
    const parsedPath = parse_name_1.parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
}
//# sourceMappingURL=index.js.map