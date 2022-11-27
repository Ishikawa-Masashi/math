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

export function getRandomArray(size: number, min = -1, max = 1) {
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
