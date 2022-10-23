import { describe, expect, it } from 'vitest';
import { Matrix } from '../src';
import {
  getArrayFromMatrix,
  getRandomArray,
  getRandomFloat,
  getRandomMatrix,
  getRandomMatrixFromArray,
} from './utils';
import * as BABYLON from 'babylonjs';

describe('Matrix', () => {
  it('初期化テスト', () => {
    const a = new Matrix();
    const zero = new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    expect(a.Equals(zero)).toBe(true);
  });

  it('Add', () => {
    const array1 = getRandomArray(16);
    const array2 = getRandomArray(16);
    const a = getRandomMatrixFromArray(array1);
    const b = getRandomMatrixFromArray(array2);
    const value1 = Matrix.Add(a, b);

    const c = BABYLON.Matrix.FromArray(array1);
    const d = BABYLON.Matrix.FromArray(array2);
    const value2 = c.add(d);
    expect(
      value2.equals(BABYLON.Matrix.FromArray(getArrayFromMatrix(value1)))
    ).toBe(true);
  });

  it('Multiply', () => {
    const array1 = getRandomArray(16);
    const array2 = getRandomArray(16);
    const a = getRandomMatrixFromArray(array1);
    const b = getRandomMatrixFromArray(array2);
    const value1 = Matrix.Multiply(a, b);

    const c = BABYLON.Matrix.FromArray(array1);
    const d = BABYLON.Matrix.FromArray(array2);
    const value2 = c.multiply(d);

    expect(
      value2.equals(BABYLON.Matrix.FromArray(getArrayFromMatrix(value1)))
    ).toBe(true);
  });

  it('CreateRotationX', () => {
    const array1 = getRandomArray(16);
    const array2 = getRandomArray(16);
    const angle = getRandomFloat();
    const matrix1 = Matrix.CreateRotationX(angle);

    const matrix2 = BABYLON.Matrix.RotationX(angle);

    expect(
      matrix2.equals(BABYLON.Matrix.FromArray(getArrayFromMatrix(matrix1)))
    ).toBe(true);
  });
});
