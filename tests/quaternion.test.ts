import { describe, expect, it } from 'vitest';
import { Quaternion } from '../src';

describe('Quaternion', () => {
  it('初期化テスト', () => {
    const a = new Quaternion();
    const b = new Quaternion(0, 0, 0, 1);
    expect(a.equals(b)).toBeTruthy();
  });
});
