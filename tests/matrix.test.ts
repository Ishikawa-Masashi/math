import { describe, expect, it } from 'vitest';

import * as BABYLON from 'babylonjs';

import { Matrix } from '../src';
import { getRandomArray, getRandomFloat } from './utils';

describe('Matrix', () => {
  it('初期化テスト', () => {
    const a = new Matrix();
    const zero = new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    expect(a.Equals(zero)).toBeTruthy();
  });

  it('Add', () => {
    const array1 = getRandomArray(16);
    const array2 = getRandomArray(16);

    const a = new Matrix(...array1);
    const b = new Matrix(...array2);

    const value1 = Matrix.Add(a, b);

    const c = BABYLON.Matrix.FromArray(array1);
    const d = BABYLON.Matrix.FromArray(array2);
    const value2 = c.add(d);

    expect(value1.equalsWithEpsilon(new Matrix(...value2.m))).toBeTruthy();
  });

  it('multiply', () => {
    const array1 = getRandomArray(16);
    const array2 = getRandomArray(16);

    const a = new Matrix(...array1);
    const b = new Matrix(...array2);
    const value1 = a.multiply(b);

    const c = BABYLON.Matrix.FromArray(array1);
    const d = BABYLON.Matrix.FromArray(array2);
    const value2 = c.multiply(d);

    expect(value1.equalsWithEpsilon(new Matrix(...value2.m))).toBeTruthy();
  });

  // it('Multiply', () => {
  //   const array1 = getRandomArray(16);
  //   const array2 = getRandomArray(16);
  //   const a = getMatrixFromArray(array1);
  //   const b = getMatrixFromArray(array2);
  //   const value1 = Matrix.Multiply(a, b);

  //   const c = BABYLON.Matrix.FromArray(array1);
  //   const d = BABYLON.Matrix.FromArray(array2);
  //   const value2 = c.multiply(d);

  //   expect(
  //     value2.equals(BABYLON.Matrix.FromArray(getArrayFromMatrix(value1)))
  //   ).toBeTruthy();
  // });

  it('invert', () => {
    // https://www.wolframalpha.com/input?i=%E9%80%86%E8%A1%8C%E5%88%97&assumption=%7B%22F%22%2C+%22MatrixInverse%22%2C+%22invmatrix%22%7D+-%3E%22%7B%7B3%2C1%2C1%2C2%7D%2C+%7B5%2C1%2C3%2C4%7D%2C+%7B2%2C+0%2C1%2C0%7D%2C+%7B1%2C3%2C2%2C1%7D%7D%22&assumption=%7B%22C%22%2C+%22%E9%80%86%E8%A1%8C%E5%88%97%22%7D+-%3E+%7B%22Calculator%22%7D&lang=ja
    const array = [3, 1, 1, 2, 5, 1, 3, 4, 2, 0, 1, 0, 1, 3, 2, 1];
    const a = new Matrix(...array);
    const b = BABYLON.Matrix.FromArray(array);

    a.invert();
    b.invert();

    a.equalsWithEpsilon(new Matrix(...b.m));
  });

  it('Determinant', () => {
    // https://www.wolframalpha.com/input?i=%E9%80%86%E8%A1%8C%E5%88%97&assumption=%7B%22F%22%2C+%22MatrixInverse%22%2C+%22invmatrix%22%7D+-%3E%22%7B%7B3%2C1%2C1%2C2%7D%2C+%7B5%2C1%2C3%2C4%7D%2C+%7B2%2C+0%2C1%2C0%7D%2C+%7B1%2C3%2C2%2C1%7D%7D%22&assumption=%7B%22C%22%2C+%22%E9%80%86%E8%A1%8C%E5%88%97%22%7D+-%3E+%7B%22Calculator%22%7D&lang=ja
    const array = [3, 1, 1, 2, 5, 1, 3, 4, 2, 0, 1, 0, 1, 3, 2, 1];

    const a = new Matrix(...array);
    const b = BABYLON.Matrix.FromArray(array);

    expect(a.Determinant()).toBe(b.determinant());
  });

  it('RotationX', () => {
    const angle = getRandomFloat();

    const matrix1 = Matrix.RotationX(angle);
    const matrix2 = BABYLON.Matrix.RotationX(angle);

    matrix1.equalsWithEpsilon(new Matrix(...matrix2.m));
  });

  it('RotationY', () => {
    const angle = getRandomFloat();

    const matrix1 = Matrix.RotationY(angle);
    const matrix2 = BABYLON.Matrix.RotationY(angle);

    matrix1.equalsWithEpsilon(new Matrix(...matrix2.m));
  });

  it('RotationZ', () => {
    const angle = getRandomFloat();

    const matrix1 = Matrix.RotationZ(angle);
    const matrix2 = BABYLON.Matrix.RotationZ(angle);

    matrix1.equalsWithEpsilon(new Matrix(...matrix2.m));
  });
});
