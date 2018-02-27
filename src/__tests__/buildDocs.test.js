import { buildDocs, mountTemplateDataFileName } from '../buildDocs';
const jetpack = require('fs-jetpack');
const path = require('path');

describe('buildDocs', () => {
  // mock

  const tempDist = path.resolve(process.cwd(), 'temp');
  const srcMock = path.resolve(tempDist, 'src_mock');

  const srcContent = {
    firstJs: `${srcMock}/firstJs.js`,
    secondJs: `${srcMock}/secondJs.js`,
    thirdJs: `${srcMock}/thirdJs.js`,
    fourthJs: `${srcMock}/secondComponents/fourthJs.js`,
    firstJsx: `${srcMock}/firstComponent/FirstJsx.jsx`,
  };

  const target = path.resolve(process.cwd(), 'docs/api');
  const src = '';
  const fakeSrcPath = './fakePath';
  const extension = '';
  const fakeExtension = [1, 2, 3];
  const { writeAsync } = jetpack;

  /**
    Mount a envirment with files and extensions, create simple code example with jsdocs
  */
  beforeAll(async () => {
    const content = {
      firstJs: `
/**
* @function carambolas
* @param {string} quadradas
* @param {string} melancias
* @return {string}
*/
function carambolas(quadradas, melancias) {
  const safadinhas = melancias + ' safadinhas ';
  const suruba = carambolas + ' sao quadradas e ' + safadinhas;
  return suruba;
}`,
      secondJs: `
/**
 * @function patrickinhoMeninoLindo
 * @param {number} a primeiro argumento
 * @param {number} b segundo argumento
 * @return {number}
 */
function patrickinhoMeninoLindo(a, b) {
  return a + b;
}

/**
 * @function renataurosmon
 * @deprecated
 * @param {number} a primeiro argumento
 * @param {number} b segundo argumento
 * @return {number}
 */
function renataurosmon(a, b) {
  return a + b;
}
      `,
      thirdJs: `
/**
 * Melancia.
 */
class Melancia {
  constructor () {
    /**
     * Contains wood.
     */
    this.wood = null
  }
}
      `,
      fourthJs: `
/**
 * @class Quadrada
 */
class Quadrada {
  /**
   * @param {string} a
   * @param {string} b
   * @param {string} c
   */
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  /**
   * @method getA
   * @returns {string} this.a
   */
  getA() {
    return this.a;
  }

  /**
   * @method setB
   * @param {string} newB
   */
  setB(newB) {
    this.b = newB;
  }
}
      `,
      FirstJsx: `
/**
 * @funciont App
 * @param {{carambola: String}} props
 * @return void
**/
const App = ({props}) => (
  <div>
    {props.carambolas}
  </div>
)
      `,
    };

    await writeAsync(srcContent.firstJs, content.firstJs);
    await writeAsync(srcContent.secondJs, content.secondJs);
    await writeAsync(srcContent.thirdJs, content.thirdJs);
    await writeAsync(srcContent.fourthJs, content.fourthJs);
    await writeAsync(srcContent.firstJsx, content.FirstJsx);
  });

  afterAll(() => {
    jetpack.remove(tempDist);
    jetpack.remove(target);
  });

  it('check doc generate', async () => {
    const filesResponseExpect = [
      "firstJs.js",
      "secondJs.js",
      "thirdJs.js",
      "FirstJsx.jsx",
      "fourthJs.js"
    ];

    const summaryList = await buildDocs(srcMock);

    const result = filesResponseExpect.every(file =>  {
      if (summaryList.some(item => item.name === file)) {
        return true;
      }
    })

    expect(result).toBeTruthy();
  });

  it('check doc generated with multiples declarations', async () => {
    const responseExpect = 5;
    await buildDocs(srcMock);
    const apiDocsResult = await jetpack.inspectTreeAsync(target);
    expect(apiDocsResult.children.length).toBe(responseExpect);
  });

  it('check doc generate in multiples files with same name', async () => {
    const newContent = `
/**
 * @function patrickinhoMeninoLindo
 * @param {number} a primeiro argumento
 * @param {number} b segundo argumento
 * @return {number}
 */
function patrickinhoMeninoLindo(a, b) {
  return a + b;
}

/**
 * @function renataurosmon
 * @deprecated
 * @param {number} a primeiro argumento
 * @param {number} b segundo argumento
 * @return {number}
 */
function renataurosmon(a, b) {
  return a + b;
}
          `;

    srcContent.newContent = `${srcMock}/new/firstJs.js`;

    await writeAsync(srcContent.newContent, newContent);
    await buildDocs(srcMock);

    const responseExpect = 5;
    const apiDocsResult = await jetpack.inspectTreeAsync(target);
    expect(apiDocsResult.children.length).toBe(responseExpect);
  });

  it('extension invalid as regExp Object', async () => {
    let msg = '';

    try {
      await buildDocs(srcMock, fakeExtension);
    } catch (e) {
      msg = e;
    }

    expect(msg).toBe(`${fakeExtension} invalid as regExp Object`);
  });

  it('src dont exist', async () => {
    let msg = '';
    const pathExpect = path.resolve(process.cwd(), fakeSrcPath);
    try {
      await buildDocs(fakeSrcPath);
    } catch (e) {
      msg = e;
    }

    expect(msg).toBe(`${pathExpect} don't exist`);
  });
});

