import { describe, expect, it } from 'vitest';
import { Vector4 } from '../src';

describe('Vector4', () => {
  it('初期化テスト', () => {
    const a = new Vector4(0, 0, 0, 0);
    expect(a).toBeDefined();
  });
});
