"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spectatorPipeSchematic = exports.spectatorDirectiveSchematic = exports.spectatorServiceSchematic = exports.spectatorComponentSchematic = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@schematics/angular/utility/workspace");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
function spectatorComponentSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'component', Object.assign(Object.assign({}, options), { skipTests: true, spec: false })),
        (tree, _context) => __awaiter(this, void 0, void 0, function* () {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            yield _ensurePath(tree, options);
            const movePath = options.flat ? options.path : core_1.normalize(options.path + '/' + core_1.strings.dasherize(options.name) || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/${options.withHost ? 'component-host' : options.withCustomHost ? 'component-custom-host' : 'component'}`), [
                schematics_1.template(Object.assign(Object.assign({}, core_1.strings), options)),
                schematics_1.move(movePath)
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        })
    ]);
}
exports.spectatorComponentSchematic = spectatorComponentSchematic;
function spectatorServiceSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'service', Object.assign(Object.assign({}, options), { skipTests: true, spec: false })),
        (tree, _context) => __awaiter(this, void 0, void 0, function* () {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            yield _ensurePath(tree, options);
            const movePath = core_1.normalize(options.path || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/${options.isDataService ? 'data-service' : `service`}`), [
                schematics_1.template(Object.assign(Object.assign({}, core_1.strings), options)),
                schematics_1.move(movePath)
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        })
    ]);
}
exports.spectatorServiceSchematic = spectatorServiceSchematic;
function spectatorDirectiveSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'directive', Object.assign(Object.assign({}, options), { skipTests: true, spec: false })),
        (tree, _context) => __awaiter(this, void 0, void 0, function* () {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            yield _ensurePath(tree, options);
            const movePath = core_1.normalize(options.path || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/directive`), [
                schematics_1.template(Object.assign(Object.assign({}, core_1.strings), options)),
                schematics_1.move(movePath)
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        })
    ]);
}
exports.spectatorDirectiveSchematic = spectatorDirectiveSchematic;
function spectatorPipeSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'pipe', Object.assign(Object.assign({}, options), { skipTests: true, spec: false })),
        (tree, _context) => __awaiter(this, void 0, void 0, function* () {
            if (options.skipTests) {
                return schematics_1.noop;
            }
            yield _ensurePath(tree, options);
            const movePath = core_1.normalize(options.path || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/pipe`), [
                schematics_1.template(Object.assign(Object.assign({}, core_1.strings), options)),
                schematics_1.move(movePath)
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        })
    ]);
}
exports.spectatorPipeSchematic = spectatorPipeSchematic;
function _ensurePath(tree, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(tree);
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
    });
}
//# sourceMappingURL=index.js.map