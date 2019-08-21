"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const schematics_utilities_1 = require("schematics-utilities");
function addPackageJsonDependencies() {
    return (host, context) => {
        const dependencies = [{ type: schematics_utilities_1.NodeDependencyType.Dev, version: '~3.2.1', name: '@ngneat/spectator' }];
        dependencies.forEach(dependency => {
            schematics_utilities_1.addPackageJsonDependency(host, dependency);
            context.logger.info(`✅️ Added "${dependency.name}" into ${dependency.type}`);
        });
        return host;
    };
}
function installPackageJsonDependencies() {
    return (host, context) => {
        context.addTask(new tasks_1.NodePackageInstallTask());
        context.logger.info(`🔍 Installing packages...`);
        return host;
    };
}
function showGreeting() {
    return (host, context) => {
        context.logger.info('👏 Create your first spectator test by checkout docs: https://netbasal.gitbook.io/spectator/');
        context.logger.info('🙀 Last but Not Least, Have you Heard of Akita? https://netbasal.com/introducing-akita-a-new-state-management-pattern-for-angular-applications-f2f0fab5a8');
        return host;
    };
}
function default_1(options) {
    return schematics_1.chain([
        options && options.skipPackageJson ? schematics_1.noop() : addPackageJsonDependencies(),
        options && options.skipInstall ? schematics_1.noop() : installPackageJsonDependencies(),
        options && options.skipGreeting ? schematics_1.noop() : showGreeting()
    ]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map