import { describe, expect, it } from 'vitest';
import { Quaternion } from '../src';

describe('Quaternion', () => {
  it('初期化テスト', () => {
    const a = new Quaternion();
    expect(a).toBeDefined();
  });
});
