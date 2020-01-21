const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const jsdom = require('jsdom');
const chalk = require('chalk');

const englishMapping = require('./englishMapping');

const { JSDOM } = jsdom;
const { window } = new JSDOM();

const LIB_PATH = 'lib';

var $ = require('jquery')(window);

function toModuleName(path) {
  return path.slice(`${LIB_PATH}/`.length).replace('.tsx', '');
}

function toEnglish(path) {
  let retPath = path;
  const names = Object.keys(englishMapping).sort((a, b) => b.length - a.length);
  names.forEach(name => {
    retPath = retPath.replace(name, englishMapping[name]);
  });

  return retPath;
}

glob('svg/**/*.svg', {}, function(er, files) {
  console.log(
    chalk.yellow('Find'),
    chalk.green(files.length),
    chalk.yellow('assets'),
  );

  fs.removeSync(LIB_PATH);
  fs.ensureDirSync(LIB_PATH);

  const tsxList = new Set();

  // files = files.filter(f => f.includes('盆栽')).slice(0, 1);

  files.forEach(file => {
    // ==================== Path name ====================
    let tsxPath = path.join(
      LIB_PATH,
      file
        .replace('.svg', '_tsx')
        .replace('svg/', '')
        .replace(/\d+\./g, '')
        .replace(/\//g, '_')
        .replace('_tsx', '.tsx'),
    );

    tsxPath = toEnglish(tsxPath);

    if (tsxList.has(tsxPath)) {
      throw new Error(`Name duplicated: ${file} - ${tsxPath}`);
    }
    tsxList.add(tsxPath);

    console.log('Convert:', file, '->', tsxPath);

    // =================== Module name ===================
    const moduleName = toModuleName(tsxPath);

    let text = fs.readFileSync(file, 'utf8').replace(/\<\?[^>]*>/, '');

    // Replace mask id
    const ele = $(`<div>${text}</div>`);
    ele.find('mask').each(function() {
      const id = $(this).attr('id');
      $(this).attr('id', `${moduleName}-${id}`);
    });

    ele.find('[mask]').each(function() {
      const maskIdMatch = ($(this).attr('mask') || '').match(/^url\(#(.*)\)$/);
      if (maskIdMatch) {
        $(this).attr('mask', `url(#${moduleName}-${maskIdMatch[1]})`);
      }
    });

    // Replace defs id
    ele
      .find('defs')
      .children()
      .each(function() {
        const id = $(this).attr('id');
        $(this).attr('id', `${moduleName}-${id}`);
      });

    ele.find('[xlink\\:href]').each(function() {
      const id = $(this).attr('xlink:href');
      $(this).attr('xlink:href', `#${moduleName}-${id.slice(1)}`);
    });

    const viewBoxMatch = text.match(/viewBox="([^"]+)"/);
    let additionalInfo;
    if (viewBoxMatch) {
      const values = viewBoxMatch[1].trim().split(/\s+/);
      additionalInfo = `
      SVG.width = ${values[2]};
      SVG.height = ${values[3]};
      `;
    }

    const fileContent = `
    import * as React from 'react';
    const SVG = () => (
      <svg dangerouslySetInnerHTML={{ __html: \`${ele.html()}\` }} />
    )

    ${additionalInfo}

    export default SVG;
    `;
    fs.writeFileSync(tsxPath, fileContent, 'utf8');
  });

  // ==================== Entry Index ====================
  let indexText = '';
  tsxList.forEach(path => {
    indexText += `export { default as ${toModuleName(
      path,
    )} } from '${path.replace(LIB_PATH, '.').replace('.tsx', '')}'\n`;
  });

  fs.writeFileSync(path.join(LIB_PATH, 'index.tsx'), indexText, 'utf8');
});