describe('mountTemplateDataFileName', () => {
  // mocks
  const templateDataSimple = [
    {
      id: 0,
      meta: { filename: 'index.js' },
    },
    {
      id: 1,
      meta: { filename: 'component.js' },
    },
    {
      id: 2,
      meta: { filename: 'config.js' },
    },
    {
      id: 3,
      meta: { filename: 'deep.js' },
    },
  ];
  const templateDataComplex = [
    {
      id: 0,
      meta: { filename: 'index.js' },
    },
    {
      id: 1,
      meta: { filename: 'component.js' },
    },
    {
      id: 2,
      meta: { filename: 'config.js' },
    },
    {
      id: 3,
      meta: { filename: 'deep.js' },
    },
    {
      id: 4,
      meta: { filename: 'index.js' },
    },
    {
      id: 5,
      meta: { filename: 'index.js' },
    },
    {
      id: 6,
      meta: { filename: 'config.js' },
    },
    {
      id: 7,
      meta: { filename: 'index.js' },
    },
  ];
  const templateDataEmpty = [];

  it('return simple template data', () => {
    const templateDataSimpleResultExpect = {
      'index.js': [
        {
          id: 0,
          meta: { filename: 'index.js' },
        },
      ],
      'component.js': [
        {
          id: 1,
          meta: { filename: 'component.js' },
        },
      ],
      'config.js': [
        {
          id: 2,
          meta: { filename: 'config.js' },
        },
      ],
      'deep.js': [
        {
          id: 3,
          meta: { filename: 'deep.js' },
        },
      ],
    };

    const templateDataFileName = mountTemplateDataFileName(templateDataSimple);
    expect(templateDataFileName).toEqual(templateDataSimpleResultExpect);
  });

  it('return complex template data', () => {
    const templateDataComplexResultExpect = {
      'index.js': [
        {
          id: 0,
          meta: { filename: 'index.js' },
        },
        {
          id: 4,
          meta: { filename: 'index.js' },
        },
        {
          id: 5,
          meta: { filename: 'index.js' },
        },
        {
          id: 7,
          meta: { filename: 'index.js' },
        },
      ],
      'component.js': [
        {
          id: 1,
          meta: { filename: 'component.js' },
        },
      ],
      'config.js': [
        {
          id: 2,
          meta: { filename: 'config.js' },
        },
        {
          id: 6,
          meta: { filename: 'config.js' },
        },
      ],
      'deep.js': [
        {
          id: 3,
          meta: { filename: 'deep.js' },
        },
      ],
    };

    const templateDataFileName = mountTemplateDataFileName(templateDataComplex);
    expect(templateDataFileName).toEqual(templateDataComplexResultExpect);
  });

  it('return empty template data', () => {
    const templateDataEmptyExpect = [];

    const templateDataFileName = mountTemplateDataFileName(templateDataEmpty);
    expect(templateDataFileName).toEqual(templateDataEmptyExpect);
  });
});
