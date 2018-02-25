import { readFiles } from './readFiles';

const series = require('async-array-methods').series;
const jsdoc2md = require('jsdoc-to-markdown');
const jetpack = require('fs-jetpack');
const path = require('path');

export function buildDocs(target = 'src', extension = 'js$|.jsx') {
  const outputDir = path.resolve(process.cwd(), 'docs/api');
  const summary = path.resolve(process.cwd(), 'docs/SUMMARY.md');

  /* verify and create a api doc dir */
  jetpack.existsAsync(outputDir).then(exist => {
    if (!exist) {
      jetpack.dir(outputDir);
    }
  });

  return new Promise(async (resolve, reject) => {
    const src = path.resolve(process.cwd(), target);

    // criar inputFiles target
    let inputFiles = '';

    // criar a regex com extension
    const inputFilesRegex = new RegExp('(.' + extension + ')$');

    const checkSrc = await jetpack.existsAsync(src);

    // verificar se regex
    if (!(inputFilesRegex instanceof RegExp)) {
      return reject(`${extension} invalid as regExp Object`);
    }

    // verificar se regex
    if (!checkSrc) {
      return reject(`${src} don't exist`);
    }

    inputFiles = path.resolve(process.cwd(), `${src}/**/*`);

    // leia todos os arquivos
    const allFiles = await readFiles(src, inputFilesRegex);

    resolve(templateData);
  });
}

buildDocs('src');

// readAllFiles(src)
//   .then(readFileResp => {
//     jsdoc2md.getTemplateData({ files: inputFile })
//       .then(templateResp => {

//         const members = templateResp.reduce((names, item) => {
//           const memberofCondition = !item.meta && item.memberof
//           if (memberofCondition) { names.push(item) }
//           return names
//         }, []);

//         const filenames = templateResp.reduce((names, item) => {
//           const filenameCondition = item.meta && item.meta.filename

//           if (filenameCondition && names[item.meta.filename]) {
//             const lastVerify = names[item.meta.filename].find(file => file.id === item.id)
//             if (!lastVerify) { names[item.meta.filename].push(item) }
//           } else  if (filenameCondition && !names[item.meta.filename]) {
//             names = {
//               ...names,
//               [item.meta.filename]: [item]
//             }
//           }
//           return names
//         }, [])

//         const templateTree = { ...filenames }

//         const writedFiles = []

//         for (const name in filenames) {
//           const file = [ ...filenames[name] ]
//           for (const member of members) {
//               if (file.find(item => item.id === member.memberof)) {
//                 templateTree[name].push(member);
//               }
//           }
//         }

//         for (const name in templateTree) {
//           const output = jsdoc2md.renderSync({data: templateTree[name]})
//           jetpack.write(path.resolve(outputDir, `${name}.md`), output);
//           const fileInclude = readFileResp.filter(file => file.name === name)
//           writedFiles.push(...fileInclude)
//         }

//         writeSummary(summary, writedFiles);
//       }, [])
//   })
