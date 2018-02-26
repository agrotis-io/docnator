const series = require('async-array-methods').series;
const jetpack = require('fs-jetpack');
const path = require('path');

/**
 * @function readAllFiles
 * @param {String} src path of files projects that must be documented
 * @param {RegExp} [regExtension=/(\.js$|\.jsx$)/] -  regex for extension files for search
 * @returns {Promise<Array<{name: String, type: String, size: Number}>>} list of all files
 */
async function readFiles(src, regExtensions = /(\.js$|\.jsx$)/) {
  return new Promise(async (resolve, reject) => {
    let dirs = [];
    let files = [];

    if (!(regExtensions instanceof RegExp)) {
      return reject('regExtensions invalid as regExp Object');
    }

    await jetpack.existsAsync(src).then(exist => {
      if (!exist) {
        return reject('src path dont exist');
      }
    });

    await jetpack.inspectTreeAsync(src).then(resp => {
      files = resp.children.filter(item => {
        if (item.type === 'file' && regExtensions.test(item.name)) {
          return item;
        }
      });

      dirs = resp.children.filter(item => item.type === 'dir');
    });

    await series(dirs, async dir => {
      const newPath = path.resolve(src, dir.name);
      return readFiles(newPath, regExtensions).then(resp => resp);
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
