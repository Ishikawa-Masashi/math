import { describe, expect, it, test } from 'vitest';
import {
  dist3D_Line_to_Line,
  dist3D_Line_to_Segment,
  dist3D_Segment_to_Segment,
  Line,
  Segment,
} from '../src/lineSegmentDistance';
import { Vector3 } from '../src/math.vector';

test('dist3D_Line_to_Line 1', () => {
  const lineA: Line = {
    origin: new Vector3(0, 0, 0),
    dir: new Vector3(1, 0, 1),
  };

  const lineB: Line = {
    origin: new Vector3(32, 0, 0),
    dir: new Vector3(-1, 1, 1),
  };

  const result = dist3D_Line_to_Line(lineA, lineB);
  console.log(result);

  //   t.equal(
  //     Math.abs(result.distance - 13.063945294843615) < 1e-6,
  //     true,
  //     'distance tolerance smaller than 1e-5'
  //   );
  expect(Math.abs(result.distance - 13.063945294843615) < 1e-6).toBeTruthy();
});

test('dist3D_Line_to_Line 2', async (t) => {
  const lineA: Line = {
    origin: new Vector3(0, 0, 0),
    dir: new Vector3(1, 0, 1),
  };
  const lineB: Line = {
    origin: new Vector3(0, 5, 2),
    dir: new Vector3(1, 0, 0),
  };
  const result = dist3D_Line_to_Line(lineA, lineB);
  //   console.log(result);
  //   t.equal(
  //     Math.abs(result.distance - 5) < 1e-6,
  //     true,
  //     'distance tolerance smaller than 1e-5'
  //   );

  expect(Math.abs(result.distance - 5) < 1e-6).toBeTruthy();
  //   t.end();
});

test('dist3D_Line_to_segment 1', () => {
  const lineA: Line = {
    origin: new Vector3(0, 0, 0),
    dir: new Vector3(1, 0, 1),
  };
  const segmentB: Segment = {
    start: new Vector3(4, 8, 0),
    end: new Vector3(19, 8, 0),
  };
  const result = dist3D_Line_to_Segment(lineA, segmentB);
  console.log(result);
  //   t.equal(
  //     Math.abs(result.distance - Math.sqrt(72)) < 1e-6,
  //     true,
  //     'distance tolerance smaller than 1e-5'
  //   );

  expect(Math.abs(result.distance - Math.sqrt(72)) < 1e-6).toBeTruthy();
  //   t.end();
});

test('dist3D_segment_to_segment 1', () => {
  const segmentA: Segment = {
    start: new Vector3(0, 0, 5),
    end: new Vector3(0, 0, 20),
  };
  const segmentB: Segment = {
    start: new Vector3(4, 8, 0),
    end: new Vector3(19, 8, 0),
  };
  const result = dist3D_Segment_to_Segment(segmentA, segmentB);
  console.log(result);
  //   t.equal(
  //     Math.abs(result.distance - Math.sqrt(105)) < 1e-6,
  //     true,
  //     'distance tolerance smaller than 1e-5'
  //   );

  expect(Math.abs(result.distance - Math.sqrt(105)) < 1e-6).toBeTruthy();
  //   t.end();
});
