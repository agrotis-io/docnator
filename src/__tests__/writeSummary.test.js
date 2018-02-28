import { writeSummary } from '../writeSummary';

const jetpack = require('fs-jetpack');
const path = require('path');

describe('writeSummary', () => {
  afterAll(() => {
    jetpack.remove(tempDist);
  });

  const tempDist = path.resolve(process.cwd(), 'temp');
  const summaryPathTest = path.resolve(tempDist, 'summary_test.md');
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
* [carambolas.js](docs/api/carambolas.js.md)
* [quadrada.js](docs/api/quadrada.js.md)
* [melancia.js](docs/api/melancia.js.md)
* [safadinha.js](docs/api/safadinha.js.md)
* [banana.js](docs/api/banana.js.md)
* [maca.js](docs/api/maca.js.md)`;

  test('writed summary', async () => {
    await writeSummary(listDocsTest, summaryPathTest);
    const summary = await jetpack.read(summaryPathTest);
    expect(summary).toBe(writeSummaryResultTest);
  });

  test('writed summary without summaryPath', async () => {
    await writeSummary(listDocsTest);
    const defaultSummaryPath = path.resolve(process.cwd(), 'SUMMARY.md');
    const summary = await jetpack.read(defaultSummaryPath);
    expect(summary).toBe(writeSummaryResultTest);
    jetpack.remove(defaultSummaryPath);
  });

  test('summary clear', async () => {
    const summ = await writeSummary(listDocsTest, summaryPathTest);
    expect(summ).toBe('summary clear');
  });

  test('markdown invalid', async () => {
    let errorMessage = '';

    try {
      await writeSummary(listDocsTest, fakeSummaryPath);
    } catch (e) {
      errorMessage = e;
    }

    expect(errorMessage).toBe('summary is not defined as a markdown file');
  });

  test('contentList empty', async () => {
    let errorMessage = '';

    try {
      await writeSummary([], summaryPathTest);
    } catch (e) {
      errorMessage = e;
    }

    expect(errorMessage).toBe('contentList must to have 1 or more files');
  });

  test('contentList item dont have name', async () => {
    let errorMessage = '';

    try {
      await writeSummary(
        [{ name: 'carambolas' }, { melancia: 'safadinha' }],
        summaryPathTest,
      );
    } catch (e) {
      errorMessage = e;
    }

    expect(errorMessage).toBe(
      'some Object in content List array dont have a name attribute',
    );
  });
});
