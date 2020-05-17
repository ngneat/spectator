---
id: schematics 
title: Schematics
---

Generate component, service, and directive with Spectator spec templates with Angular Cli: (when using it as default)

**Component**
* Default spec: `ng g cs dashrized-name`
* Spec with a host: `ng g cs dashrized-name --withHost=true`
* Spec with a custom host: `ng g cs dashrized-name --withCustomHost=true`

**Service:**
* Default spec: `ng g ss dashrized-name`
* Spec for testing http data service: `ng g ss dashrized-name --isDataService=true`

**Directive:**

`ng g ds dashrized-name`

## Default Schematics Collection

To use `spectator` as the default collection in your Angular CLI project,
add it to your `angular.json`:

```sh
ng config cli.defaultCollection @ngneat/spectator
```

The `spectator` schematics extend the default `@schematics/angular` collection. If you want to set defaults for schematics such as generating components with scss file, you must change the schematics package name from `@schematics/angular` to `@ngneat/spectator` in `angular.json`:

```json
"schematics": {
  "@ngneat/spectator:spectator-component": {
    "style": "scss"
  }
}
```
