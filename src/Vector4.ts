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
  constructor(public X = 0, public Y = 0, public Z = 0, public W = 0) {}

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
      value1.X + value2.X,
      value1.Y + value2.Y,
      value1.Z + value2.Z,
      value1.W + value2.W
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
      MathHelper.Barycentric(value1.X, value2.X, value3.X, amount1, amount2),
      MathHelper.Barycentric(value1.Y, value2.Y, value3.Y, amount1, amount2),
      MathHelper.Barycentric(value1.Z, value2.Z, value3.Z, amount1, amount2),
      MathHelper.Barycentric(value1.W, value2.W, value3.W, amount1, amount2)
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
      MathHelper.CatmullRom(value1.X, value2.X, value3.X, value4.X, amount),
      MathHelper.CatmullRom(value1.Y, value2.Y, value3.Y, value4.Y, amount),
      MathHelper.CatmullRom(value1.Z, value2.Z, value3.Z, value4.Z, amount),
      MathHelper.CatmullRom(value1.W, value2.W, value3.W, value3.W, amount)
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
      MathHelper.Clamp(value1.X, min.X, max.X),
      MathHelper.Clamp(value1.Y, min.Y, max.Y),
      MathHelper.Clamp(value1.Z, min.Z, max.Z),
      MathHelper.Clamp(value1.W, min.W, max.W)
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
    const v1 = value1.X - value2.X;
    const v2 = value1.Y - value2.Y;
    const v3 = value1.Z - value2.Z;
    const v4 = value1.W - value2.W;
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
      value1.X * factor,
      value1.Y * factor,
      value1.Z * factor,
      value1.W * factor
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
      vector1.X * vector2.X +
      vector1.Y * vector2.Y +
      vector1.Z * vector2.Z +
      vector1.W * vector2.W
    );
  }

  /**
   * 确定指定的 Object 是否等于 Vector4。
   * @param {Vector4} other 用于与当前 Vector4 比较的 Vector4。
   * @returns {Boolean}
   */
  Equals(other: Vector4) {
    return (
      Math.abs(this.X - other.X) < 1e-6 &&
      Math.abs(this.Y - other.Y) < 1e-6 &&
      Math.abs(this.Z - other.Z) < 1e-6 &&
      Math.abs(this.W - other.W) < 1e-6
    );
  }

  GetHashCode() {
    let hashCode = this.W;
    hashCode = (hashCode * 397) ^ this.X;
    hashCode = (hashCode * 397) ^ this.Y;
    hashCode = (hashCode * 397) ^ this.Z;
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
      MathHelper.Hermite(value1.X, tangent1.X, value2.X, tangent2.X, amount),
      MathHelper.Hermite(value1.Y, tangent1.Y, value2.Y, tangent2.Y, amount),
      MathHelper.Hermite(value1.Z, tangent1.Z, value2.Z, tangent2.Z, amount),
      MathHelper.Hermite(value1.W, tangent1.W, value2.W, tangent2.W, amount)
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
      MathHelper.Lerp(value1.X, value2.X, amount),
      MathHelper.Lerp(value1.Y, value2.Y, amount),
      MathHelper.Lerp(value1.Z, value2.Z, amount),
      MathHelper.Lerp(value1.W, value2.W, amount)
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
      value1.X > value2.X ? value1.X : value2.X,
      value1.Y > value2.Y ? value1.Y : value2.Y,
      value1.Z > value2.Z ? value1.Z : value2.Z,
      value1.W > value2.W ? value1.W : value2.W
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
      value1.X < value2.X ? value1.X : value2.X,
      value1.Y < value2.Y ? value1.Y : value2.Y,
      value1.Z < value2.Z ? value1.Z : value2.Z,
      value1.W < value2.W ? value1.W : value2.W
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
      value1.X * scaleFactor,
      value1.Y * scaleFactor,
      value1.Z * scaleFactor,
      value1.W * scaleFactor
    );
  }

  /**
   * 返回指向反方向的矢量。
   * @static
   * @param {Vector4} value 源矢量。
   * @returns {Vector4}
   */
  static Negate(value: Vector4) {
    return new Vector4(-value.X, -value.Y, -value.Z, -value.W);
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
      value.X * factor,
      value.Y * factor,
      value.Z * factor,
      value.W * factor
    );
  }

  /**
   * 将当前矢量转为单位矢量。
   */
  Normalize() {
    let factor = Vector4.Distance(this, Vector4.Zero);
    factor = 1 / factor;
    this.X *= factor;
    this.Y *= factor;
    this.Z *= factor;
    this.W *= factor;
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
      MathHelper.SmoothStep(value1.X, value2.X, amount),
      MathHelper.SmoothStep(value1.Y, value2.Y, amount),
      MathHelper.SmoothStep(value1.Z, value2.Z, amount),
      MathHelper.SmoothStep(value1.W, value2.W, amount)
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
      value1.X - value2.X,
      value1.Y - value2.Y,
      value1.Z - value2.Z,
      value1.W - value2.W
    );
  }

  ToString() {
    return `{X:${this.X} Y:${this.Y} Z:${this.Z} W:${this.W}}`;
  }

  /**
   * 通过指定 Matrix 变换 Vector4。
   * @static
   * @param {Vector4} position 要变换的 Vector4。
   * @param {Matrix} matrix 要应用的 Matrix。
   * @returns {Vector4}
   */
  static Transform(position: Vector4, matrix: Matrix) {
    const x = position.X * matrix.M11 + position.Y * matrix.M21 + matrix.M41;
    const y = position.X * matrix.M12 + position.Y * matrix.M22 + matrix.M42;
    const z = position.X * matrix.M13 + position.Y * matrix.M23 + matrix.M43;
    const w = position.X * matrix.M14 + position.Y * matrix.M24 + matrix.M44;
    return new Vector4(x, y, z, w);
  }
}
