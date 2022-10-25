import { MathHelper } from './MathHelper';
import { Vector2 } from './Vector2';
import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';
import { Matrix } from './Matrix';
// import TypeList from '../Core/TypeList.js';

export class Vector4 {
  /**
   * 初始化新的 Vector4 实例。
   * @constructs
   * @param {Number} x 矢量 x 色差的初始值。
   * @param {Number} y 矢量 y 色差的初始值。
   * @param {Number} z 矢量 z 色差的初始值。
   * @param {Number} w 矢量 w 色差的初始值。
   * @returns {Vector4}
   */
  constructor(public x = 0, public y = 0, public z = 0, public w = 0) {}

  /**
   * 返回所有组件均设置为一的 Vector4。
   * @static
   * @returns {Vector4}
   */
  static get One() {
    return new Vector4(1, 1, 1, 1);
  }

  /**
   * 返回 Vector4 (0, 0, 0, 1)。
   * @static
   * @returns {Vector4}
   */
  static get UnitW() {
    return new Vector4(0, 0, 0, 1);
  }

  /**
   * 返回 Vector4 (1, 0, 0, 0)。
   * @static
   * @returns {Vector4}
   */
  static get UnitX() {
    return new Vector4(1, 0, 0, 0);
  }

  /**
   * 返回 Vector4 (0, 1, 0, 0)。
   * @static
   * @returns {Vector4}
   */
  static get UnitY() {
    return new Vector4(0, 1, 0, 0);
  }

  /**
   * 返回 Vector4 (0, 0, 1, 0)。
   * @static
   * @returns {Vector4}
   */
  static get UnitZ() {
    return new Vector4(0, 0, 1, 0);
  }

  /**
   * 返回所有组件均设置为零的 Vector4。
   * @static
   * @returns {Vector4}
   */
  static get Zero() {
    return new Vector4(0, 0, 0, 0);
  }

  /**
   * 将两个矢量相加。
   * @static
   * @param {Vector4} value1 源矢量。
   * @param {Vector4} value2 源矢量。
   * @returns {Vector4}
   */
  static Add(value1: Vector4, value2: Vector4) {
    return new Vector4(
      value1.x + value2.x,
      value1.y + value2.y,
      value1.z + value2.z,
      value1.w + value2.w
    );
  }

  /**
   * 返回一个相对于 4D 三角形的质心（重心）坐标中某指定点的 4D Cartesian 坐标所在的 Vector4。
   * @static
   * @param {Vector4} value1 包含三角形顶点 1 的 4D Cartesian 坐标的 Vector4。
   * @param {Vector4} value2 包含三角形顶点 2 的 4D Cartesian 坐标的 Vector4。
   * @param {Vector4} value3 包含三角形顶点 3 的 4D Cartesian 坐标的 Vector4。
   * @param {Number} amount1 质心坐标 b2，用于表达趋向顶点 2 的权重因子（在 value2 中指定）。
   * @param {Number} amount2 质心坐标 b3，用于表达趋向顶点 3 的权重因子（在 value3 中指定）。
   * @returns {Vector4}
   */
  static Barycentric(
    value1: Vector4,
    value2: Vector4,
    value3: Vector4,
    amount1: number,
    amount2: number
  ) {
    return new Vector4(
      MathHelper.Barycentric(value1.x, value2.x, value3.x, amount1, amount2),
      MathHelper.Barycentric(value1.y, value2.y, value3.y, amount1, amount2),
      MathHelper.Barycentric(value1.z, value2.z, value3.z, amount1, amount2),
      MathHelper.Barycentric(value1.w, value2.w, value3.w, amount1, amount2)
    );
  }

  /**
   * 用指定的位置执行 Catmull-Rom 插值。
   * @static
   * @param {Vector4} value1 插值中的第一个位置。
   * @param {Vector4} value2 插值中的第二个位置。
   * @param {Vector4} value3 插值中的第三个位置。
   * @param {Vector4} value4 插值中的第四个位置。
   * @param {Number} amount 权重因子。
   * @returns {Vector4}
   */
  static CatmullRom(
    value1: Vector4,
    value2: Vector4,
    value3: Vector4,
    value4: Vector4,
    amount: number
  ) {
    return new Vector4(
      MathHelper.CatmullRom(value1.x, value2.x, value3.x, value4.x, amount),
      MathHelper.CatmullRom(value1.y, value2.y, value3.y, value4.y, amount),
      MathHelper.CatmullRom(value1.z, value2.z, value3.z, value4.z, amount),
      MathHelper.CatmullRom(value1.w, value2.w, value3.w, value3.w, amount)
    );
  }

