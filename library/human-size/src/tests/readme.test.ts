import { default as humanSizeDefault, humanSize } from '..';

describe('Validate examples in readme file', () => {
  it('Should print "10MB"', () => {
    expect(humanSize(10 * 1024 * 1024)).toBe('10MB');
  });
  it('Should print "10.00MB"', () => {
    expect(humanSize(10 * 1024 * 1024, 2)).toBe('10.00MB');
  });
  it('Should print "104KB"', () => {
    expect(humanSize(106_168)).toBe('104KB');
  });
  it('Should print "103.68KB"', () => {
    expect(humanSize(106_168, 2)).toBe('103.68KB');
  });
});

describe('Validate examples in readme file with spacing', () => {
  const SPACED = true;

  it('Should print "10 MB"', () => {
    expect(humanSizeDefault(10 * 1024 * 1024, SPACED)).toBe('10 MB');
  });
  it('Should print "10.00 MB"', () => {
    expect(humanSizeDefault(10 * 1024 * 1024, 2, SPACED)).toBe(
      '10.00 MB'
    );
  });
  it('Should print "104 KB"', () => {
    expect(humanSizeDefault(106_168, SPACED)).toBe('104 KB');
  });
  it('Should print "103.68 KB"', () => {
    expect(humanSizeDefault(106_168, 2, SPACED)).toBe('103.68 KB');
  });
});
