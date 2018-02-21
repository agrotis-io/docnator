const series = require('async-array-methods').series;
const jetpack = require('fs-jetpack');
const path = require('path');

/**
 * @function readAllFiles read all js and jsx extension files of diretory(src) and your sub directories.
 * @param {String} src path of files projects that must be documented
 * @param {RegExp} [regExtension=/(\.js$|\.jsx$)/] -  regex for extension files for search
 * @returns {Promise<[String]>} list of all files
 */
async function readFiles(src, regExtensions = /(\.js$|\.jsx$)/) {
  return new Promise(async (resolve, reject) => {
    const dirs = [];
    const files = [];

    await jetpack.existsAsync(src).then(exist => {
      if (!exist) {
        return reject('src path dont exist');
      }
    });

    await jetpack.inspectTreeAsync(src).then(resp => {
      files = resp.children.filter(item => {
        return item.type === 'file' && regExtensions.test(item.name);
      });

      dirs = resp.children.filter(item => item.type === 'dir');
    });

    if (files.length < 1) {
      return reject('0 files found');
    }

    if (!(regExtensions instanceof RegExp)) {
      return reject('regExtensions invalid as regExp Object');
    }

    await series(dirs, async dir => {
      const newPath = path.resolve(src, dir.name);
      return readFiles(newPath).then(resp => resp);
    })
      .then(resp => {
        resp.forEach(item => {
          files.push(...item);
        });
      })
      .then(() => {
        resolve(files);
      });
  });
}

export { readFiles };