  /**
   * 将值限制在指定范围内。
   * @static
   * @param {Vector4} value1 要限制的值。
   * @param {Vector4} min 最小值。
   * @param {Vector4} max 最大值。
   * @returns {Vector4}
   */
  static Clamp(value1: Vector4, min: Vector4, max: Vector4) {
    return new Vector4(
      MathHelper.Clamp(value1.x, min.x, max.x),
      MathHelper.Clamp(value1.y, min.y, max.y),
      MathHelper.Clamp(value1.z, min.z, max.z),
      MathHelper.Clamp(value1.w, min.w, max.w)
    );
  }

  /**
   * 计算两个矢量之间的距离。
   * @static
   * @param {Vector4} value1 源矢量。
   * @param {Vector4} value2 源矢量。
   * @returns {Number}
   */
  static Distance(value1: Vector4, value2: Vector4) {
    const result = Vector4.DistanceSquared(value1, value2);
    return Math.sqrt(result);
  }

  /**
   * 计算两个平方矢量之间的距离。
   * @static
   * @param {Vector4} value1 源矢量。
   * @param {Vector4} value2 源矢量。
   * @returns {Number}
   */
  static DistanceSquared(value1: Vector4, value2: Vector4) {
    const v1 = value1.x - value2.x;
    const v2 = value1.y - value2.y;
    const v3 = value1.z - value2.z;
    const v4 = value1.w - value2.w;
    return v1 * v1 + v2 * v2 + v3 * v3 + v4 * v4;
  }

  /**
   * 用一个矢量除以一个标量值。
   * @static
   * @param {Vector4} value1 源矢量。
   * @param {Number} divider 除数。
   * @returns {Vector4}
   */
  static Divide(value1: Vector4, divider: number) {
    const factor = 1 / divider;
    return new Vector4(
      value1.x * factor,
      value1.y * factor,
      value1.z * factor,
      value1.w * factor
    );
  }

  /**
   * 计算两个矢量的点积。
   * @static
   * @param {Vector4} value1 源矢量。
   * @param {Vector4} value2 源矢量。
   * @returns {Number}
   */
  static Dot(vector1: Vector4, vector2: Vector4) {
    return (
      vector1.x * vector2.x +
      vector1.y * vector2.y +
      vector1.z * vector2.z +
      vector1.w * vector2.w
    );
  }

  /**
   * 确定指定的 Object 是否等于 Vector4。
   * @param {Vector4} other 用于与当前 Vector4 比较的 Vector4。
   * @returns {Boolean}
   */
  Equals(other: Vector4) {
    return (
      Math.abs(this.x - other.x) < 1e-6 &&
      Math.abs(this.y - other.y) < 1e-6 &&
      Math.abs(this.z - other.z) < 1e-6 &&
      Math.abs(this.w - other.w) < 1e-6
    );
  }

  GetHashCode() {
    let hashCode = this.w;
    hashCode = (hashCode * 397) ^ this.x;
    hashCode = (hashCode * 397) ^ this.y;
    hashCode = (hashCode * 397) ^ this.z;
    return hashCode;
  }

  /**
   * 执行 Hermite 样条插值。
   * @static
   * @param {Vector4} value1 源位置矢量。
   * @param {Vector4} tangent1 源切线矢量。
   * @param {Vector4} value2 源位置矢量。
   * @param {Vector4} tangent2 源切线矢量。
   * @param {Number} amount 权重因子。
   * @returns {Vector4}
   */
  static Hermite(
    value1: Vector4,
    tangent1: Vector4,
    value2: Vector4,
    tangent2: Vector4,
    amount: number
  ) {
    return new Vector4(
      MathHelper.Hermite(value1.x, tangent1.x, value2.x, tangent2.x, amount),
      MathHelper.Hermite(value1.y, tangent1.y, value2.y, tangent2.y, amount),
      MathHelper.Hermite(value1.z, tangent1.z, value2.z, tangent2.z, amount),
      MathHelper.Hermite(value1.w, tangent1.w, value2.w, tangent2.w, amount)
    );
  }

  /**
   * 计算矢量的长度。
   * @returns {Number}
   */
  Length() {
    const result = Vector4.DistanceSquared(this, Vector4.Zero);
    return Math.sqrt(result);
  }

  /**
   * 计算平方矢量的长度。
   * @returns {Number}
   */
  LengthSquared() {
    return Vector4.DistanceSquared(this, Vector4.Zero);
  }

  /**
   * 在两个矢量之间执行线性插值。
   * @static
   * @param {Vector4} value1 源矢量。
   * @param {Vector4} value2 源矢量。
   * @param {Number} amount 指示 value2 权重的 0 到 1 之间的值。
   * @returns {Vector4}
   */
  static Lerp(value1: Vector4, value2: Vector4, amount: number) {
    return new Vector4(
      MathHelper.Lerp(value1.x, value2.x, amount),
      MathHelper.Lerp(value1.y, value2.y, amount),
      MathHelper.Lerp(value1.z, value2.z, amount),
      MathHelper.Lerp(value1.w, value2.w, amount)
    );
  }

