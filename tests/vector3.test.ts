import { describe, expect, it } from 'vitest';
import { Vector3, Matrix } from '../src';
import * as BABYLON from 'babylonjs';
import { getRandomArray, getRandomVector3 } from './utils';

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

    value1.equals(value2);
  });

  it('cross', () => {
    const a = getRandomVector3();
    const b = getRandomVector3();
    const value1 = Vector3.Cross(a, b);

    const c = new BABYLON.Vector3(a.x, a.y, a.z);
    const d = new BABYLON.Vector3(b.x, b.y, b.z);
    const value2 = c.cross(d);

    value1.equals(value2);
  });

  it('TransformNormal', () => {
    const array1 = getRandomArray(3);
    const array2 = getRandomArray(16);

    const a = new Vector3(...array1);
    const b = new Matrix(...array2);
    const value1 = Vector3.TransformNormal(a, b);

    const c = BABYLON.Vector3.FromArray(array1);
    const d = BABYLON.Matrix.FromArray(array2);
    const value2 = BABYLON.Vector3.TransformNormal(c, d);

    expect(value1.equalsWithEpsilon(value2)).toBeTruthy();
  });

  it('TransformCoordinates', () => {
    const array1 = getRandomArray(3);
    const array2 = getRandomArray(16);

    const a = new Vector3(...array1);
    const b = new Matrix(...array2);
    const value1 = Vector3.TransformCoordinates(a, b);

    const c = BABYLON.Vector3.FromArray(array1);
    const d = BABYLON.Matrix.FromArray(array2);
    const value2 = BABYLON.Vector3.TransformCoordinates(c, d);

    expect(value1.equalsWithEpsilon(value2)).toBeTruthy();
  });
});
