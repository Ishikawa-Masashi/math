// import { Line } from '../src/Line';
// import { Transform } from '../src/Transform';
// import { Point3d } from '../src/Point3d';
// import { Vector3d } from '../src/Vector3d';

import { expect, test, beforeEach } from 'vitest';
import { Vector3 } from '../src/math.vector';
import { Segment } from '../src/segment';

let v1: Vector3;
let v2: Vector3;
let l1: Segment;
let l2: Segment;
let lInvalid: Segment;

beforeEach(() => {
  v1 = new Vector3(-2, 6, 4);
  v2 = new Vector3(4, 8, -2);
  l1 = new Segment(v1, v2);
  lInvalid = new Segment(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
});

test('Constructor', () => {
  expect(l1.start.equals(v1)).toBe(true);
  expect(l1.end.equals(v2)).toBe(true);
});

test('IsValid', () => {
  expect(l1.IsValid).toBe(true);
  expect(lInvalid.IsValid).toBe(false);
});

test('Direction', () => {
  expect(l1.Direction.equals(new Vector3(6, 2, -6))).toBe(true);
  expect(() => lInvalid.Direction).toThrowError();
});

test('UnitDirection', () => {
  expect(l1.UnitDirection.x).toBeCloseTo(0.688, 3);
  expect(l1.UnitDirection.y).toBeCloseTo(0.229, 3);
  expect(l1.UnitDirection.z).toBeCloseTo(-0.688, 3);
  expect(() => lInvalid.UnitDirection).toThrowError();
});

test('Length', () => {
  // get
  expect(l1.Length).toBeCloseTo(8.718, 3);
  expect(lInvalid.Length).toBe(0);

  // set
  l1.Length = 11;
  expect(l1.start.equals(v1)).toBe(true);
  expect(l1.end.x).toBeCloseTo(5.571, 3);
  expect(l1.end.y).toBeCloseTo(8.524, 3);
  expect(l1.end.z).toBeCloseTo(-3.571, 3);
});

test('Equals', () => {
  expect(l1.Equals(l1)).toBe(true);
});

test('Clone', () => {
  expect(l1.Clone().Equals(l1)).toBe(true);
  expect(lInvalid.Clone().Equals(l1)).toBe(false);
});

test('PointAt', () => {
  expect(l1.PointAt(0).equals(v1)).toBe(true);
  expect(l1.PointAt(1).equals(v2)).toBe(true);
  expect(l1.PointAt(0.5).equals(new Vector3(1, 7, 1))).toBe(true);
  expect(l1.PointAt(-1).equals(new Vector3(-8, 4, 10))).toBe(true);

  expect(() => lInvalid.PointAt(0)).toThrowError();
});

test('PointAtLength', () => {
  expect(l1.PointAtLength(0).equals(v1)).toBe(true);
  expect(l1.PointAtLength(10).x).toBeCloseTo(4.882, 3);
  expect(l1.PointAtLength(10).y).toBeCloseTo(8.294, 3);
  expect(l1.PointAtLength(10).z).toBeCloseTo(-2.882, 3);
  expect(l1.PointAtLength(-1).x).toBeCloseTo(-2.688, 3);
  expect(l1.PointAtLength(-1).y).toBeCloseTo(5.771, 3);
  expect(l1.PointAtLength(-1).z).toBeCloseTo(4.688, 3);

  expect(() => lInvalid.PointAt(0)).toThrowError();
});

test('ClosestParameter', () => {
  let p = new Vector3(0, 0, 0);
  expect(l1.ClosestParameter(p)).toBeCloseTo(0.315789, 3);
  expect(l1.ClosestPoint(p).x).toBeCloseTo(-0.105, 3);
  expect(l1.ClosestPoint(p).y).toBeCloseTo(6.632, 3);
  expect(l1.ClosestPoint(p).z).toBeCloseTo(2.105, 3);

  p = new Vector3(-16, 0, 0);
  expect(l1.ClosestParameter(p, true)).toBe(0);
  expect(l1.ClosestPoint(p, true).equals(v1)).toBe(true);

  expect(l1.ClosestParameter(p)).toBeCloseTo(-0.947, 3);
  expect(l1.ClosestPoint(p).x).toBeCloseTo(-7.684, 3);
  expect(l1.ClosestPoint(p).y).toBeCloseTo(4.105, 3);
  expect(l1.ClosestPoint(p).z).toBeCloseTo(9.684, 3);

  expect(() => lInvalid.ClosestParameter(p)).toThrowError();
});

test('ClosestPoint', () => {
  let p = new Vector3(1000, 1000, 0);
  l1 = new Segment(new Vector3(0, 2000, 0), new Vector3(2000, 2000, 0));
  expect(l1.ClosestParameter(p)).toBeCloseTo(0.5, 3);
  expect(l1.ClosestPoint(p).equals(new Vector3(1000, 2000, 0))).toBe(true);
});

test('DistanceTo', () => {
  let p = new Vector3(0, 0, 0);
  expect(l1.DistanceTo(p)).toBeCloseTo(6.959, 3);

  p = new Vector3(-16, 0, 0);
  expect(l1.DistanceTo(p, true)).toBeCloseTo(15.748, 3);
  expect(l1.DistanceTo(p)).toBeCloseTo(13.409, 3);

  expect(() => lInvalid.DistanceTo(p)).toThrowError();
});

test('Extend', () => {
  expect(l1.Extend(1, 1).start.x).toBeCloseTo(-2.688, 3);
  expect(l1.Extend(1, 1).start.y).toBeCloseTo(5.771, 3);
  expect(l1.Extend(1, 1).start.z).toBeCloseTo(4.688, 3);
  expect(l1.Extend(1, 1).end.x).toBeCloseTo(4.688, 3);
  expect(l1.Extend(1, 1).end.y).toBeCloseTo(8.229, 3);
  expect(l1.Extend(1, 1).end.z).toBeCloseTo(-2.688, 3);
});

test('Flip', () => {
  expect(l1.Flip().start.equals(v2)).toBe(true);
  expect(l1.Flip().end.equals(v1)).toBe(true);
});

// test('Transform', () => {
//   // test rotation
//   const rotation = Transform.Rotation(
//     Math.PI / 2,
//     new Vector3d(0, 0, 1),
//     new Point3d(0, 0, 0)
//   );
//   expect(
//     l1
//       .Transform(rotation)
//       .Equals(new Line(new Point3d(-6, -2, 4), new Point3d(-8, 4, -2)))
//   ).toBe(true);
// });
