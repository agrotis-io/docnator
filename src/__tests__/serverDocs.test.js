import { serverDocs } from '../serverDocs';

describe('serverDocs', () => {
  it('returns server ok', () => {
    let output = "listen the localhost:8080 motherfucker B";

    expect(serverDocs()).toBe(output);
  });
});
