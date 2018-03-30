'use strict';

const path = require('path'),
  spawn = require('child_process').spawn,
  fs = require('fs'),
  glob = require('glob'),
  ts = require('typescript'),
  rollup = require('rollup'),
  chalk = require('chalk'),
  sorcery = require('sorcery');

let rollupGlobals = require('./rollup-globals');

async function createRollupBundle(config) {
  const bundleOptions = {
    context: 'this',
    external: Object.keys(rollupGlobals),
    input: config.entry,
    onwarn: (message) => {
      if (/but never used/.test(message)) {
        return false;
      }
      console.warn(message);
    }
  };

  const writeOptions = {
    name: config.moduleName,
    format: config.format,
    file: config.dest,
    globals: rollupGlobals,
    sourcemap: true
  };

  // For UMD bundles, we need to adjust the `external` bundle option in order to include
  // all necessary code in the bundle.
  if (config.format === 'umd') {
    let external = Object.keys(rollupGlobals);
    bundleOptions.external = external;
  }

  return rollup.rollup(bundleOptions).then((bundle) => bundle.write(writeOptions));
}

async function remapSourcemap(sourceFile) {
  // Once sorcery loaded the chain of sourcemaps, the new sourcemap will be written asynchronously.
  return (await sorcery.load(sourceFile)).write();
}

/** Reads a input file and transpiles it into a new file. */
function transpileFile(inputPath, outputPath, options) {
  const inputFile = fs.readFileSync(inputPath, 'utf-8');
  const transpiled = ts.transpileModule(inputFile, {
    compilerOptions: options
  });

  if (transpiled.diagnostics) {
    reportDiagnostics(transpiled.diagnostics);
  }

  fs.writeFileSync(outputPath, transpiled.outputText);

  if (transpiled.sourceMapText) {
    fs.writeFileSync(`${outputPath}.map`, transpiled.sourceMapText);
  }
}

/** Formats the TypeScript diagnostics into a error string. */
function formatDiagnostics(diagnostics, baseDir = '') {
  return diagnostics.map(diagnostic => {
    let res = `• ${chalk.red(`TS${diagnostic.code}`)} - `;

    if (diagnostic.file) {
      const {
        line,
        character
      } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      const filePath = path.relative(baseDir, diagnostic.file.fileName);

      res += `${filePath}(${line + 1},${character + 1}): `;
    }
    res += `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`;

    return res;
  }).join('\n');
}

/** Checks and reports diagnostics if present. */
function reportDiagnostics(diagnostics, baseDir) {
  if (diagnostics && diagnostics.length && diagnostics[0]) {
    console.error(chalk.red(formatDiagnostics(diagnostics, baseDir)));
    throw new Error('TypeScript compilation failed.');
  }
}

async function bundleSrc(bundleConfig) {
  // Build FESM-2015 bundle file.
  await createRollupBundle({
    moduleName: bundleConfig.packageName,
    entry: bundleConfig.entryFile,
    dest: bundleConfig.esm2015Dest,
    format: 'es',
  });

  await remapSourcemap(bundleConfig.esm2015Dest);

  // Downlevel ES2015 bundle to ES5.
  transpileFile(bundleConfig.esm2015Dest, bundleConfig.esm5Dest, {
    importHelpers: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.ES2015,
    allowJs: true,
    newLine: ts.NewLineKind.LineFeed
  });

  await remapSourcemap(bundleConfig.esm5Dest);

  // Create UMD bundle of ES5 output.
  await createRollupBundle({
    moduleName: bundleConfig.packageName,
    entry: bundleConfig.esm5Dest,
    dest: bundleConfig.umdDest,
    format: 'umd'
  });

  await remapSourcemap(bundleConfig.umdDest);

}

async function bundlePrimarySrc(config) {
  rollupGlobals = Object.assign(rollupGlobals, {});
  return new Promise((resolve) => {
    bundleSrc({
      entryFile: path.join(config.outputDir, 'index.js'),
      esm2015Dest: path.join(config.bundlesDir, config.packageName, `${config.packageName}.js`),
      esm5Dest: path.join(config.bundlesDir, config.packageName, `${config.packageName}.es5.js`),
      umdDest: path.join(config.bundlesDir, config.packageName, `${config.packageName}.umd.js`),
      umdMinDest: path.join(config.bundlesDir, config.packageName, `${config.packageName}.umd.min.js`),
      packageName: config.packageName
    })
    .then(() => {
      resolve();
    });
  });
}

module.exports = bundlePrimarySrc;
module.exports.bundlePrimarySrc = bundlePrimarySrc;
