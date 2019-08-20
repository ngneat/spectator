import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from 'schematics-utilities';

import { Schema } from './schema';

function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [{ type: NodeDependencyType.Dev, version: '~3.2.1', name: '@ngneat/spectator' }];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.info(`✅️ Added "${dependency.name}" into ${dependency.type}`);
    });

    return host;
  };
}

function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.info(`🔍 Installing packages...`);

    return host;
  };
}

function showGreeting(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.info('👏 Create your first spectator test by checkout docs: https://netbasal.gitbook.io/spectator/');
    context.logger.info(
      '🙀 Last but Not Least, Have you Heard of Akita? https://netbasal.com/introducing-akita-a-new-state-management-pattern-for-angular-applications-f2f0fab5a8'
    );

    return host;
  };
}

export default function(options: Schema): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addPackageJsonDependencies(),
    options && options.skipInstall ? noop() : installPackageJsonDependencies(),
    options && options.skipGreeting ? noop() : showGreeting()
  ]);
}
