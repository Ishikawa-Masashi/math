import { describe, expect, it } from 'vitest';

import * as BABYLON from 'babylonjs';

import { Vector2 } from '../src';

import { getRandomArray } from './utils';

describe('Vector2', () => {
  it('初期化テスト', () => {
    const a = new Vector2();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
  });

  it('normalize', () => {
    const array = getRandomArray(2);
    const a = new Vector2(...array);
    a.normalize();

    const b = BABYLON.Vector2.FromArray(array);
    b.normalize();

    expect(a.equals(b)).toBeTruthy();
  });
});
