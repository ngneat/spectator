'use strict';
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const fsExt = require('fs-extra');

function composeRelease(config) {
  const releasesDir = config.releaseDirName;
  const packageOut = path.join(config.distDir, 'packages', config.packageName);
  const releasePath = path.join(config.distDir, releasesDir, config.packageName);
  const name = config.packageName;

  inlinePackageMetadataFiles(packageOut);

  // Copy all d.ts and metadata files to the `/` directory
  // copyFiles(packageOut, '**/*(.+(d.ts|metadata.json)&!(index.*))', path.join(releasePath, ''));
  copyFiles(packageOut, '**/*.+(d.ts|metadata.json)', path.join(releasePath, ''));

  // Copy UMD bundles.
  copyFiles(path.join(config.bundlesDir, name), `**/*.umd?(.min).js?(.map)`, path.join(releasePath, 'bundles'), true);

  // Copy ES5 bundles.
  copyFiles(config.bundlesDir, `${name}.es5.js?(.map)`, path.join(releasePath, 'esm5'));
  copyFiles(path.join(config.bundlesDir, name), `**/*.es5.js?(.map)`, path.join(releasePath, 'esm5'));

  // Copy ES2015 bundles
  copyFiles(config.bundlesDir, `${name}.js?(.map)`, path.join(releasePath, 'esm2015'));
  copyFiles(path.join(config.bundlesDir, name), `**/!(*.es5|*.umd).js?(.map)`, path.join(releasePath, 'esm2015'));

  // Copy any additional files that belong in the package.
  // copyFiles(projectDir, 'LICENSE', releasePath);
  // copyFiles(packagesDir, 'README.md', releasePath);
  copyFiles(config.sourceDir, 'package.json', releasePath);

  //copy all scss files from core
  copyFiles(path.join(config.sourceDir, 'core'), '**/*.scss', path.join(releasePath, 'core'));

  // replaceVersionPlaceholders(releasePath);
  //createTypingsReexportFile(releasePath, './typings/index', name);
  //createMetadataReexportFile(releasePath, './typings/index', name);

  if (config.src) {
    config.packageOut = packageOut;
    createFilesForSrc(config, releasePath);
  }

  fs.renameSync(path.join(config.distDir, releasesDir, name, 'index.d.ts'),
            path.join(config.distDir, releasesDir, name, `${name}.d.ts`));

  fs.renameSync(path.join(config.distDir, releasesDir, name, 'index.metadata.json'),
            path.join(config.distDir, releasesDir, name, `${name}.metadata.json`));
}

function inlinePackageMetadataFiles(packagePath) {
  // Create a map of fileName -> fullFilePath. This is needed because the templateUrl and
  // styleUrls for each component use just the filename because, in the source, the component
  // and the resources live in the same directory.
  const componentResources = new Map();

  glob.sync(path.join(packagePath, '**/*.+(html|css|scss)')).forEach(resourcePath => {
    componentResources.set(path.basename(resourcePath), resourcePath);
  });

  // Find all metadata files. For each one, parse the JSON content, inline the resources, and
  // reserialize and rewrite back to the original location.
  glob.sync(path.join(packagePath, '**/*.metadata.json')).forEach(path => {
    const metadata = JSON.parse(fs.readFileSync(path, 'utf-8'));
    inlineMetadataResources(metadata, componentResources);
    fs.writeFileSync(path, JSON.stringify(metadata), 'utf-8');
  });
}

function inlineMetadataResources(metadata, componentResources) {
  // Convert `templateUrl` to `template`
  if (metadata.templateUrl) {
    const fullResourcePath = componentResources.get(path.basename(metadata.templateUrl));
    metadata.template = fs.readFileSync(fullResourcePath, 'utf-8');
    delete metadata.templateUrl;
  }

  // Convert `styleUrls` to `styles`
  if (metadata.styleUrls && metadata.styleUrls.length) {
    metadata.styles = [];
    for (const styleUrl of metadata.styleUrls) {
      let style = styleUrl;
      if (style.substr(style.lastIndexOf(".")) === '.scss') {
        style = style.substr(0, style.lastIndexOf(".")) + ".css";
      }
      const fullResourcePath = componentResources.get(path.basename(style));
      metadata.styles.push(fs.readFileSync(fullResourcePath, 'utf-8'));
    }
    delete metadata.styleUrls;
  }

  // We we did nothing at this node, go deeper.
  if (!metadata.template && !metadata.styles) {
    for (const property in metadata) {
      if (typeof metadata[property] == 'object' && metadata[property]) {
        inlineMetadataResources(metadata[property], componentResources);
      }
    }
  }
}

function copyFiles(fromPath, fileGlob, outDir, flatten = false) {
  glob.sync(fileGlob, {
    cwd: fromPath
  }).forEach(filePath => {
    const fileDestPath = path.join(outDir, filePath);
    fsExt.mkdirpSync(path.dirname(fileDestPath));
    fsExt.copySync(path.join(fromPath, filePath), fileDestPath);
  });
}

function flatten(filePath, flatten) {
  return flatten ? filePath.replace(/\//g, '-') : filePath;
}

function createTypingsReexportFile(outDir, from, fileName) {
  fsExt.writeFileSync(path.join(outDir, `${fileName}.d.ts`),
    `export * from '${from}';\n`,
    'utf-8');
}

function createMetadataReexportFile(destDir, from, name, root = false) {
  from = Array.isArray(from) ? from : [from];

  const metadataJson = {
    __symbolic: 'module',
    version: 3,
    metadata: {},
    exports: from.map(f => ({
      from: f
    })),
    flatModuleIndexRedirect: true
  }

  if (root) {
    metadataJson.importAs = `${name}`;
  }

  const metadataJsonContent = JSON.stringify(metadataJson, null, 2);
  fsExt.writeFileSync(path.join(destDir, `${name}.metadata.json`), metadataJsonContent, 'utf-8');
}

function createFilesForSrc(config, releasePath) {
  const name = config.packageName;
  const packageOut = config.packageOut;

  // Create a directory in the root of the package for src that contains
  // * A package.json that lists the different bundle locations
  // * An index.d.ts file that re-exports the index.d.ts from the typings/ directory
  // * A metadata.json re-export for this entry-point's metadata.
  const srcDir = path.join(releasePath, config.src);

  fsExt.mkdirpSync(srcDir);

  // Copy typings and metadata from tsc output location into the entry-point.
  copyFiles(
    path.join(packageOut, config.src),
    '**/*.+(d.ts|metadata.json)',
    path.join(srcDir, ''));
}

module.exports = composeRelease;
module.exports.composeRelease = composeRelease;
