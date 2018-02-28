const jetpack = require('fs-jetpack');
const path = require('path');

/**
 * @function writeSummary
 * @param {Array<{ name: String, type: String, size: Number}>} contentList list of content menu summary
 * @param {String} summaryPath path for summary directory
 * @returns {void}
 */
async function writeSummary(
  contentList,
  summaryPath = path.resolve(process.cwd(), 'SUMMARY.md'),
) {
  const summaryPathRegex = /\.md$/;

  function checkContentList(content) {
    return content.hasOwnProperty('name');
  }

  return new Promise((resolve, reject) => {
    if (!summaryPathRegex.test(summaryPath)) {
      return reject('summary is not defined as a markdown file');
    }

    if (contentList.length < 1) {
      return reject('contentList must to have 1 or more files');
    }

    if (!contentList.every(checkContentList)) {
      return reject(
        'some Object in content List array dont have a name attribute',
      );
    }

    const content = contentList.map(
      item => `\n* [${item.name}](docs/api/${item.name}.md)`,
    );

    jetpack.readAsync(summaryPath).then(resp => {
      const writed =
        '# Summary\n\n* [Introduction](README.md)' + content.join('');

      jetpack
        .writeAsync(summaryPath, writed)
        .then(resp => resolve('summary clear'));
    });
  });
}

export { writeSummary };
