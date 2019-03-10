import { apply, chain, externalSchematic, MergeStrategy, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { ComponentOptions, DirectiveOptions, ServiceOptions } from './schema';
import { normalize, strings } from '@angular-devkit/core';

export function spectatorComponentSchematic(options: ComponentOptions): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', {
      ...options,
      skipTests: true,
      spec: false
    }),
    (_tree: Tree, _context: SchematicContext): Rule => {
      const movePath = normalize(options.path + '/' + strings.dasherize(options.name) || '');
      const specTemplateRule = apply(url(`./files/${options.withHost ? 'component-host' : options.withCustomHost ? 'component-custom-host' : 'component'}`), [
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

export function spectatorServiceSchematic(options: ServiceOptions): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'service', {
      ...options,
      skipTests: true,
      spec: false
    }),
    (_tree: Tree, _context: SchematicContext): Rule => {
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
    (_tree: Tree, _context: SchematicContext): Rule => {
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
