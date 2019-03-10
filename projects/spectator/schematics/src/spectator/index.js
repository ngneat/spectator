"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function spectatorComponentSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'component', Object.assign({}, options, { skipTests: true, spec: false })),
        (_tree, _context) => {
            const movePath = core_1.normalize(options.path + '/' + core_1.strings.dasherize(options.name) || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/${options.withHost ? 'component-host' : options.withCustomHost ? 'component-custom-host' : 'component'}`), [
                schematics_1.template(Object.assign({}, core_1.strings, options)),
                schematics_1.move(movePath)
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        }
    ]);
}
exports.spectatorComponentSchematic = spectatorComponentSchematic;
function spectatorServiceSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'service', Object.assign({}, options, { skipTests: true, spec: false })),
        (_tree, _context) => {
            const movePath = core_1.normalize(options.path || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/${options.isDataService ? 'data-service' : `service`}`), [
                schematics_1.template(Object.assign({}, core_1.strings, options)),
                schematics_1.move(movePath)
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        }
    ]);
}
exports.spectatorServiceSchematic = spectatorServiceSchematic;
function spectatorDirectiveSchematic(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'directive', Object.assign({}, options, { skipTests: true, spec: false })),
        (_tree, _context) => {
            const movePath = core_1.normalize(options.path || '');
            const specTemplateRule = schematics_1.apply(schematics_1.url(`./files/directive`), [
                schematics_1.template(Object.assign({}, core_1.strings, options)),
                schematics_1.move(movePath)
            ]);
            return schematics_1.mergeWith(specTemplateRule, schematics_1.MergeStrategy.Default);
        }
    ]);
}
exports.spectatorDirectiveSchematic = spectatorDirectiveSchematic;
//# sourceMappingURL=index.js.map