import { Matrix, Vector2 } from '../src';
import { Vector3 } from '../src';
import { Scalar } from '../src';
import { ArrayTools } from '../src';

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
export function getRandomFloat(min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
  return Math.random() * (max - min) + min;
}

// export function getRandomArray(
//   size: number,
//   min = Number.MIN_VALUE,
//   max = Number.MAX_VALUE
// ) {
//   return ArrayTools.BuildArray(size, () => getRandomFloat(min, max));
// }

export function getRandomArray(size: number, min = 0, max = 1) {
  return ArrayTools.BuildArray(size, () => getRandomFloat(min, max));
}

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
export function getRandomVector2(
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE
) {
  return new Vector2(
    Scalar.RandomRange(min, max),
    Scalar.RandomRange(min, max)
  );
}

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
export function getRandomVector3(
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE
) {
  return new Vector3(
    Scalar.RandomRange(min, max),
    Scalar.RandomRange(min, max),
    Scalar.RandomRange(min, max)
  );
}

export function getMatrixFromArray(array: number[]) {
  return new Matrix(
    array[0],
    array[1],
    array[2],
    array[3],

    array[4],
    array[5],
    array[6],
    array[7],

    array[8],
    array[9],
    array[10],
    array[11],

    array[12],
    array[13],
    array[14],
    array[15]
  );
}

export function getArrayFromMatrix(matrix: Matrix) {
  return [
    matrix.m11,
    matrix.m12,
    matrix.m13,
    matrix.m14,

    matrix.m21,
    matrix.m22,
    matrix.m23,
    matrix.m24,

    matrix.m31,
    matrix.m32,
    matrix.m33,
    matrix.m34,

    matrix.m41,
    matrix.m42,
    matrix.m43,
    matrix.m44,
  ];
}
export function getRandomMatrix() {
  return new Matrix(
    getRandomFloat(),
    getRandomFloat(),
    getRandomFloat(),
    getRandomFloat(),

    getRandomFloat(),
    getRandomFloat(),
    getRandomFloat(),
    getRandomFloat(),

    getRandomFloat(),
    getRandomFloat(),
    getRandomFloat(),
    getRandomFloat(),

    getRandomFloat(),
    getRandomFloat(),
    getRandomFloat(),
    getRandomFloat()
  );
}
