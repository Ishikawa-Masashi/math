import { describe, expect, it } from 'vitest';
import { Vector3 } from '../src';
import * as BABYLON from 'babylonjs';
import { getRandomVector3 } from './utils';

describe('Vector3', () => {
  it('初期化テスト', () => {
    const a = new Vector3();
    expect(a.x).toEqual(0);
    expect(a.y).toEqual(0);
    expect(a.z).toEqual(0);
  });

  // it('add', () => {
  //   for (let i = 0; i < 10; ++i) {
  //     const a = getRandomVector3();
  //     const b = getRandomVector3();
  //     const value1 = Vector3.Add(a, b);

  //     const c = new BABYLON.Vector3(a.X, a.Y, a.Z);
  //     const d = new BABYLON.Vector3(b.X, b.Y, b.Z);
  //     const value2 = c.add(d);
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     expect(value1.Equals(value2 as any)).toBeTruthy();
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     expect(value2.equals(value1 as any)).toBeTruthy();
  //   }
  // });
});
