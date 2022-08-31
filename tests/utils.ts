import { Vector3 } from '../src';
import { Scalar } from '../src';

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

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
export function getRandomVector3(min: number, max: number) {
  return new Vector3(
    Scalar.RandomRange(min, max),
    Scalar.RandomRange(min, max),
    Scalar.RandomRange(min, max)
  );
}
