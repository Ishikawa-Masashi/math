import { describe, expect, it } from 'vitest';
import { Scalar } from '../src';

import * as BABYLON from 'babylonjs';

describe('Scalar', () => {
  it('RandomRange', () => {
    for (let i = 0; i < 100; ++i) {
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
