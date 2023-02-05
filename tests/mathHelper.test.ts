import { describe, test, expect, it } from 'vitest';
import { MathHelper } from '../src';

import * as BABYLON from 'babylonjs';

describe('MathHelper', () => {
  test('Pi', () => {
    expect(MathHelper.Pi).toBe(Math.PI);
    // expect(MathHelper.PI).toEqual('');
  });

  test('E', () => {
    expect(MathHelper.E).toBe(Math.exp(1));
  });

  test('ToDegrees', () => {
    const value1 = MathHelper.ToDegrees(Math.PI / 2);
    expect(value1).toBe(90);

    const value2 = MathHelper.ToDegrees(Math.PI);
    expect(value2).toBe(180);
  });

  test('ToRadians', () => {
    const value1 = MathHelper.ToRadians(90);
    expect(value1).toBe(Math.PI / 2);

    const value2 = MathHelper.ToRadians(180);
    expect(value2).toBe(Math.PI);
  });

  test('Clamp', () => {
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

    const a = MathHelper.Clamp(value1, value2, value3);
    const b = BABYLON.Scalar.Clamp(value1, value2, value3);
    expect(a).toBe(b);
  });
});
