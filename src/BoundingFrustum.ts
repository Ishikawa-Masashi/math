﻿// import MathHelper from './MathHelper.js';
// import Matrix from './Matrix.js';
// import BoundingSphere from './BoundingSphere.js';
// import PlaneIntersectionType from './PlaneIntersectionType.js';
// // import ContainmentType from './ContainmentType.js';
// import Vector3 from './Vector3.js';
// import BoundingBox from './BoundingBox.js';
// import Ray from './Ray.js';
// import Plane from './Plane.js';
// import TypeList from '../Core/TypeList.js';

import { Matrix } from './math.vector';
import { Plane } from './plane';

// function createPlanes() {
//   const planes = this._getPrivateVar('_planes');
//   const matrix = this._getPrivateVar('_matrix');
//   planes[0] = new Plane(-matrix.M13, -matrix.M23, -matrix.M33, -matrix.M43);
//   planes[1] = new Plane(
//     matrix.M13 - matrix.M14,
//     matrix.M23 - matrix.M24,
//     matrix.M33 - matrix.M34,
//     matrix.M43 - matrix.M44
//   );
//   planes[2] = new Plane(
//     -matrix.M14 - matrix.M11,
//     -matrix.M24 - matrix.M21,
//     -matrix.M34 - matrix.M31,
//     -matrix.M44 - matrix.M41
//   );
//   planes[3] = new Plane(
//     matrix.M11 - matrix.M14,
//     matrix.M21 - matrix.M24,
//     matrix.M31 - matrix.M34,
//     matrix.M41 - matrix.M44
//   );
//   planes[4] = new Plane(
//     matrix.M12 - matrix.M14,
//     matrix.M22 - matrix.M24,
//     matrix.M32 - matrix.M34,
//     matrix.M42 - matrix.M44
//   );
//   planes[5] = new Plane(
//     -matrix.M14 - matrix.M12,
//     -matrix.M24 - matrix.M22,
//     -matrix.M34 - matrix.M32,
//     -matrix.M44 - matrix.M42
//   );

//   normalizePlane(planes[0]);
//   normalizePlane(planes[1]);
//   normalizePlane(planes[2]);
//   normalizePlane(planes[3]);
//   normalizePlane(planes[4]);
//   normalizePlane(planes[5]);
// }

// function createCorners() {
//   const planes = this._getPrivateVar('_planes');
//   const corners = this._getPrivateVar('_corners');
//   corners[0] = intersectionPoint(planes[0], planes[2], planes[4]);
//   corners[1] = intersectionPoint(planes[0], planes[3], planes[4]);
//   corners[2] = intersectionPoint(planes[0], planes[3], planes[5]);
//   corners[3] = intersectionPoint(planes[0], planes[2], planes[5]);
//   corners[4] = intersectionPoint(planes[1], planes[2], planes[4]);
//   corners[5] = intersectionPoint(planes[1], planes[3], planes[4]);
//   corners[6] = intersectionPoint(planes[1], planes[3], planes[5]);
//   corners[7] = intersectionPoint(planes[1], planes[2], planes[5]);
// }

// function intersectionPoint(a, b, c) {
//   let v1, v2, v3;
//   let cross = Vector3.Cross(b.Normal, c.Normal);

//   let f = Vector3.Dot(a.Normal, cross);
//   f *= -1.0;

//   cross = Vector3.Cross(b.Normal, c.Normal);
//   v1 = Vector3.Multiply(cross, a.D);

//   cross = Vector3.Cross(c.Normal, a.Normal);
//   v2 = Vector3.Multiply(cross, b.D);

//   cross = Vector3.Cross(a.Normal, b.Normal);
//   v3 = Vector3.Multiply(cross, c.D);

//   const x = (v1.X + v2.X + v3.X) / f;
//   const y = (v1.Y + v2.Y + v3.Y) / f;
//   const z = (v1.Z + v2.Z + v3.Z) / f;
//   return new Vector3(x, y, z);
// }

// function normalizePlane(p) {
//   const factor = 1 / p.Normal.Length();
//   p.Normal.X *= factor;
//   p.Normal.Y *= factor;
//   p.Normal.Z *= factor;
//   p.D *= factor;
// }

