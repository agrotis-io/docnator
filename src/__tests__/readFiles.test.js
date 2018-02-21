import { readFiles } from '../readFiles';

const jetpack = require('fs-jetpack');
const path = require('path');

describe('readFiles', () => {
  //prepare for the tests
  const srcMock = path.resolve(__dirname, 'src_mock');
  const { write } = jetpack;

  write(`${srcMock}/firstJs.js`, '');
  write(`${srcMock}/secondJs.js`, '');
  write(`${srcMock}/thirdJs.js`, '');
  write(`${srcMock}/firstCss.css`, '');
  write(`${srcMock}/firstComponent/FirstJsx.jsx`, '');
  write(`${srcMock}/firstComponent/SecondJsx.jsx`, '');
  write(`${srcMock}/firstComponent/fourthJs.js`, '');
  write(`${srcMock}/firstComponent/secondCs.css`, '');
  write(`${srcMock}/secondComponents/fifthJs.js`, '');
  write(`${srcMock}/secondComponents/sixthJs.js`, '');
  write(`${srcMock}/secondComponents/child/ThirdJsx.jsx`, '');
  write(`${srcMock}/secondComponents/child/seventhJs.js`, '');
  write(`${srcMock}/secondComponents/child/thirdCss.css`, '');
  write(`${srcMock}/secondComponents/child/eighthJs.js`, '');
  write(`${srcMock}/secondComponents/child/ninethJs.js`, '');

  test('return list of 12 files as js and jsx extension', async () => {});

  test('return [{name: String, type: String, size: Number}] formater ', async () => {});

  test('return list of 3 files as jsx extension', async () => {});

  test('src path dont exist', async () => {});

  test('src directory is empty', async () => {});

  test('regExtension invali as a regExp Object', async () => {});

  jetpack.remove(srcMock);
});
