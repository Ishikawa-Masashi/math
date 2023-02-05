import { describe, expect, it } from 'vitest';
import { Scalar } from '../src';

import * as BABYLON from 'babylonjs';
import { getRandomFloat } from './utils';

describe('Scalar', () => {
  it('ToDegrees', () => {
    const value1 = Scalar.ToDegrees(Math.PI / 2);
    expect(value1).toBe(90);

    const value2 = Scalar.ToDegrees(Math.PI);
    expect(value2).toBe(180);
  });

  it('ToRadians', () => {
    const value1 = Scalar.ToRadians(90);
    expect(value1).toBe(Math.PI / 2);

    const value2 = Scalar.ToRadians(180);
    expect(value2).toBe(Math.PI);
  });

  it('Scalar.RandomRange', () => {
    for (let i = 0; i < 10; ++i) {
      const min = getRandomFloat();
      const max = getRandomFloat(min);

      const value = Scalar.RandomRange(min, max);
      expect(value).toBeGreaterThanOrEqual(min);
      expect(value).toBeLessThan(max);
    }
  });

  it('Scalar.Clamp', () => {
    for (let i = 0; i < 10; ++i) {
      const value1 = BABYLON.Scalar.RandomRange(
        Number.MIN_VALUE,
        Number.MAX_VALUE
      );
      const value2 = BABYLON.Scalar.RandomRange(
        Number.MIN_VALUE,
        Number.MAX_VALUE
      );
      const value3 = BABYLON.Scalar.RandomRange(
        Number.MIN_VALUE,
        Number.MAX_VALUE
      );
      const a = Scalar.Clamp(value1, value2, value3);
      const b = BABYLON.Scalar.Clamp(value1, value2, value3);
      expect(a).toBe(b);
    }
  });
});
