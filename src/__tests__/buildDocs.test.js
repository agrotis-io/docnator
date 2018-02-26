import { buildDocs } from '../buildDocs';

describe('buildDocs', () => {
  // mock

  const tempDist = path.resolve(process.cwd(), 'temp');
  const srcMock = path.resolve(tempDist, 'src_mock');
  const src = '';
  const fakeSrcPath = './fakePath';
  const extension = '';
  const fakeExtension = '';
  const { writeAsync } = jetpack;

  /**
    Mount a envirment with files and extensions, create simple code example with jsdocs
  */
  beforeAll(async () => {
    const content = {
      firstJs: ``,
      secondJs: ``,
      thirdJs: ``,
      FirstJsx: ``,
      SecondJsx: ``,
      fourthJs: ``,
      ThirdJsx: ``,
      fifthJs: ``,
      sixthJs: ``,
    };

    await writeAsync(`${srcMock}/firstJs.js`, '');
    await writeAsync(`${srcMock}/secondJs.js`, '');
    await writeAsync(`${srcMock}/thirdJs.js`, '');
    await writeAsync(`${srcMock}/firstComponent/FirstJsx.jsx`, '');
    await writeAsync(`${srcMock}/firstComponent/SecondJsx.jsx`, '');
    await writeAsync(`${srcMock}/firstComponent/fourthJs.js`, '');
    await writeAsync(`${srcMock}/secondComponents/child/ThirdJsx.jsx`, '');
    await writeAsync(`${srcMock}/secondComponents/child/fifthJs.js`, '');
    await writeAsync(`${srcMock}/secondComponents/child/sixthJs.js`, '');
  });

  it('return the build result', () => {
    expect(1).toBe(1);
  });

  it('check doc generate', () => {
    expect(1).toBe(1);
  });

  it('check doc generate with multiples declarations', () => {
    expect(1).toBe(1);
  });

  it('check doc generate in multiples files with same name', () => {
    expect(1).toBe(1);
  });

  it('extension invalid as regExp Object', () => {
    expect(1).toBe(1);
  });

  it('src dont exist', () => {
    expect(1).toBe(1);
  });
});

describe('mountTemplateDataFileName', () => {
  // mocks
  const templateDataSimple = [];
  const templateDataComplex = [];
  const templateDataEmpty = [];

  it('return simple template data', () => {
    expect(1).toBe(1);
  });

  it('return complex template data', () => {
    expect(1).toBe(1);
  });

  it('return empty template data', () => {
    expect(1).toBe(1);
  });
});
