import { buildDocs } from '../buildDocs';

describe('buildDocs', () => {
  it('return the build result', () => {
    const target = 'imRootDirectory';
    const extension = 'imJsxExtension';
    const result = `this is the source files directory ${target} \n this is the extension ${extension}`;

    expect(buildDocs(target, extension)).toBe(result);
  })
})