  /**
   * 从每个匹配的组件对中返回包含最大值的矢量。
   * @static
   * @param {Vector4} value1 源矢量。
   * @param {Vector4} value2 源矢量。
   * @returns {Vector4}
   */
  static Max(value1: Vector4, value2: Vector4) {
    return new Vector4(
      value1.x > value2.x ? value1.x : value2.x,
      value1.y > value2.y ? value1.y : value2.y,
      value1.z > value2.z ? value1.z : value2.z,
      value1.w > value2.w ? value1.w : value2.w
    );
  }

  /**
   * 从每个匹配的组件对中返回包含最小值的矢量。
   * @static
   * @param {Vector4} value1 源矢量。
   * @param {Vector4} value2 源矢量。
   * @returns {Vector4}
   */
  static Min(value1: Vector4, value2: Vector4) {
    return new Vector4(
      value1.x < value2.x ? value1.x : value2.x,
      value1.y < value2.y ? value1.y : value2.y,
      value1.z < value2.z ? value1.z : value2.z,
      value1.w < value2.w ? value1.w : value2.w
    );
  }

  /**
   * 将一个矢量乘以一个标量。
   * @static
   * @param {Vector4} value1 源矢量。
   * @param {Number} scaleFactor 标量值。
   * @returns {Vector4}
   */
  static Multiply(value1: Vector4, scaleFactor: number) {
    return new Vector4(
      value1.x * scaleFactor,
      value1.y * scaleFactor,
      value1.z * scaleFactor,
      value1.w * scaleFactor
    );
  }

  /**
   * 返回指向反方向的矢量。
   * @static
   * @param {Vector4} value 源矢量。
   * @returns {Vector4}
   */
  static Negate(value: Vector4) {
    return new Vector4(-value.x, -value.y, -value.z, -value.w);
  }

  /**
   * 根据指定的矢量创建单位矢量。
   * @static
   * @param {Vector4} value 源 Vector4。
   * @return {Vector4}
   */
  static Normalize(value: Vector4) {
    let factor = Vector4.Distance(value, Vector4.Zero);
    factor = 1 / factor;
    return new Vector4(
      value.x * factor,
      value.y * factor,
      value.z * factor,
      value.w * factor
    );
  }

  /**
   * 将当前矢量转为单位矢量。
   */
  Normalize() {
    let factor = Vector4.Distance(this, Vector4.Zero);
    factor = 1 / factor;
    this.x *= factor;
    this.y *= factor;
    this.z *= factor;
    this.w *= factor;
  }

  /**
   * 使用三次方程计算两个值之间的插值。
   * @static
   * @param {Vector4} value1 源值。
   * @param {Vector4} value2 源值。
   * @param {Number} amount 权重值。
   * @returns {Vector4}
   */
  static SmoothStep(value1: Vector4, value2: Vector4, amount: number) {
    return new Vector4(
      MathHelper.SmoothStep(value1.x, value2.x, amount),
      MathHelper.SmoothStep(value1.y, value2.y, amount),
      MathHelper.SmoothStep(value1.z, value2.z, amount),
      MathHelper.SmoothStep(value1.w, value2.w, amount)
    );
  }

  /**
   * 将一个矢量减去一个矢量。
   * @static
   * @param {Vector4} value1 源矢量。
   * @param {Vector4} value2 源矢量。
   * @returns {Vector4}
   */
  static Subtract(value1: Vector4, value2: Vector4) {
    return new Vector4(
      value1.x - value2.x,
      value1.y - value2.y,
      value1.z - value2.z,
      value1.w - value2.w
    );
  }

  ToString() {
    return `{X:${this.x} Y:${this.y} Z:${this.z} W:${this.w}}`;
  }

  /**
   * 通过指定 Matrix 变换 Vector4。
   * @static
   * @param {Vector4} position 要变换的 Vector4。
   * @param {Matrix} matrix 要应用的 Matrix。
   * @returns {Vector4}
   */
  static Transform(position: Vector4, matrix: Matrix) {
    const x = position.x * matrix.m11 + position.y * matrix.m21 + matrix.m41;
    const y = position.x * matrix.m12 + position.y * matrix.m22 + matrix.m42;
    const z = position.x * matrix.m13 + position.y * matrix.m23 + matrix.m43;
    const w = position.x * matrix.m14 + position.y * matrix.m24 + matrix.m44;
    return new Vector4(x, y, z, w);
  }
}
