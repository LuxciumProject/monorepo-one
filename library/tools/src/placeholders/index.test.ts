// import type { CustomPlaceholderFunction } from '.';
import { createCustomPlaceholder } from './createCustomPlaceholder';

describe('CustomPlaceholderFunction', () => {
  let customPlaceholder = createCustomPlaceholder;

  beforeEach(() => {
    customPlaceholder = createCustomPlaceholder;
  });

  it('should log the message', () => {
    const message = 'Test message';

    const consoleSpy = jest.spyOn(console, 'log');
    const placeholder = customPlaceholder(message, false, false);
    const result = placeholder('arg1', 123, true);
    result;
    expect(consoleSpy).toHaveBeenCalledWith(message);
    consoleSpy.mockRestore();
  });

  it('should conditionally log the arguments', () => {
    const consoleSpy = jest.spyOn(console, 'dir');
    const placeholder = customPlaceholder('Test message', true, false);
    const result = placeholder('arg1', 123, true);
    expect(consoleSpy).toHaveBeenCalledWith(['arg1', 123, true]);
    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });

  it('should conditionally return the arguments', () => {
    const placeholder = customPlaceholder('Test message', true, true);
    const result = placeholder('arg1', 123, true);
    expect(result).toEqual(['arg1', 123, true]);
  });
  it('should conditionally or not return the arguments', () => {
    const placeholder = customPlaceholder('Test message', false, false);
    const result = placeholder('arg1', 123, true);
    expect(result).toBeUndefined();
  });
  it('should return void when returnArgs is false', () => {
    const placeholder = customPlaceholder('Test message', true, false);
    const result: void = placeholder('arg1', 123, true);
    expect(result).toBeUndefined();
  });
});
