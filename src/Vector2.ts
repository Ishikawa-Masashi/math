import { MathHelper } from './MathHelper';
import { Matrix } from './Matrix';
// import TypeList from '../Core/TypeList.js';

export class Vector2 {
  /**
   * 初始化新的 Vector2 实例。
   * @constructs
   * @param {Number} x 矢量 x 色差的初始值。
   * @param {Number} y 矢量 y 色差的初始值。
   * @returns {Vector2}
   */
  constructor(public x = 0, public y = 0) {}

  /**
   * 返回两个组件均设置为一的 Vector2。
   * @static
   * @returns {Vector2}
   */
  static get One() {
    return new Vector2(1, 1);
  }

  /**
   * 返回 x 轴的单位矢量。
   * @static
   * @returns {Vector2}
   */
  static get UnitX() {
    return new Vector2(1, 0);
  }

  /**
   * 返回 y 轴的单位矢量。
   * @static
   * @returns {Vector2}
   */
  static get UnitY() {
    return new Vector2(0, 1);
  }

  /**
   * 返回所有组件均设置为零的 Vector2。
   * @static
   * @returns {Vector2}
   */
  static get Zero() {
    return new Vector2(0, 0);
  }

  /**
   * 将两个矢量相加。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Vector2} value2 源矢量。
   * @returns {Vector2}
   */
  static Add(value1: Vector2, value2: Vector2) {
    return new Vector2(value1.x + value2.x, value1.y + value2.y);
  }

  /**
   * 返回一个相对于 2D 三角形的质心（重心）坐标中某指定点的 2D Cartesian 坐标所在的 Vector2。
   * @static
   * @param {Vector2} value1 包含三角形顶点 1 的 2D Cartesian 坐标的 Vector2。
   * @param {Vector2} value2 包含三角形顶点 2 的 2D Cartesian 坐标的 Vector2。
   * @param {Vector2} value3 包含三角形顶点 3 的 2D Cartesian 坐标的 Vector2。
   * @param {Number} amount1 质心坐标 b2，用于表达趋向顶点 2 的权重因子（在 value2 中指定）。
   * @param {Number} amount2 质心坐标 b3，用于表达趋向顶点 3 的权重因子（在 value3 中指定）。
   * @returns {Vector2}
   */
  static Barycentric(
    value1: Vector2,
    value2: Vector2,
    value3: Vector2,
    amount1: number,
    amount2: number
  ) {
    return new Vector2(
      MathHelper.Barycentric(value1.x, value2.x, value3.x, amount1, amount2),
      MathHelper.Barycentric(value1.y, value2.y, value3.y, amount1, amount2)
    );
  }

  /**
   * 用指定的位置执行 Catmull-Rom 插值。
   * @static
   * @param {Vector2} value1 插值中的第一个位置。
   * @param {Vector2} value2 插值中的第二个位置。
   * @param {Vector2} value3 插值中的第三个位置。
   * @param {Vector2} value4 插值中的第四个位置。
   * @param {Number} amount 权重因子。
   * @returns {Vector2}
   */
  static CatmullRom(
    value1: Vector2,
    value2: Vector2,
    value3: Vector2,
    value4: Vector2,
    amount: number
  ) {
    return new Vector2(
      MathHelper.CatmullRom(value1.x, value2.x, value3.x, value4.x, amount),
      MathHelper.CatmullRom(value1.y, value2.y, value3.y, value4.y, amount)
    );
  }

  /**
   * 将值限制在指定范围内。
   * @static
   * @param {Vector2} value1 要限制的值。
   * @param {Vector2} min 最小值。
   * @param {Vector2} max 最大值。
   * @returns {Vector2}
   */
  static Clamp(value1: Vector2, min: Vector2, max: Vector2) {
    return new Vector2(
      MathHelper.Clamp(value1.x, min.x, max.x),
      MathHelper.Clamp(value1.y, min.y, max.y)
    );
  }

  /**
   * 计算两个矢量之间的距离。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Vector2} value2 源矢量。
   * @returns {Number}
   */
  static Distance(value1: Vector2, value2: Vector2) {
    const v1 = value1.x - value2.x;
    const v2 = value1.y - value2.y;
    return Math.sqrt(v1 * v1 + v2 * v2);
  }
  /**
   * 计算两个平方矢量之间的距离。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Vector2} value2 源矢量。
   * @returns {Number}
   */
  static DistanceSquared(value1: Vector2, value2: Vector2) {
    const v1 = value1.x - value2.x;
    const v2 = value1.y - value2.y;
    return v1 * v1 + v2 * v2;
  }

  /**
   * 用一个矢量除以一个标量值。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Number} divider 除数。
   * @returns {Vector2}
   */
  static Divide(value1: Vector2, divider: number) {
    const factor = 1 / divider;
    return new Vector2(value1.x * factor, value1.y * factor);
  }

  /**
   * 计算两个矢量的点积。如果两个矢量均为单位矢量，则点积返回 -1 到 1 之间的浮点值，该值可以用来确定两个矢量之间的角度的一些性质。例如，它可以显示这些矢量是正交、平行，还是互为锐角或钝角。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Vector2} value2 源矢量。
   * @returns {Number}
   */
  static Dot(value1: Vector2, value2: Vector2) {
    return value1.x * value2.x + value1.y * value2.y;
  }

  /**
   * 确定指定的 Object 是否等于 Vector2。
   * @param {Vector2} other 用于与当前 Vector2 比较的 Object。
   * @returns {Boolean}
   */
  Equals(other: Vector2) {
    return (
      Math.abs(this.x - other.x) < 1e-6 && Math.abs(this.y - other.y) < 1e-6
    );
  }

