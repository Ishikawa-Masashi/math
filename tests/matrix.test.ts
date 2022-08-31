import { describe, expect, it } from 'vitest';
import { Matrix } from '../src';
import { getRandomArray } from './utils';
import * as BABYLON from 'babylonjs';

describe('Matrix', () => {
  it('初期化テスト', () => {
    const a = new Matrix();
    const zero = Matrix.Zero();
    expect(a.equals(zero)).toBe(true);
  });

  it('add', () => {
    const a = Matrix.FromArray(getRandomArray(16));
    const b = Matrix.FromArray(getRandomArray(16));
    const value1 = a.add(b);

    const c = BABYLON.Matrix.FromArray(a.m);
    const d = BABYLON.Matrix.FromArray(b.m);
    const value2 = c.add(d);

    expect(value1.equals(value2 as unknown)).toBe(true);
    expect(value2.equals(value1 as unknown)).toBe(true);
  });
});
