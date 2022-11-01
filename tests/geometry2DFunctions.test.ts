import { describe, expect, it } from 'vitest';
import { Geometry2DFunctions } from '../src/geometry2DFunctions';

describe('Geometry2DFunctions', () => {
  it('perspectiveTransformation', () => {
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

    const perspective = Geometry2DFunctions.perspectiveTransformation({
      width: PITCH_WIDTH,
      height: PITCH_HEIGHT,
      topLeft,
      bottomLeft,
      topRight,
    });

    let pos = perspective.screenToWorldPoint(topLeft);
    expect(pos).toEqual({ x: 0, y: 0 });

    pos = perspective.screenToWorldPoint(bottomLeft);
    expect(pos).toEqual({ x: 0, y: PITCH_HEIGHT });

    pos = perspective.screenToWorldPoint(topRight);
    expect(pos).toEqual({ x: PITCH_WIDTH, y: 0 });

    pos = perspective.screenToWorldPoint(bottomRight);
    expect(pos).toEqual({ x: PITCH_WIDTH, y: PITCH_HEIGHT });

    let worldPos = perspective.worldToScreenPoint({ x: 0, y: 0 });
    expect(worldPos).toEqual(topLeft);

    worldPos = perspective.worldToScreenPoint({ x: PITCH_WIDTH, y: 0 });
    expect(worldPos).toEqual(topRight);

    worldPos = perspective.worldToScreenPoint({ x: 0, y: PITCH_HEIGHT });
    expect(worldPos).toEqual(bottomLeft);

    worldPos = perspective.worldToScreenPoint({
      x: PITCH_WIDTH,
      y: PITCH_HEIGHT,
    });
    expect(worldPos).toEqual(bottomRight);
  });
});