  GetHashCode() {
    return (this.x * 397) ^ this.y;
  }

  /**
   * 执行 Hermite 样条插值。
   * @static
   * @param {Vector2} value1 源位置矢量。
   * @param {Vector2} tangent1 源切线矢量。
   * @param {Vector2} value2 源位置矢量。
   * @param {Vector2} tangent2 源切线矢量。
   * @param {Number} amount 权重因子。
   * @returns {Vector2}
   */
  static Hermite(
    value1: Vector2,
    tangent1: Vector2,
    value2: Vector2,
    tangent2: Vector2,
    amount: number
  ) {
    return new Vector2(
      MathHelper.Hermite(value1.x, tangent1.x, value2.x, tangent2.x, amount),
      MathHelper.Hermite(value1.y, tangent1.y, value2.y, tangent2.y, amount)
    );
  }

  /**
   * 计算矢量的长度。
   * @returns {Number}
   */
  Length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * 计算平方矢量的长度。
   * @returns {Number}
   */
  LengthSquared() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * 在两个矢量之间执行线性插值。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Vector2} value2 源矢量。
   * @param {Number} amount 指示 value2 权重的 0 到 1 之间的值。
   * @returns {Vector2}
   */
  static Lerp(value1: Vector2, value2: Vector2, amount: number) {
    return new Vector2(
      MathHelper.Lerp(value1.x, value2.x, amount),
      MathHelper.Lerp(value1.y, value2.y, amount)
    );
  }

  /**
   * 从每个匹配的组件对中返回包含最大值的矢量。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Vector2} value2 源矢量。
   * @returns {Vector2}
   */
  static Max(value1: Vector2, value2: Vector2) {
    return new Vector2(
      value1.x > value2.x ? value1.x : value2.x,
      value1.y > value2.y ? value1.y : value2.y
    );
  }

  /**
   * 从每个匹配的组件对中返回包含最小值的矢量。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Vector2} value2 源矢量。
   * @returns {Vector2}
   */
  static Min(value1: Vector2, value2: Vector2) {
    return new Vector2(
      value1.x < value2.x ? value1.x : value2.x,
      value1.y < value2.y ? value1.y : value2.y
    );
  }

  /**
   * 将一个矢量乘以一个标量值。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Number} scaleFactor 标量值。
   * @returns {Vector2}
   */
  static Multiply(value1: Vector2, scaleFactor: number) {
    return new Vector2(value1.x * scaleFactor, value1.y * scaleFactor);
  }

  /**
   * 返回指向反方向的矢量。
   * @static
   * @param {Vector2} value 源矢量。
   * @returns {Vector2}
   */
  static Negate(value: Vector2) {
    return new Vector2(-value.x, -value.y);
  }

  /**
   * 根据指定的矢量创建单位矢量。结果是与原始矢量相同方向的长度矢量单位。
   * @static
   * @param {Vector2} value 源 Vector2。
   * @return {Vector2}
   */
  static Normalize(value: Vector2) {
    const val = 1.0 / Math.sqrt(value.x * value.x + value.y * value.y);
    return new Vector2(value.x * val, value.y * val);
  }

  /**
   * 将当前矢量转为单位矢量。结果是与原始矢量相同方向的长度矢量单位。
   */
  Normalize() {
    const val = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
    this.x *= val;
    this.y *= val;
  }

  /**
   * 确定给定矢量和法线的反射矢量。
   * @static
   * @param {Vector2} vector 源矢量。
   * @param {Vector2} normal vector 的法线。
   * @returns {Vector2}
   */
  static Reflect(vector: Vector2, normal: Vector2) {
    const val = 2.0 * (vector.x * normal.x + vector.y * normal.y);
    return new Vector2(vector.x - normal.x * val, vector.y - normal.y * val);
  }

  /**
   * 使用三次方程计算两个值之间的插值。
   * @static
   * @param {Vector2} value1 源值。
   * @param {Vector2} value2 源值。
   * @param {Number} amount 权重值。
   * @returns {Vector2}
   */
  static SmoothStep(value1: Vector2, value2: Vector2, amount: number) {
    return new Vector2(
      MathHelper.SmoothStep(value1.x, value2.x, amount),
      MathHelper.SmoothStep(value1.y, value2.y, amount)
    );
  }

  /**
   * 将一个矢量减去一个矢量。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Vector2} value2 源矢量。
   * @returns {Vector2}
   */
  static Subtract(value1: Vector2, value2: Vector2) {
    return new Vector2(value1.x - value2.x, value1.y - value2.y);
  }

  ToString() {
    return `{X:${this.x} Y:${this.y}}`;
  }

  /**
   * 通过指定矩阵变换矢量 (x, y, 0, 1)。
   * @static
   * @param {Vector2} position 源矢量。
   * @param {Matrix} matrix 变换矩阵。
   * @returns {Vector2}
   */
  static Transform(position: Vector2, matrix: Matrix) {
    const x = position.x * matrix.M11 + position.y * matrix.M21 + matrix.M41;
    const y = position.x * matrix.M12 + position.y * matrix.M22 + matrix.M42;
    return new Vector2(x, y);
  }

  /**
   * 通过矩阵变换 2D 矢量法线。
   * @static
   * @param {Vector2} normal 源矢量。
   * @param {Matrix} matrix 变换矩阵。
   * @returns {Vector2}
   */
  static TransformNormal(normal: Vector2, matrix: Matrix) {
    return new Vector2(
      normal.x * matrix.M11 + normal.y * matrix.M21,
      normal.x * matrix.M12 + normal.y * matrix.M22
    );
  }
}
