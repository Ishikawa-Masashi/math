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

export function getRandomArray(
  size: number,
  min = Number.MIN_VALUE,
  max = Number.MAX_VALUE
) {
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

export function getRandomMatrixFromArray(array: number[]) {
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
    matrix.M11,
    matrix.M12,
    matrix.M13,
    matrix.M14,

    matrix.M21,
    matrix.M22,
    matrix.M23,
    matrix.M24,

    matrix.M31,
    matrix.M32,
    matrix.M33,
    matrix.M34,

    matrix.M41,
    matrix.M42,
    matrix.M43,
    matrix.M44,
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
