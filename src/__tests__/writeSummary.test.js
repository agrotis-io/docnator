import { writeSummary } from '../writeSummary';
const jetpack = require('fs-jetpack');
const path = require('path');

describe('writeSummary', () => {
  const summaryPathTest = path.resolve(__dirname, './summary_test.md');
  const fakeSummaryPath = 'fake_summary';
  const listDocsTest = [
    {
      name: 'carambolas.js',
      type: 'file',
      size: 1,
    },
    {
      name: 'quadrada.js',
      type: 'file',
      size: 2,
    },
    {
      name: 'melancia.js',
      type: 'file',
      size: 1,
    },
    {
      name: 'safadinha.js',
      type: 'file',
      size: 3,
    },
    {
      name: 'banana.js',
      type: 'file',
      size: 4,
    },
    {
      name: 'maca.js',
      type: 'file',
      size: 5,
    },
  ];

  const writeSummaryResultTest = `# Summary

* [Introduction](README.md)
* [carambolas.js](api/carambolas.js.md)
* [quadrada.js](api/quadrada.js.md)
* [melancia.js](api/melancia.js.md)
* [safadinha.js](api/safadinha.js.md)
* [banana.js](api/banana.js.md)
* [maca.js](api/maca.js.md)`;

  test('writed summary', async () => {
    await writeSummary(summaryPathTest, listDocsTest);

    const summary = await jetpack.read(summaryPathTest);

    expect(summary).toBe(writeSummaryResultTest);

    jetpack.remove(summaryPathTest);
  });

  test('summary clear', async () => {
    const summ = await writeSummary(summaryPathTest, listDocsTest);
    jetpack.remove(summaryPathTest);
    expect(summ).toBe('summary clear');
  });

  test('markdown invalid', async () => {
    let errorMessage = '';

    try {
      await writeSummary(fakeSummaryPath, listDocsTest);
    } catch (e) {
      errorMessage = e;
    }

    expect(errorMessage).toBe('summary is not defined as a markdown file');
  });

  test('contentList empty', async () => {
    let errorMessage = '';

    try {
      await writeSummary(summaryPathTest, []);
    } catch (e) {
      errorMessage = e;
    }

    expect(errorMessage).toBe('contentList must to have 1 or more files');
  });

  test('contentList item dont have name', async () => {
    let errorMessage = '';

    try {
      await writeSummary(summaryPathTest, [
        { name: 'carambolas' },
        { melancia: 'safadinha' },
      ]);
    } catch (e) {
      errorMessage = e;
    }

    expect(errorMessage).toBe(
      'some Object in content List array dont have a name attribute',
    );
  });
});
