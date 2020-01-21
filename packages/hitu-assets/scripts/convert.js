const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = new JSDOM();

const LIB_PATH = 'lib';

var $ = require('jquery')(window);

function toModuleName(path) {
  return path.slice(`${LIB_PATH}/`.length).replace('.tsx', '');
}

glob('svgs/**/*.svg', {}, function(er, files) {
  fs.removeSync(LIB_PATH);
  fs.ensureDirSync(LIB_PATH);

  const tsxList = [];

  // files = files.filter(f => f.includes('盆栽')).slice(0, 1);

  files.forEach(file => {
    console.log('Convert:', file);

    // Path name
    const tsxPath = path.join(
      LIB_PATH,
      file.replace(/[\/\.]+/g, '_').replace('_svg', '.tsx'),
    );
    tsxList.push(tsxPath);

    // Module name
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

  let indexText = '';
  tsxList.forEach(path => {
    indexText += `export { default as ${toModuleName(
      path,
    )} } from '${path.replace(LIB_PATH, '.').replace('.tsx', '')}'\n`;
  });

  console.log(indexText);
  fs.writeFileSync(path.join(LIB_PATH, 'index.tsx'), indexText, 'utf8');
});
