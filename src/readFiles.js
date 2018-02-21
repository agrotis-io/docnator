const series = require('async-array-methods').series;
const jetpack = require('fs-jetpack');
const path = require('path');

/**
 * @function readAllFiles read all js and jsx extension files of diretory(src) and your sub directories.
 * @param {String} src path of files projects that must be documented
 * @param {RegExp} [regExtension=/(\.js$|\.jsx$)/] -  regex for extension files for search
 * @returns {Promise<[String]>} list of all files
 */
async function readAllFiles(src, regExtensions = /(\.js$|\.jsx$)/) {
  const tree = await jetpack.inspectTreeAsync(src);

  let files = tree.children.filter(item => {
    return item.type === 'file' && regExtensions.test(item.name);
  });

  const dirs = tree.children.filter(item => item.type === 'dir');

  if (dirs.length !== 0) {
    await series(dirs, async dir => {
      const newPath = path.resolve(src, dir.name);

      return readAllFiles(newPath).then(resp => resp);
    }).then(resp => {
      resp.forEach(item => {
        files.push(...item);
      });
    });
  }

  return files;
}

export { readAllFiles };
