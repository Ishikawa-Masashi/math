import { describe, expect, it } from 'vitest';
import { Vector2 } from '../src';

describe('Vector2', () => {
  it('初期化テスト', () => {
    const a = new Vector2();
    expect(a.X).toEqual(0);
    expect(a.Y).toEqual(0);
  });
});
