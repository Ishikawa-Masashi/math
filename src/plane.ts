// import BoundingSphere from './BoundingSphere';
// import BoundingFrustum from './BoundingFrustum';
// import BoundingBox from './BoundingBox';
// import { PlaneIntersectionType } from './PlaneIntersectionType';

import { Vector3, Vector4 } from './math.vector';

export class Plane {
  /**
   * 新建 Plane 实例。
   * @constructs
   * @param {Vector3} normal Plane 的法线矢量。
   * @param {Number} d Plane 从原点位置起沿法线方向的距离。
   * @returns {Plane}
   */
  constructor(public normal = new Vector3(), public d = 0) {}

  /**
   * 计算指定的 Vector4 和此 Plane 的点积。
   * @param {Vector4} value 要乘以此 Plane 的 Vector4。
   * @return {Number}
   */
  Dot(value: Vector4) {
    return (
      this.normal.x * value.x +
      this.normal.y * value.y +
      this.normal.z * value.z +
      this.d * value.w
    );
  }

  /**
   * 返回指定的 Vector3 和此 Plane 的 Normal 矢量的点积加上 Plane 的距离 (D) 值。
   * @param {Vector3} value 要乘以的 Vector3。
   * @return {Number}
   */
  DotCoordinate(value: Vector3) {
    return (
      this.normal.x * value.x +
      this.normal.y * value.y +
      this.normal.z * value.z +
      this.d
    );
  }

  /**
   * 返回指定的 Vector3 和此 Plane 的 Normal 矢量的点积。
   * @param {Vector3} value 要乘以的 Vector3。
   * @return {Number}
   */
  DotNormal(value: Vector3) {
    return (
      this.normal.x * value.x +
      this.normal.y * value.y +
      this.normal.z * value.z
    );
  }

  /**
   * 确定指定的 Plane 是否等于 Plane。
   * @param {Plane} other 用于与当前 Plane 比较的 Plane。
   * @returns {Boolean}
   */
  Equals(other: Plane) {
    return (
      this.normal.equals(other.normal) && Math.abs(this.d - other.d) < 1e-6
    );
  }

  GetHashCode() {
    return this.normal.getHashCode() ^ this.d;
  }

  // Intersects(...args) {
  //   return (Plane.prototype.Intersects = Overload.Create()
  //     .Add([BoundingSphere], function (sphere) {
  //       return sphere.Intersects(this);
  //     })
  //     .Add([BoundingFrustum], function (frustum) {
  //       return frustum.Intersects(this);
  //     })
  //     .Add([BoundingBox], function (box) {
  //       return box.Intersects(this);
  //     })
  //     .Add([Vector3], function (point) {
  //       const distance = this.DotCoordinate(point);

  //       if (distance > 0) {
  //         return PlaneIntersectionType.Front;
  //       }

  //       if (distance < 0) {
  //         return PlaneIntersectionType.Back;
  //       }

  //       return PlaneIntersectionType.Intersecting;
  //     })).call(this, ...args);
  // }

  /**
   * 更改 Plane 的 Normal 矢量系数以使其成为单位长度。
   * @static
   * @param {Plane} value 要法线化的 Plane。
   * @return {Plane}
   */
  static Normalize(value: Plane) {
    const result = new Plane();
    result.normal = Vector3.Normalize(value.normal);
    const factor =
      Math.sqrt(
        result.normal.x * result.normal.x +
          result.normal.y * result.normal.y +
          result.normal.z * result.normal.z
      ) /
      Math.sqrt(
        value.normal.x * value.normal.x +
          value.normal.y * value.normal.y +
          value.normal.z * value.normal.z
      );
    result.d = value.d * factor;
    return result;
  }

  /**
   * 更改该 Plane 的 Normal 矢量系数以使其成为单位长度。
   */
  Normalize() {
    const normal = Vector3.Normalize(this.normal);
    const factor =
      Math.sqrt(
        normal.x * normal.x + normal.y * normal.y + normal.z * normal.z
      ) /
      Math.sqrt(
        this.normal.x * this.normal.x +
          this.normal.y * this.normal.y +
          this.normal.z * this.normal.z
      );
    this.normal = normal;
    this.d *= factor;
  }

  ToString() {
    return `{Normal:${this.normal.toString()} D:${this.d}}`;
  }

  /**
   * 通过 Matrix 变换法线化 Plane。
   * @static
   * @param {Plane} plane 要变换的法线化 Plane。该 Plane 必须已进行法线化处理，以便在调用此方法前，其 Normal 矢量为单位长度。
   * @param {Matrix} matrix 要应用到 Plane 的变换 Matrix。
   * @returns {Plane}
   */
  // static Transform(plane: Plane, matrix: Matrix) {
  //   const transformedMatrix = Matrix.Transpose(Matrix.Invert(matrix));

  //   // const vector = new Vector4(plane.Normal, plane.D);
  //   const vector = new Vector4(
  //     plane.Normal.x,
  //     plane.Normal.y,
  //     plane.Normal.z,
  //     plane.D
  //   );

  //   const transformedVector = Vector4.Transform(vector, transformedMatrix);

  //   return new Plane(transformedVector);
  // }
  /**
   * Updates the current Plane from the plane defined by the three given points.
   * @param point1 one of the points used to construct the plane
   * @param point2 one of the points used to construct the plane
   * @param point3 one of the points used to construct the plane
   * @returns the updated Plane.
   */
  public copyFromPoints(
    point1: Vector3,
    point2: Vector3,
    point3: Vector3
  ): Plane {
    const x1 = point2.x - point1.x;
    const y1 = point2.y - point1.y;
    const z1 = point2.z - point1.z;
    const x2 = point3.x - point1.x;
    const y2 = point3.y - point1.y;
    const z2 = point3.z - point1.z;
    const yz = y1 * z2 - z1 * y2;
    const xz = z1 * x2 - x1 * z2;
    const xy = x1 * y2 - y1 * x2;
    const pyth = Math.sqrt(yz * yz + xz * xz + xy * xy);
    let invPyth;

    if (pyth !== 0) {
      invPyth = 1.0 / pyth;
    } else {
      invPyth = 0.0;
    }

    this.normal.x = yz * invPyth;
    this.normal.y = xz * invPyth;
    this.normal.z = xy * invPyth;
    this.d = -(
      this.normal.x * point1.x +
      this.normal.y * point1.y +
      this.normal.z * point1.z
    );

    return this;
  }
}
