import { createPassThroughPlaceholder } from '../createPassThroughPlaceholder';

describe('createPassThroughPlaceholder', () => {
  const message = 'Test message';
  const arg0 = 'arg0';
  const arg1 = 123;
  const arg2 = true;
  const returnedValue = [arg0, arg1, arg2];
  let createPlaceholder = createPassThroughPlaceholder;

  beforeEach(() => {
    createPlaceholder = createPassThroughPlaceholder;
  });

  it('should log the message', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const placeholder = createPlaceholder(message);
    placeholder(arg0, arg1, arg2);
    expect(consoleSpy).toHaveBeenCalledWith(message);
    consoleSpy.mockRestore();
  });
  it('should return the value', () => {
    const placeholder = createPlaceholder(message);
    const result = placeholder(arg0, arg1, arg2);
    expect(result).toEqual(returnedValue);
  });
  it('should not call console.dir', () => {
    const consoleDirSpy = jest.spyOn(console, 'dir');
    const placeholder = createPlaceholder(message);
    placeholder(arg0, arg1, arg2);
    expect(consoleDirSpy).not.toHaveBeenCalled();
    consoleDirSpy.mockRestore();
  });
});
