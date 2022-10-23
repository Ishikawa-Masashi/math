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

function equalsWithEpsilon(
  matrix1: Matrix,
  matrix2: BABYLON.Matrix,
  epsilon = 1e-6
) {
  const array1 = getArrayFromMatrix(matrix1);
  const array2 = matrix2.m;
  for (let i = 0; i < array1.length; ++i) {
    expect(Math.abs(array1[i] - array2[i]) < epsilon).toBeTruthy();
  }
}

describe('Matrix', () => {
  it('初期化テスト', () => {
    const a = new Matrix();
    const zero = new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    expect(a.Equals(zero)).toBeTruthy();
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
    ).toBeTruthy();
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
    ).toBeTruthy();
  });

  it('Invert', () => {
    const angle = getRandomFloat();
    const a = Matrix.CreateRotationX(angle);
    const b = Matrix.Invert(a);

    const c = BABYLON.Matrix.FromArray(getArrayFromMatrix(a));
    c.invert();

    equalsWithEpsilon(b, c);
  });

  it('CreateRotationX', () => {
    const angle = getRandomFloat();
    const matrix1 = Matrix.CreateRotationX(angle);

    const matrix2 = BABYLON.Matrix.RotationX(angle);

    expect(
      matrix2.equals(BABYLON.Matrix.FromArray(getArrayFromMatrix(matrix1)))
    ).toBeTruthy();
  });

  it('CreateRotationY', () => {
    const angle = getRandomFloat();
    const matrix1 = Matrix.CreateRotationY(angle);

    const matrix2 = BABYLON.Matrix.RotationY(angle);

    expect(
      matrix2.equals(BABYLON.Matrix.FromArray(getArrayFromMatrix(matrix1)))
    ).toBeTruthy();
  });

  it('CreateRotationZ', () => {
    const angle = getRandomFloat();
    const matrix1 = Matrix.CreateRotationZ(angle);

    const matrix2 = BABYLON.Matrix.RotationZ(angle);

    expect(
      matrix2.equals(BABYLON.Matrix.FromArray(getArrayFromMatrix(matrix1)))
    ).toBeTruthy();
  });
});
