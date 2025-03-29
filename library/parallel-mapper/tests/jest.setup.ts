// This file runs before each test file
import '@jest/globals';

// Increase timeout for all tests
jest.setTimeout(10000);

// Utilities to help with testing async operations
global.waitForNextTick = () => new Promise(resolve => process.nextTick(resolve));
global.waitForImmediate = () => new Promise(resolve => setImmediate(resolve));
global.waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
