import { describe, expect, it } from 'vitest';
import { Vector3 } from '../src';

describe('Vector3', () => {
  it('初期化テスト', () => {
    const a = new Vector3();
    expect(a.x).toEqual(0);
    expect(a.y).toEqual(0);
    expect(a.z).toEqual(0);
  });
});
