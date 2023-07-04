import type { Stats } from 'node:fs';

export type ImageFilePath = {
  compatibleImagefilePath: string;
};

export type WithExpected<T extends Object> = {
  expected: T;
};

export type WithExpectedStats = WithExpected<{
  stats: Promise<Stats>;
}>;

export type ImageFilePathWithExpectedStats = WithExpectedStats & ImageFilePath;

// import { stat } from 'node:fs/promises';
// import type { ImageFilePath, ImageFilePathWithExpectedStats } from './types'; // Adjust the import path to where your types are defined
