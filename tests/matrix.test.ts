import { describe, expect, it } from 'vitest';

import * as BABYLON from 'babylonjs';

import { Matrix } from '../src';
import { getRandomArray, getRandomFloat } from './utils';

describe('Matrix', () => {
  it('初期化テスト', () => {
    const a = new Matrix();
    const zero = Matrix.Zero();
    expect(a.equals(zero)).toBeTruthy();
  });

  it('Add', () => {
    const array1 = getRandomArray(16);
    const array2 = getRandomArray(16);

    const a = Matrix.FromArray(array1);
    const b = Matrix.FromArray(array2);

    const value1 = a.add(b);

    const c = BABYLON.Matrix.FromArray(array1);
    const d = BABYLON.Matrix.FromArray(array2);
    const value2 = c.add(d);

    expect(value1.equals(value2)).toBeTruthy();
  });

  it('multiply', () => {
    const array1 = getRandomArray(16);
    const array2 = getRandomArray(16);

    const a = Matrix.FromArray(array1);
    const b = Matrix.FromArray(array2);
    const value1 = a.multiply(b);

    const c = BABYLON.Matrix.FromArray(array1);
    const d = BABYLON.Matrix.FromArray(array2);
    const value2 = c.multiply(d);

    expect(value1.equals(value2)).toBeTruthy();
  });

  it('invert', () => {
    // https://www.wolframalpha.com/input?i=%E9%80%86%E8%A1%8C%E5%88%97&assumption=%7B%22F%22%2C+%22MatrixInverse%22%2C+%22invmatrix%22%7D+-%3E%22%7B%7B3%2C1%2C1%2C2%7D%2C+%7B5%2C1%2C3%2C4%7D%2C+%7B2%2C+0%2C1%2C0%7D%2C+%7B1%2C3%2C2%2C1%7D%7D%22&assumption=%7B%22C%22%2C+%22%E9%80%86%E8%A1%8C%E5%88%97%22%7D+-%3E+%7B%22Calculator%22%7D&lang=ja
    const array = [3, 1, 1, 2, 5, 1, 3, 4, 2, 0, 1, 0, 1, 3, 2, 1];
    const a = Matrix.FromArray(array);
    const b = BABYLON.Matrix.FromArray(array);

    a.invert();
    b.invert();

    expect(a.equals(b)).toBeTruthy();
  });

  it('Determinant', () => {
    // https://www.wolframalpha.com/input?i=%E9%80%86%E8%A1%8C%E5%88%97&assumption=%7B%22F%22%2C+%22MatrixInverse%22%2C+%22invmatrix%22%7D+-%3E%22%7B%7B3%2C1%2C1%2C2%7D%2C+%7B5%2C1%2C3%2C4%7D%2C+%7B2%2C+0%2C1%2C0%7D%2C+%7B1%2C3%2C2%2C1%7D%7D%22&assumption=%7B%22C%22%2C+%22%E9%80%86%E8%A1%8C%E5%88%97%22%7D+-%3E+%7B%22Calculator%22%7D&lang=ja
    const array = [3, 1, 1, 2, 5, 1, 3, 4, 2, 0, 1, 0, 1, 3, 2, 1];

    const a = Matrix.FromArray(array);
    const b = BABYLON.Matrix.FromArray(array);

    expect(a.determinant()).toBe(b.determinant());
  });

  it('RotationX', () => {
    const angle = getRandomFloat();

    const matrix1 = Matrix.RotationX(angle);
    const matrix2 = BABYLON.Matrix.RotationX(angle);

    matrix1.equals(Matrix.FromArray(matrix2.m));
  });

  it('RotationY', () => {
    const angle = getRandomFloat();

    const matrix1 = Matrix.RotationY(angle);
    const matrix2 = BABYLON.Matrix.RotationY(angle);

    matrix1.equals(Matrix.FromArray(matrix2.m));
  });

  it('RotationZ', () => {
    const angle = getRandomFloat();

    const matrix1 = Matrix.RotationZ(angle);
    const matrix2 = BABYLON.Matrix.RotationZ(angle);

    matrix1.equals(Matrix.FromArray(matrix2.m));
  });

  it('multiply', () => {
    const angle = getRandomFloat();

    const matrix1 = Matrix.Identity();
    const matrix2 = Matrix.RotationZ(angle);

    const matrix3 = BABYLON.Matrix.Identity();
    const matrix4 = BABYLON.Matrix.RotationZ(angle);

    expect(matrix1.equals(Matrix.FromArray(matrix3.m))).toBeTruthy();
    expect(matrix2.equals(Matrix.FromArray(matrix4.m))).toBeTruthy();

    const matrix5 = matrix1.multiply(matrix2);
    const matrix6 = matrix3.multiply(matrix4);

    expect(matrix5.equals(Matrix.FromArray(matrix6.m))).toBeTruthy();
  });
});
