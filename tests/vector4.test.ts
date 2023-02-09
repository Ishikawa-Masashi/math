import { describe, expect, test } from 'vitest';
import { Vector4 } from '../src';

describe('Vector4', () => {
  test('初期化テスト', () => {
    const a = new Vector4(0, 0, 0, 0);

    expect(a.x).toEqual(0);
    expect(a.y).toEqual(0);
    expect(a.z).toEqual(0);
    expect(a.w).toEqual(0);
  });
});
