import { readFiles } from '../readFiles';

const jetpack = require('fs-jetpack');
const path = require('path');



describe('readFiles', () => {
  //prepare for the tests
  const tempDist = path.resolve(process.cwd(), 'temp');
  const srcMock = path.resolve(tempDist, 'src_mock');
  const fakeSrcPath = './fakePath';
  const { writeAsync } = jetpack;
  const regexDefault = /(\.js$|\.jsx$)/;

  beforeAll( async () => {
    await writeAsync(`${srcMock}/firstJs.js`, '');
    await writeAsync(`${srcMock}/secondJs.js`, '');
    await writeAsync(`${srcMock}/thirdJs.js`, '');
    await writeAsync(`${srcMock}/firstCss.css`, '');
    await writeAsync(`${srcMock}/firstComponent/FirstJsx.jsx`, '');
    await writeAsync(`${srcMock}/firstComponent/SecondJsx.jsx`, '');
    await writeAsync(`${srcMock}/firstComponent/fourthJs.js`, '');
    await writeAsync(`${srcMock}/firstComponent/secondCs.css`, '');
    await writeAsync(`${srcMock}/secondComponents/fifthJs.js`, '');
    await writeAsync(`${srcMock}/secondComponents/sixthJs.js`, '');
    await writeAsync(`${srcMock}/secondComponents/child/ThirdJsx.jsx`, '');
    await writeAsync(`${srcMock}/secondComponents/child/seventhJs.js`, '');
    await writeAsync(`${srcMock}/secondComponents/child/thirdCss.css`, '');
    await writeAsync(`${srcMock}/secondComponents/child/eighthJs.js`, '');
    await writeAsync(`${srcMock}/secondComponents/child/ninethJs.js`, '');
  });

  afterAll(() => {
    jetpack.remove(tempDist)
  });

  test('return list of 12 files', async () => {
    const listFiles = await readFiles(srcMock);
    expect(listFiles.length).toBe(12);
  });


  test('return only js and jsx file extension', async () => {
    const listFiles = await readFiles(srcMock);
    const filesCheck = listFiles.every(
      file => regexDefault.test(file.name)
    )
    expect(filesCheck).toBeTruthy();
  });

  test('return [{name: String, type: String, size: Number}] formater ', async () => {
    const listFiles = await readFiles(srcMock);
    const checkObjectType = listFiles.every(
      file => (
        file.hasOwnProperty('name')
        && file.hasOwnProperty('type')
        && file.hasOwnProperty('size')
    ));

    expect(checkObjectType).toBeTruthy();
  });

  test('return list of 3 files as jsx extension', async () => {
    const listFiles = await readFiles(srcMock, /(\.jsx)$/);
    expect(listFiles.length).toBe(3);
  });

  test('src path dont exist', async () => {
    let errorMessage = '';

    try {
      await readFiles(fakeSrcPath);
    } catch (e) {
      errorMessage = e;
    }

    expect(errorMessage).toBe('src path dont exist');
  });

  test('regExtension invali as a regExp Object', async () => {
    let errorMessage = '';

    try {
      await readFiles(srcMock, 'carambolas');
    } catch (e) {
      errorMessage = e;
    }

    expect(errorMessage).toBe('regExtensions invalid as regExp Object');
  });

});
