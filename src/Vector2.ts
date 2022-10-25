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
  constructor(public X = 0, public Y = 0) {}

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
    return new Vector2(value1.X + value2.X, value1.Y + value2.Y);
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
      MathHelper.Barycentric(value1.X, value2.X, value3.X, amount1, amount2),
      MathHelper.Barycentric(value1.Y, value2.Y, value3.Y, amount1, amount2)
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
      MathHelper.CatmullRom(value1.X, value2.X, value3.X, value4.X, amount),
      MathHelper.CatmullRom(value1.Y, value2.Y, value3.Y, value4.Y, amount)
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
      MathHelper.Clamp(value1.X, min.X, max.X),
      MathHelper.Clamp(value1.Y, min.Y, max.Y)
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
    const v1 = value1.X - value2.X;
    const v2 = value1.Y - value2.Y;
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
    const v1 = value1.X - value2.X;
    const v2 = value1.Y - value2.Y;
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
    return new Vector2(value1.X * factor, value1.Y * factor);
  }

  /**
   * 计算两个矢量的点积。如果两个矢量均为单位矢量，则点积返回 -1 到 1 之间的浮点值，该值可以用来确定两个矢量之间的角度的一些性质。例如，它可以显示这些矢量是正交、平行，还是互为锐角或钝角。
   * @static
   * @param {Vector2} value1 源矢量。
   * @param {Vector2} value2 源矢量。
   * @returns {Number}
   */
  static Dot(value1: Vector2, value2: Vector2) {
    return value1.X * value2.X + value1.Y * value2.Y;
  }

  /**
   * 确定指定的 Object 是否等于 Vector2。
   * @param {Vector2} other 用于与当前 Vector2 比较的 Object。
   * @returns {Boolean}
   */
  Equals(other: Vector2) {
    return (
      Math.abs(this.X - other.X) < 1e-6 && Math.abs(this.Y - other.Y) < 1e-6
    );
  }

  GetHashCode() {
    return (this.X * 397) ^ this.Y;
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
      MathHelper.Hermite(value1.X, tangent1.X, value2.X, tangent2.X, amount),
      MathHelper.Hermite(value1.Y, tangent1.Y, value2.Y, tangent2.Y, amount)
    );
  }

  /**
   * 计算矢量的长度。
   * @returns {Number}
   */
  Length() {
    return Math.sqrt(this.X * this.X + this.Y * this.Y);
  }

  /**
   * 计算平方矢量的长度。
   * @returns {Number}
   */
  LengthSquared() {
    return this.X * this.X + this.Y * this.Y;
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
      MathHelper.Lerp(value1.X, value2.X, amount),
      MathHelper.Lerp(value1.Y, value2.Y, amount)
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
      value1.X > value2.X ? value1.X : value2.X,
      value1.Y > value2.Y ? value1.Y : value2.Y
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
      value1.X < value2.X ? value1.X : value2.X,
      value1.Y < value2.Y ? value1.Y : value2.Y
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
    return new Vector2(value1.X * scaleFactor, value1.Y * scaleFactor);
  }

  /**
   * 返回指向反方向的矢量。
   * @static
   * @param {Vector2} value 源矢量。
   * @returns {Vector2}
   */
  static Negate(value: Vector2) {
    return new Vector2(-value.X, -value.Y);
  }

  /**
   * 根据指定的矢量创建单位矢量。结果是与原始矢量相同方向的长度矢量单位。
   * @static
   * @param {Vector2} value 源 Vector2。
   * @return {Vector2}
   */
  static Normalize(value: Vector2) {
    const val = 1.0 / Math.sqrt(value.X * value.X + value.Y * value.Y);
    return new Vector2(value.X * val, value.Y * val);
  }

  /**
   * 将当前矢量转为单位矢量。结果是与原始矢量相同方向的长度矢量单位。
   */
  Normalize() {
    const val = 1 / Math.sqrt(this.X * this.X + this.Y * this.Y);
    this.X *= val;
    this.Y *= val;
  }

  /**
   * 确定给定矢量和法线的反射矢量。
   * @static
   * @param {Vector2} vector 源矢量。
   * @param {Vector2} normal vector 的法线。
   * @returns {Vector2}
   */
  static Reflect(vector: Vector2, normal: Vector2) {
    const val = 2.0 * (vector.X * normal.X + vector.Y * normal.Y);
    return new Vector2(vector.X - normal.X * val, vector.Y - normal.Y * val);
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
      MathHelper.SmoothStep(value1.X, value2.X, amount),
      MathHelper.SmoothStep(value1.Y, value2.Y, amount)
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
    return new Vector2(value1.X - value2.X, value1.Y - value2.Y);
  }

  ToString() {
    return `{X:${this.X} Y:${this.Y}}`;
  }

  /**
   * 通过指定矩阵变换矢量 (x, y, 0, 1)。
   * @static
   * @param {Vector2} position 源矢量。
   * @param {Matrix} matrix 变换矩阵。
   * @returns {Vector2}
   */
  static Transform(position: Vector2, matrix: Matrix) {
    const x = position.X * matrix.M11 + position.Y * matrix.M21 + matrix.M41;
    const y = position.X * matrix.M12 + position.Y * matrix.M22 + matrix.M42;
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
      normal.X * matrix.M11 + normal.Y * matrix.M21,
      normal.X * matrix.M12 + normal.Y * matrix.M22
    );
  }
}
