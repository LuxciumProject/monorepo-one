import type { Stats } from 'node:fs';

export type With<T extends Object> = T;

export type ImageFilePath = With<{
  compatibleImagefilePath: string;
}>;

export type WithExpected<T extends Object> = {
  expected: T;
};

export type WithExpectedStats = WithExpected<{
  stats: () => Promise<Stats>;
}>;

export type ImageFilePathWithExpectedStats = WithExpectedStats & ImageFilePath;
