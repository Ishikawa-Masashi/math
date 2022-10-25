import { MathHelper } from './MathHelper';
import { Vector3 } from './Vector3';
import { Vector4 } from './Vector4';
import { Matrix } from './Matrix';
import { Quaternion } from './Quaternion';
// import BoundingSphere from './BoundingSphere';
// import BoundingFrustum from './BoundingFrustum';
// import BoundingBox from './BoundingBox';
// import { PlaneIntersectionType } from './PlaneIntersectionType';

export class Plane {
  /**
   * 新建 Plane 实例。
   * @constructs
   * @param {Vector3} normal Plane 的法线矢量。
   * @param {Number} d Plane 从原点位置起沿法线方向的距离。
   * @returns {Plane}
   */
  constructor(public Normal = Vector3.Zero, public D = 0) {}

  /**
   * 计算指定的 Vector4 和此 Plane 的点积。
   * @param {Vector4} value 要乘以此 Plane 的 Vector4。
   * @return {Number}
   */
  Dot(value: Vector4) {
    return (
      this.Normal.x * value.x +
      this.Normal.y * value.y +
      this.Normal.z * value.z +
      this.D * value.w
    );
  }

  /**
   * 返回指定的 Vector3 和此 Plane 的 Normal 矢量的点积加上 Plane 的距离 (D) 值。
   * @param {Vector3} value 要乘以的 Vector3。
   * @return {Number}
   */
  DotCoordinate(value: Vector3) {
    return (
      this.Normal.x * value.x +
      this.Normal.y * value.y +
      this.Normal.z * value.z +
      this.D
    );
  }

  /**
   * 返回指定的 Vector3 和此 Plane 的 Normal 矢量的点积。
   * @param {Vector3} value 要乘以的 Vector3。
   * @return {Number}
   */
  DotNormal(value: Vector3) {
    return (
      this.Normal.x * value.x +
      this.Normal.y * value.y +
      this.Normal.z * value.z
    );
  }

  /**
   * 确定指定的 Plane 是否等于 Plane。
   * @param {Plane} other 用于与当前 Plane 比较的 Plane。
   * @returns {Boolean}
   */
  Equals(other: Plane) {
    return (
      this.Normal.Equals(other.Normal) && Math.abs(this.D - other.D) < 1e-6
    );
  }

  GetHashCode() {
    return this.Normal.GetHashCode() ^ this.D;
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
    result.Normal = Vector3.Normalize(value.Normal);
    const factor =
      Math.sqrt(
        result.Normal.x * result.Normal.x +
          result.Normal.y * result.Normal.y +
          result.Normal.z * result.Normal.z
      ) /
      Math.sqrt(
        value.Normal.x * value.Normal.x +
          value.Normal.y * value.Normal.y +
          value.Normal.z * value.Normal.z
      );
    result.D = value.D * factor;
    return result;
  }

  /**
   * 更改该 Plane 的 Normal 矢量系数以使其成为单位长度。
   */
  Normalize() {
    const normal = Vector3.Normalize(this.Normal);
    const factor =
      Math.sqrt(
        normal.x * normal.x + normal.y * normal.y + normal.z * normal.z
      ) /
      Math.sqrt(
        this.Normal.x * this.Normal.x +
          this.Normal.y * this.Normal.y +
          this.Normal.z * this.Normal.z
      );
    this.Normal = normal;
    this.D *= factor;
  }

  ToString() {
    return `{Normal:${this.Normal.toString()} D:${this.D}}`;
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
}
