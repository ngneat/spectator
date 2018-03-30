// https://github.com/filipesilva/angular-quickstart-lib/blob/master/inline-resources.js
'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob').sync;

const dirname = require('path').dirname;
const join = require('path').join;
const readFileSync = require('fs').readFileSync;
const writeFileSync = require('fs').writeFileSync;

function inlineResourcesForDirectory(folderPath) {
  glob(join(folderPath, '**/*.ts')).forEach(filePath => inlineResources(filePath));
}

/**
 * Inline resources in a tsc/ngc compilation.
 * @param projectPath {string} Path to the project.
 */
function inlineResources(filePath) {
  let fileContent = readFileSync(filePath, 'utf-8');

  fileContent = inlineTemplate(fileContent, filePath);
  fileContent = inlineStyles(fileContent, filePath);
  fileContent = removeModuleId(fileContent);

  writeFileSync(filePath, fileContent, 'utf-8');
}

function inlineTemplate(fileContent, filePath) {
  return fileContent.replace(/templateUrl:\s*'([^']+?\.html)'/g, (_match, templateUrl) => {
    const templatePath = join(dirname(filePath), templateUrl);
    const templateContent = loadResourceFile(templatePath);
    return `template: "${templateContent}"`;
  });
}

function inlineStyles(fileContent, filePath) {
  return fileContent.replace(/styleUrls:\s*(\[[\s\S]*?])/gm, (_match, styleUrlsValue) => {
    // The RegExp matches the array of external style files. This is a string right now and
    // can to be parsed using the `eval` method. The value looks like "['AAA.css', 'BBB.css']"
    const styleUrls = eval(styleUrlsValue);

    const styleContents = styleUrls
      .map(url => join(dirname(filePath), url).replace(/.scss$/i, ".css"))
      .map(path => loadResourceFile(path));

    return `styles: ["${styleContents.join(' ')}"]`;
  });
}

function removeModuleId(fileContent) {
  return fileContent.replace(/\s*moduleId:\s*module\.id\s*,?\s*/gm, '');
}

function loadResourceFile(filePath) {
  return readFileSync(filePath, 'utf-8')
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/g, '\\"');
}


module.exports = inlineResources;
module.exports.inlineResourcesForDirectory = inlineResourcesForDirectory;
