import sayHello from '../../src';

describe('sayHello', () => {
  it('returns hello', () => {
    expect(sayHello()).toBe('getting Start-t, agrotis!');
    expect(sayHello('world')).toBe('getting Start-t, world!');
  });
});
