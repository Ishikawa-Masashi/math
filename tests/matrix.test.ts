import { describe, expect, it } from 'vitest';
import { Matrix } from '../src';

describe('Matrix', () => {
  it('初期化テスト', () => {
    const a = new Matrix();
    const zero = Matrix.Zero();
    expect(a.equals(zero)).toBe(true);
  });
});
