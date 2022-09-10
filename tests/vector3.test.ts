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

  it('add', () => {
    for (let i = 0; i < 10; ++i) {
      const a = getRandomVector3();
      const b = getRandomVector3();
      const value1 = a.add(b);

      const c = new BABYLON.Vector3(a.x, a.y, a.z);
      const d = new BABYLON.Vector3(b.x, b.y, b.z);
      const value2 = c.add(d);

      expect(value1.equals(value2)).toBeTruthy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(value2.equals(value1 as any)).toBeTruthy();
    }
  });
});
