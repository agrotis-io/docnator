import { readFiles } from './readFiles';

const jsdoc2md = require('jsdoc-to-markdown');
const jetpack = require('fs-jetpack');
const path = require('path');

/**
 * @function mountTemplateDataFileName
 * @param {Array<{ meta: { fileName: String }}>} template response of jsdoc2md.getTemplateData.
 * @return {Object<Array<Object>>} list of template Objects
 */
function mountTemplateDataFileName(template) {
  if (!(template && template[0])) {
    return [];
  }

  return template.reduce((data, item) => {
    const filenameCondition = item.meta && item.meta.filename;

    if (filenameCondition && data[item.meta.filename]) {
      const lastVerify = data[item.meta.filename].find(
        file => file.id === item.id,
      );

      if (!lastVerify) {
        data[item.meta.filename].push(item);
      }
    } else if (filenameCondition && !data[item.meta.filename]) {
      data = {
        ...data,
        [item.meta.filename]: [item],
      };
    }

    return data;
  }, {});
}

/**
 * @function buildDocs
 * @param {String} [target='src']  - target to read the jsdocs in source files
 * @param {String} [extension='js$.jsx'] - extension for regex check files extension
 * @return {String} return a resolve message
 **/

async function buildDocs(target = 'src', extension = 'js$|.jsx') {
  const outputDir = path.resolve(process.cwd(), 'docs/api');
  const summary = path.resolve(process.cwd(), 'docs/SUMMARY.md');

  /* create a api doc dir */
  jetpack.dir(outputDir);

  return new Promise(async (resolve, reject) => {
    const src = path.resolve(process.cwd(), target);

    // criar inputFiles target
    let inputFiles = '';
    let allFiles = [];
    let templateData = {};
    let fileNames = [];
    let writedFiles = [];

    // criar a regex com extension
    const inputFilesRegex = new RegExp('(.' + extension + ')$');

    const checkSrc = await jetpack.existsAsync(src);

    // verificar se regex
    if (!(inputFilesRegex instanceof RegExp) || typeof extension !== 'string') {
      return reject(`${extension} invalid as regExp Object`);
    }

    // verificar se regex
    if (checkSrc !== 'dir') {
      return reject(`${src} don't exist`);
    }

    inputFiles = path.resolve(process.cwd(), `${src}/**/*`);
    allFiles = await readFiles(src, inputFilesRegex);
    templateData = await jsdoc2md.getTemplateData({ files: inputFiles });
    fileNames = mountTemplateDataFileName(templateData);

    for (const name in fileNames) {
      const output = jsdoc2md.renderSync({ data: fileNames[name] });
      jetpack.write(path.resolve(outputDir, `${name}.md`), output);
      const fileInclude = allFiles.filter(file => file.name === name);
      writedFiles.push(...fileInclude);
    }

    resolve('docs generateds');
  });
}

export { mountTemplateDataFileName, buildDocs };
