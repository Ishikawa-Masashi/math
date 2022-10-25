import { describe, expect, it } from 'vitest';
import { Vector3 } from '../src';
import * as BABYLON from 'babylonjs';
import { getRandomVector3 } from './utils';

// function equalsWithEpsilon(
//   vector1: Vector3,
//   vector2: BABYLON.Vector3,
//   epsilon = 1e-6
// ) {
//   expect(vector1.x).toBe(vector2.x);
//   expect(Math.abs(vector1.x - vector2.x) < epsilon).toBeTruthy();
//   expect(Math.abs(vector1.y - vector2.y) < epsilon).toBeTruthy();
//   expect(Math.abs(vector1.z - vector2.z) < epsilon).toBeTruthy();
// }

function equals(vector1: Vector3, vector2: BABYLON.Vector3) {
  expect(vector1.x).toBe(vector2.x);
  expect(vector1.y).toBe(vector2.y);
  expect(vector1.z).toBe(vector2.z);
}

describe('Vector3', () => {
  it('初期化テスト', () => {
    const a = new Vector3();
    expect(a.x).toEqual(0);
    expect(a.y).toEqual(0);
    expect(a.z).toEqual(0);
  });

  it('add', () => {
    const a = getRandomVector3();
    const b = getRandomVector3();
    const value1 = Vector3.Add(a, b);

    const c = new BABYLON.Vector3(a.x, a.y, a.z);
    const d = new BABYLON.Vector3(b.x, b.y, b.z);
    const value2 = c.add(d);

    equals(value1, value2);
  });

  it('cross', () => {
    const a = getRandomVector3();
    const b = getRandomVector3();
    const value1 = Vector3.Cross(a, b);

    const c = new BABYLON.Vector3(a.x, a.y, a.z);
    const d = new BABYLON.Vector3(b.x, b.y, b.z);
    const value2 = c.cross(d);

    equals(value1, value2);
  });
});
