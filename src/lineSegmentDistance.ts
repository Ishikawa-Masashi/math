// import { vec3, ReadonlyVec3 } from 'gl-matrix';

import { Vector3 } from './math.vector';
import { Segment } from './segment';

//http://geomalgorithms.com/a07-_distance.html

const EPSILON = 1e-6;

export type Line = {
  origin: Vector3;
  dir: Vector3;
};

export function dist3D_Line_to_Line(L1: Line, L2: Line) {
  const u = L1.dir;
  const v = L2.dir;

  const w = L1.origin.subtract(L2.origin);

  const a = Vector3.Dot(u, u);
  const b = Vector3.Dot(u, v);
  const c = Vector3.Dot(v, v);
  const d = Vector3.Dot(u, w);
  const e = Vector3.Dot(v, w);
  const D = a * c - b * b;

  let sc: number;
  let tc: number;

  if (D < EPSILON) {
    // the lines are almost parallel
    sc = 0.0;
    tc = b > c ? d / b : e / c; // use the largest denominator
  } else {
    sc = (b * e - c * d) / D;
    tc = (a * e - b * d) / D;
  }

  const P1 = u.scale(sc); // L1(sc)
  const P2 = v.scale(tc); // L2(tc)
  const dP = w.add(P1.subtract(P2));

  return {
    // distance: vec3.len(dP),
    distance: dP.length(),
    l1_scale: sc,
    l2_scale: tc,
  };
}

export function dist3D_Segment_to_Segment(S1: Segment, S2: Segment) {
  const u = S1.end.subtract(S1.start);
  const v = S2.end.subtract(S2.start);

  const w = S1.start.subtract(S2.start);

  const a = Vector3.Dot(u, u);
  const b = Vector3.Dot(u, v);
  const c = Vector3.Dot(v, v);
  const d = Vector3.Dot(u, w);
  const e = Vector3.Dot(v, w);
  const D = a * c - b * b;

  // sc = sN / sD, default sD = D >= 0
  //   let sc: number;
  let sN: number;
  let sD = D;
  // tc = tN / tD, default tD = D >= 0
  //   let tc: number;
  let tN: number;
  let tD = D;
  if (D < EPSILON) {
    // the lines are almost parallel
    sN = 0.0;
    sD = 1.0;
    tN = e;
    tD = c;
  } else {
    sN = b * e - c * d;
    tN = a * e - b * d;
    if (sN < 0.0) {
      // sc < 0 => the s=0 edge is visible
      sN = 0.0;
      tN = e;
      tD = c;
    } else if (sN > sD) {
      // sc > 1  => the s=1 edge is visible
      sN = sD;
      tN = e + b;
      tD = c;
    }
  }
  if (tN < 0.0) {
    // tc < 0 => the t=0 edge is visible
    tN = 0.0;
    // recompute sc for this edge
    if (-d < 0.0) {
      sN = 0.0;
    } else if (-d > a) {
      sN = sD;
    } else {
      sN = -d;
      sD = a;
    }
  } else if (tN > tD) {
    // tc > 1  => the t=1 edge is visible
    tN = tD;
    // recompute sc for this edge
    if (-d + b < 0.0) {
      sN = 0;
    } else if (-d + b > a) {
      sN = sD;
    } else {
      sN = -d + b;
      sD = a;
    }
  }
  const sc = Math.abs(sN) < EPSILON ? 0.0 : sN / sD;
  const tc = Math.abs(tN) < EPSILON ? 0.0 : tN / tD;

  const P1 = u.scale(sc); // S1(sc)
  const P2 = v.scale(tc); // S2(tc)
  const dP = w.add(P1.subtract(P2));
  return {
    distance: dP.length(),
    s1_scale: sc,
    s2_scale: tc,
  };
}

export function dist3D_Line_to_Segment(L: Line, S: Segment) {
  const u = L.dir;
  const v = S.end.subtract(S.start);

  const w = L.origin.subtract(S.start);

  const a = Vector3.Dot(u, u);
  const b = Vector3.Dot(u, v);
  const c = Vector3.Dot(v, v);
  const d = Vector3.Dot(u, w);
  const e = Vector3.Dot(v, w);
  const D = a * c - b * b;

  //   let sc;
  let sN;
  let sD = D;
  //   let tc;
  let tN;
  let tD = D;
  if (D < EPSILON) {
    // the lines are almost parallel
    sN = 0.0; // force using point P0 on segment S1
    sD = 1.0; // to prevent possible division by 0.0 later
    tN = e;
    tD = c;
  } else {
    sN = b * e - c * d;
    tN = a * e - b * d;
    if (sN < 0.0) {
      sN = 0.0;
      tN = e;
      tD = c;
    }
  }
  if (tN < 0.0) {
    tN = 0.0;
    if (-d < 0.0) {
      sN = 0.0;
    } else {
      sN = -d;
      sD = a;
    }
  } else if (tN > tD) {
    tN = tD;
    if (-d + b < 0.0) {
      sN = 0;
    } else {
      sN = -d + b;
      sD = a;
    }
  }
  const sc = Math.abs(sN) < EPSILON ? 0.0 : sN / sD;
  const tc = Math.abs(tN) < EPSILON ? 0.0 : tN / tD;

  const P1 = u.scale(sc); // L(sc)
  const P2 = v.scale(tc); // S(tc)
  const dP = w.add(P1.subtract(P2));

  return {
    // distance: vec3.len(dP),
    distance: dP.length(),
    l1_scale: sc,
    s2_scale: tc,
  };
}
