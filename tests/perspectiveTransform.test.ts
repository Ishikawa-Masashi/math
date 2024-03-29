import { describe, expect, it } from 'vitest';
import { Geometry2DFunctions } from '../src/geometry2DFunctions';
import {
  getPerspectiveTransform,
  projectiveMapping,
  inverseProjectiveMapping,
} from '../src/perspectiveTransform';

function toBeCloseTo(
  a: { x: number; y: number },
  b: { x: number; y: number },
  numDigits = 15
) {
  expect(a.x).toBeCloseTo(b.x, numDigits);
  expect(a.y).toBeCloseTo(b.y, numDigits);
}

describe('perspectiveTransform', () => {
  it('getPerspectiveTransform', () => {
    const PITCH_WIDTH = 35;
    const PITCH_HEIGHT = 22.666666666666664;
    const PITCH_OFFSET_PIXELS_X = 810;
    const PITCH_OFFSET_PIXELS_Y = 764;
    const TOP_BOTTOM_DIFF_PIXELS = 170;
    const CENTER_LINE_PIXELS = 1321;
    const BOTTOM_LINE_PIXELS = 3500;
    const TOP_LINE_PIXELS = BOTTOM_LINE_PIXELS - 2 * TOP_BOTTOM_DIFF_PIXELS;
    const PIXELS_X = BOTTOM_LINE_PIXELS / PITCH_WIDTH;
    const PIXELS_Y = CENTER_LINE_PIXELS / PITCH_HEIGHT;
    const PIXELS_Z = PIXELS_X;
    const SCALE_Y = PIXELS_Y / PIXELS_X;

    const topLeft = {
      x: PITCH_OFFSET_PIXELS_X + TOP_BOTTOM_DIFF_PIXELS,
      y: PITCH_OFFSET_PIXELS_Y,
    };

    const bottomLeft = {
      x: PITCH_OFFSET_PIXELS_X,
      y: PITCH_OFFSET_PIXELS_Y + CENTER_LINE_PIXELS,
    };

    const topRight = {
      x: PITCH_OFFSET_PIXELS_X + TOP_BOTTOM_DIFF_PIXELS + TOP_LINE_PIXELS,
      y: PITCH_OFFSET_PIXELS_Y,
    };

    const bottomRight = {
      x: PITCH_OFFSET_PIXELS_X + BOTTOM_LINE_PIXELS,
      y: PITCH_OFFSET_PIXELS_Y + CENTER_LINE_PIXELS,
    };

    const { perspectiveTransform, inversePerspectiveTransform } =
      getPerspectiveTransform([topLeft, topRight, bottomRight, bottomLeft]);

    let pos = projectiveMapping(0, 0, perspectiveTransform);
    expect(pos).toEqual(topLeft);

    pos = inverseProjectiveMapping(
      topLeft.x,
      topLeft.y,
      inversePerspectiveTransform
    );
    toBeCloseTo(pos, { x: 0, y: 0 });

    pos = projectiveMapping(1, 0, perspectiveTransform);
    expect(pos).toEqual(topRight);

    pos = inverseProjectiveMapping(
      topRight.x,
      topRight.y,
      inversePerspectiveTransform
    );
    toBeCloseTo(pos, { x: 1, y: 0 });

    pos = projectiveMapping(1, 1, perspectiveTransform);
    expect(pos).toEqual(bottomRight);

    pos = projectiveMapping(0, 1, perspectiveTransform);
    expect(pos).toEqual(bottomLeft);
  });
});