export class BoundingFrustum {
  private _planes: Plane[] = [];
  private _matrix = new Matrix();
  // constructor(...args) {
  //   super();
  //   window.Object.defineProperties(this, {
  //     Matrix: {
  //       get: () => {
  //         return this._getPrivateVar('_matrix');
  //       },
  //       set: Overload.Create().Add([Matrix], (value) => {
  //         this._setPrivateVar('_matrix', value);
  //         createPlanes.call(this);
  //         createCorners.call(this);
  //       }),
  //     },
  //   });
  //   (
  //     BoundingFrustum.prototype.constructor._init ||
  //     (BoundingFrustum.prototype.constructor._init = Overload.Create().Add(
  //       [Matrix],
  //       function (value) {
  //         this._setPrivateVar('_matrix', value);
  //         this._setPrivateVar(
  //           '_corners',
  //           new Array(BoundingFrustum.CornerCount)
  //         );
  //         this._setPrivateVar('_planes', new Array(BoundingFrustum.PlaneCount));
  //         createPlanes.call(this);
  //         createCorners.call(this);
  //       }
  //     ))
  //   ).call(this, ...args);
  // }

  static get PlaneCount() {
    return 6;
  }

  static get CornerCount() {
    return 8;
  }

  // get Near() {
  //   return this._getPrivateVar('_planes')[0];
  // }
  // get Far() {
  //   return this._getPrivateVar('_planes')[1];
  // }
  // get Left() {
  //   return this._getPrivateVar('_planes')[2];
  // }
  // get Right() {
  //   return this._getPrivateVar('_planes')[3];
  // }
  // get Top() {
  //   return this._getPrivateVar('_planes')[4];
  // }
  // get Bottom() {
  //   return this._getPrivateVar('_planes')[5];
  // }
  // Contains(...args) {
  //   return (BoundingFrustum.prototype.Contains = Overload.Create()
  //     .Add([BoundingSphere], function (sphere) {
  //       let intersects = false;
  //       for (let i = 0; i < BoundingFrustum.PlaneCount; ++i) {
  //         const planeIntersectionType = sphere.Intersects(
  //           this._getPrivateVar('_planes')[i]
  //         );
  //         switch (planeIntersectionType) {
  //           case PlaneIntersectionType.Front:
  //             return ContainmentType.Disjoint;
  //           case PlaneIntersectionType.Intersecting:
  //             intersects = true;
  //             break;
  //         }
  //       }
  //       return intersects
  //         ? ContainmentType.Intersects
  //         : ContainmentType.Contains;
  //     })
  //     .Add([BoundingFrustum], function (frustum) {
  //       if (this == frustum) {return ContainmentType.Contains;}
  //       let intersects = false;
  //       for (let i = 0; i < BoundingFrustum.PlaneCount; ++i) {
  //         const planeIntersectionType = frustum.Intersects(
  //           this._getPrivateVar('_planes')[i]
  //         );
  //         switch (planeIntersectionType) {
  //           case PlaneIntersectionType.Front:
  //             return ContainmentType.Disjoint;
  //           case PlaneIntersectionType.Intersecting:
  //             intersects = true;
  //             break;
  //         }
  //       }
  //       return intersects
  //         ? ContainmentType.Intersects
  //         : ContainmentType.Contains;
  //     })
  //     .Add([BoundingBox], function (box) {
  //       let intersects = false;
  //       for (let i = 0; i < BoundingFrustum.PlaneCount; ++i) {
  //         const planeIntersectionType = box.Intersects(
  //           this._getPrivateVar('_planes')[i]
  //         );
  //         switch (planeIntersectionType) {
  //           case PlaneIntersectionType.Front:
  //             return ContainmentType.Disjoint;
  //           case PlaneIntersectionType.Intersecting:
  //             intersects = true;
  //             break;
  //         }
  //       }
  //       return intersects
  //         ? ContainmentType.Intersects
  //         : ContainmentType.Contains;
  //     })
  //     .Add([Vector3], function (point) {
  //       for (let i = 0; i < BoundingFrustum.PlaneCount; ++i) {
  //         const plane = this._getPrivateVar('_planes')[i];
  //         if (
  //           point.X * plane.Normal.X +
  //             point.Y * plane.Normal.Y +
  //             point.Z * plane.Normal.Z +
  //             plane.D >
  //           0
  //         ) {
  //           return ContainmentType.Disjoint;
  //         }
  //       }
  //       return ContainmentType.Contains;
  //     })).call(this, ...args);
  // }
  // Equals(...args) {
  //   return (BoundingFrustum.prototype.Equals = Overload.Create()
  //     .Add([BoundingFrustum], function (other) {
  //       return this == other;
  //     })
  //     .Add(['*'], function () {
  //       return false;
  //     })).call(this, ...args);
  // }
  // GetCorners(...args) {
  //   return (BoundingFrustum.prototype.GetCorners = Overload.Create()
  //     .Add([], function () {
  //       const corners = new TypeList(Vector3, BoundingFrustum.CornerCount);
  //       const _corners = this._getPrivateVar('_corners');
  //       for (let i = 0; i < BoundingFrustum.CornerCount; i++) {
  //         corners[i] = _corners[i];
  //       }
  //       return corners;
  //     })
  //     .Add([TypeList.T(Vector3)], function (corners) {
  //       if (corners == null) {
  //         throw new TypeError('corners');
  //       }
  //       if (corners.Length < BoundingFrustum.CornerCount) {
  //         throw new RangeError('corners');
  //       }
  //       const _corners = this._getPrivateVar('_corners');
  //       for (let i = 0; i < BoundingFrustum.CornerCount; i++) {
  //         corners[i] = _corners[i];
  //       }
  //     })).call(this, ...args);
  // }
  // GetHashCode(...args) {
  //   return (BoundingFrustum.prototype.GetHashCode = Overload.Create().Add(
  //     [],
  //     function () {
  //       return this._getPrivateVar('_matrix').GetHashCode();
  //     }
  //   )).call(this, ...args);
  // }
  // Intersects(...args) {
  //   return (BoundingFrustum.prototype.Intersects = Overload.Create()
  //     .Add([BoundingSphere], function (sphere) {
  //       const containment = this.Contains(sphere);
  //       return containment != ContainmentType.Disjoint;
  //     })
  //     .Add([BoundingFrustum], function (frustum) {
  //       return this.Contains(frustum) != ContainmentType.Disjoint;
  //     })
  //     .Add([BoundingBox], function (box) {
  //       const containment = this.Contains(box);
  //       return containment != ContainmentType.Disjoint;
  //     })
  //     .Add([Plane], function (plane) {
  //       const _corners = this._getPrivateVar('_corners');
  //       let result = plane.Intersects(_corners[0]);
  //       for (let i = 1; i < _corners.length; i++) {
  //         if (plane.Intersects(_corners[i]) != result) {
  //           result = PlaneIntersectionType.Intersecting;
  //         }
  //       }
  //       return result;
  //     })
  //     .Add([Ray], function (ray) {
  //       const ctype = this.Contains(ray.Position);
  //       switch (ctype) {
  //         case ContainmentType.Disjoint:
  //           return null;
  //         case ContainmentType.Contains:
  //           return 0.0;
  //         case ContainmentType.Intersects:
  //           return 0.0;
  //         //throw new NotImplementedException();
  //         default:
  //           throw new RangeError();
  //       }
  //     })).call(this, ...args);
  // }
  // ToString(...args) {
  //   return (BoundingFrustum.prototype.ToString = Overload.Create().Add(
  //     [],
  //     function () {
  //       const _planes = this._getPrivateVar('_planes');
  //       return (
  //         '{Near: ' +
  //         _planes[0].ToString() +
  //         ' Far:' +
  //         _planes[1].ToString() +
  //         ' Left:' +
  //         _planes[2].ToString() +
  //         ' Right:' +
  //         _planes[3].ToString() +
  //         ' Top:' +
  //         _planes[4].ToString() +
  //         ' Bottom:' +
  //         _planes[5].ToString() +
  //         '}'
  //       );
  //     }
  //   )).call(this, ...args);
  // }
  // Serialize(...args) {
  //   const superSerialize = super.Serialize;
  //   return (BoundingFrustum.prototype.Serialize = Overload.Create().Add(
  //     [String],
  //     function () {
  //       return superSerialize.call(this, {
  //         Matrix: this.Matrix,
  //       });
  //     }
  //   )).call(this, ...args);
  // }
  // static Deserialize(...args) {
  //   return (BoundingFrustum.Deserialize = Overload.Create()
  //     .Add([String], function (str) {
  //       return this.Deserialize(JSON.parse(str));
  //     })
  //     .Add([window.Object], function (obj) {
  //       if (obj['Symbol'] !== BoundingFrustum.name) {
  //         throw new TypeError('Unrecognized type');
  //       }
  //       const matrix = Matrix.Deserialize(obj.Matrix);
  //       return new BoundingFrustum(matrix);
  //     })).call(this, ...args);
  // }
}
