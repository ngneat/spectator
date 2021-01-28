import { normalize, strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  externalSchematic,
  mergeWith,
  move,
  template,
  url,
  MergeStrategy,
  Rule,
  SchematicContext,
  Tree,
  noop
} from '@angular-devkit/schematics';
import { buildDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';
import { parseName } from '@schematics/angular/utility/parse-name';

import { ComponentOptions, DirectiveOptions, ServiceOptions } from './schema';

export function spectatorComponentSchematic(options: ComponentOptions): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', {
      ...options,
      skipTests: true,
      spec: false
    }),
    async (tree: Tree, _context: SchematicContext): Promise<Rule> => {
      if (options.skipTests) {
        return noop;
      }

      await _ensurePath(tree, options);
      const movePath = options.flat ? (options.path as string) : normalize(options.path + '/' + strings.dasherize(options.name) || '');

      const specTemplateRule = apply(
        url(`./files/${options.withHost ? 'component-host' : options.withCustomHost ? 'component-custom-host' : 'component'}`),
        [
          template({
            ...strings,
            ...options
          }),
          move(movePath)
        ]
      );

      return mergeWith(specTemplateRule, MergeStrategy.Default);
    }
  ]);
}

export function spectatorServiceSchematic(options: ServiceOptions): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'service', {
      ...options,
      skipTests: true,
      spec: false
    }),
    async (tree: Tree, _context: SchematicContext): Promise<Rule> => {
      if (options.skipTests) {
        return noop;
      }

      await _ensurePath(tree, options);
      const movePath = normalize(options.path || '');
      const specTemplateRule = apply(url(`./files/${options.isDataService ? 'data-service' : `service`}`), [
        template({
          ...strings,
          ...options
        }),
        move(movePath)
      ]);

      return mergeWith(specTemplateRule, MergeStrategy.Default);
    }
  ]);
}

export function spectatorDirectiveSchematic(options: DirectiveOptions): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'directive', {
      ...options,
      skipTests: true,
      spec: false
    }),
    async (tree: Tree, _context: SchematicContext): Promise<Rule> => {
      if (options.skipTests) {
        return noop;
      }

      await _ensurePath(tree, options);
      const movePath = normalize(options.path || '');
      const specTemplateRule = apply(url(`./files/directive`), [
        template({
          ...strings,
          ...options
        }),
        move(movePath)
      ]);

      return mergeWith(specTemplateRule, MergeStrategy.Default);
    }
  ]);
}

export function spectatorPipeSchematic(options: DirectiveOptions): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'pipe', {
      ...options,
      skipTests: true,
      spec: false
    }),
    async (tree: Tree, _context: SchematicContext): Promise<Rule> => {
      if (options.skipTests) {
        return noop;
      }

      await _ensurePath(tree, options);
      const movePath = normalize(options.path || '');
      const specTemplateRule = apply(url(`./files/pipe`), [
        template({
          ...strings,
          ...options
        }),
        move(movePath)
      ]);

      return mergeWith(specTemplateRule, MergeStrategy.Default);
    }
  ]);
}

async function _ensurePath(tree: Tree, options: any): Promise<void> {
  const workspace = await getWorkspace(tree);

  if (!options.project) {
    options.project = workspace.projects.keys().next().value;
  }

  const project = workspace.projects.get(options.project as string);

  if (options.path === undefined && project) {
    options.path = buildDefaultPath(project);
  }

  const parsedPath = parseName(options.path as string, options.name);
  options.name = parsedPath.name;
  options.path = parsedPath.path;
}
