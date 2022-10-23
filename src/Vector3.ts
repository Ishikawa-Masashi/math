import MathHelper from './MathHelper';
import { Vector2 } from './Vector2';
import { Quaternion } from './Quaternion';
import { Matrix } from './Matrix';

export class Vector3 {
  /**
   * 新建 Vector3 实例。
   * @constructs
   * @param {number} x 矢量 x 色差的初始值。
   * @param {number} y 矢量 y 色差的初始值。
   * @param {number} z 矢量 z 色差的初始值。
   * @returns {Vector3}
   */
  constructor(public X = 0, public Y = 0, public Z = 0) {}

  /**
   * 返回所有组件为一体的 Vector3。
   * @static
   * @returns {Vector3}
   */
  static get One() {
    return new Vector3(1, 1, 1);
  }

  /**
   * 返回 x 单位 Vector3 (1, 0, 0)。
   * @static
   * @returns {Vector3}
   */
  static get UnitX() {
    return new Vector3(1, 0, 0);
  }

  /**
   * 返回 y 单位 Vector3 (0, 1, 0)。
   * @static
   * @returns {Vector3}
   */
  static get UnitY() {
    return new Vector3(0, 1, 0);
  }

  /**
   * 返回 z 单位 Vector3 (0, 0, 1)。
   * @static
   * @returns {Vector3}
   */
  static get UnitZ() {
    return new Vector3(0, 0, 1);
  }

  /**
   * 返回所有组件均设置为零的 Vector3。
   * @static
   * @returns {Vector3}
   */
  static get Zero() {
    return new Vector3(0, 0, 0);
  }

  /**
   * 返回一个指定向上方向 (0, 1, 0) 的单位矢量。
   * @static
   * @returns {Vector3}
   */
  static get Up() {
    return new Vector3(0, 1, 0);
  }

  /**
   * 返回指向右侧 (1, 0, 0) 的单位 Vector3。
   * @static
   * @returns {Vector3}
   */
  static get Right() {
    return new Vector3(1, 0, 0);
  }

  /**
   * 返回指定向左方向 (−1, 0, 0) 的单位 Vector3。
   * @static
   * @returns {Vector3}
   */
  static get Left() {
    return new Vector3(-1, 0, 0);
  }

  /**
   * 返回在右手坐标系 (0, 0,−1) 中指定向前方向的单位 Vector3。
   * @static
   * @returns {Vector3}
   */
  static get Forward() {
    return new Vector3(0, 0, -1);
  }

  /**
   * 返回指定向下方向 (0, −1, 0) 的单位 Vector3。
   * @static
   * @returns {Vector3}
   */
  static get Down() {
    return new Vector3(0, -1, 0);
  }

  /**
   * 返回在右手坐标系 (0, 0, 1) 中指定向后方向的单位 Vector3。
   * @static
   * @returns {Vector3}
   */
  static get Backward() {
    return new Vector3(0, 0, 1);
  }

  /**
   * 将两个矢量相加。
   * @static
   * @param {Vector3} value1 源矢量。
   * @param {Vector3} value2 源矢量。
   * @returns {Vector3}
   */
  static Add(value1: Vector3, value2: Vector3) {
    return new Vector3(
      value1.X + value2.X,
      value1.Y + value2.Y,
      value1.Z + value2.Z
    );
  }

  /**
   * 返回一个相对于 3D 三角形的质心坐标中某指定点的 3D Cartesian 坐标所在的 Vector3。
   * @static
   * @param {Vector3} value1 包含三角形顶点 1 的 3D Cartesian 坐标的 Vector3。
   * @param {Vector3} value2 包含三角形顶点 2 的 3D Cartesian 坐标的 Vector3。
   * @param {Vector3} value3 包含三角形顶点 3 的 3D Cartesian 坐标的 Vector3。
   * @param {Number} amount1 质心坐标 b2，用于表达趋向顶点 2 的权重因子（在 value2 中指定）。
   * @param {Number} amount2 质心坐标 b3，用于表达趋向顶点 3 的权重因子（在 value3 中指定）。
   * @returns {Vector3}
   */
  static Barycentric(
    value1: Vector3,
    value2: Vector3,
    value3: Vector3,
    amount1: number,
    amount2: number
  ) {
    return new Vector3(
      MathHelper.Barycentric(value1.X, value2.X, value3.X, amount1, amount2),
      MathHelper.Barycentric(value1.Y, value2.Y, value3.Y, amount1, amount2),
      MathHelper.Barycentric(value1.Z, value2.Z, value3.Z, amount1, amount2)
    );
  }

  /**
   * 用指定的位置执行 Catmull-Rom 插值。
   * @static
   * @param {Vector3} value1 插值中的第一个位置。
   * @param {Vector3} value2 插值中的第二个位置。
   * @param {Vector3} value3 插值中的第三个位置。
   * @param {Vector3} value4 插值中的第四个位置。
   * @param {Number} amount 权重因子。
   * @returns {Vector3}
   */
  static CatmullRom(
    value1: Vector3,
    value2: Vector3,
    value3: Vector3,
    value4: Vector3,
    amount: number
  ) {
    return new Vector3(
      MathHelper.CatmullRom(value1.X, value2.X, value3.X, value4.X, amount),
      MathHelper.CatmullRom(value1.Y, value2.Y, value3.Y, value4.Y, amount),
      MathHelper.CatmullRom(value1.Z, value2.Z, value3.Z, value4.Z, amount)
    );
  }

  /**
   * 将值限制在指定范围内。
   * @static
   * @param {Vector3} value1 要限制的值。
   * @param {Vector3} min 最小值。
   * @param {Vector3} max 最大值。
   * @returns {Vector3}
   */
  static Clamp(value1: Vector3, min: Vector3, max: Vector3) {
    return new Vector3(
      MathHelper.Clamp(value1.X, min.X, max.X),
      MathHelper.Clamp(value1.Y, min.Y, max.Y),
      MathHelper.Clamp(value1.Z, min.Z, max.Z)
    );
  }

  /**
   * 计算两个矢量的叉积。
   * @param {Vector3} vector1 源矢量。
   * @param {Vector3} vector2 源矢量。
   * @return {Vector3}
   */
  static Cross(vector1: Vector3, vector2: Vector3) {
    const x = vector1.Y * vector2.Z - vector2.Y * vector1.Z;
    const y = -(vector1.X * vector2.Z - vector2.X * vector1.Z);
    const z = vector1.X * vector2.Y - vector2.X * vector1.Y;
    return new Vector3(x, y, z);
  }

  /**
   * 计算两个矢量之间的距离。
   * @static
   * @param {Vector3} value1 源矢量。
   * @param {Vector3} value2 源矢量。
   * @returns {Number}
   */
  static Distance(value1: Vector3, value2: Vector3) {
    const result = Vector3.DistanceSquared(value1, value2);
    return Math.sqrt(result);
  }

  /**
   * 计算两个平方矢量之间的距离。
   * @static
   * @param {Vector3} value1 源矢量。
   * @param {Vector3} value2 源矢量。
   * @returns {Number}
   */
  static DistanceSquared(value1: Vector3, value2: Vector3) {
    const v1 = value1.X - value2.X;
    const v2 = value1.Y - value2.Y;
    const v3 = value1.Z - value2.Z;
    return v1 * v1 + v2 * v2 + v3 * v3;
  }

  /**
   * 用一个矢量除以一个标量值。
   * @static
   * @param {Vector3} value1 源矢量。
   * @param {Number} divider 除数。
   * @returns {Vector3}
   */
  static Divide(value1: Vector3, divider: number) {
    const factor = 1 / divider;
    return new Vector3(value1.X * factor, value1.Y * factor, value1.Z * factor);
  }

  /**
   * 计算两个矢量的点积。如果两个矢量均为单位矢量，则点积返回 -1 到 1 之间的浮点值，该值可以用来确定两个矢量之间的角度的一些性质。例如，它可以显示这些矢量是正交、平行，还是互为锐角或钝角。
   * @static
   * @param {Vector3} value1 源矢量。
   * @param {Vector3} value2 源矢量。
   * @returns {Number}
   */
  static Dot(vector1: Vector3, vector2: Vector3) {
    return (
      vector1.X * vector2.X + vector1.Y * vector2.Y + vector1.Z * vector2.Z
    );
  }

  /**
   * 确定指定的 Object 是否等于 Vector3。
   * @param {Vector3} other 用于与当前 Vector3 比较的 Vector3。
   * @returns {Boolean}
   */
  Equals(other: Vector3) {
    return (
      Math.abs(this.X - other.X) < 1e-6 &&
      Math.abs(this.Y - other.Y) < 1e-6 &&
      Math.abs(this.Z - other.Z) < 1e-6
    );
  }

  GetHashCode() {
    let hashCode = this.X;
    hashCode = (hashCode * 397) ^ this.Y;
    hashCode = (hashCode * 397) ^ this.Z;
    return hashCode | 0;
  }

  /**
   * 执行 Hermite 样条插值。
   * @static
   * @param {Vector3} value1 源位置矢量。
   * @param {Vector3} tangent1 源切线矢量。
   * @param {Vector3} value2 源位置矢量。
   * @param {Vector3} tangent2 源切线矢量。
   * @param {Number} amount 权重因子。
   * @returns {Vector3}
   */
  static Hermite(
    value1: Vector3,
    tangent1: Vector3,
    value2: Vector3,
    tangent2: Vector3,
    amount: number
  ) {
    return new Vector3(
      MathHelper.Hermite(value1.X, tangent1.X, value2.X, tangent2.X, amount),
      MathHelper.Hermite(value1.Y, tangent1.Y, value2.Y, tangent2.Y, amount),
      MathHelper.Hermite(value1.Z, tangent1.Z, value2.Z, tangent2.Z, amount)
    );
  }

  /**
   * 计算矢量的长度。
   * @returns {Number}
   */
  Length() {
    const result = Vector3.DistanceSquared(this, Vector3.Zero);
    return Math.sqrt(result);
  }

  /**
   * 计算平方矢量的长度。
   * @returns {Number}
   */
  LengthSquared() {
    return Vector3.DistanceSquared(this, Vector3.Zero);
  }

  /**
   * 在两个矢量之间执行线性插值。
   * @static
   * @param {Vector3} value1 源矢量。
   * @param {Vector3} value2 源矢量。
   * @param {Number} amount 指示 value2 权重的 0 到 1 之间的值。
   * @returns {Vector3}
   */
  static Lerp(value1: Vector3, value2: Vector3, amount: number) {
    return new Vector3(
      MathHelper.Lerp(value1.X, value2.X, amount),
      MathHelper.Lerp(value1.Y, value2.Y, amount),
      MathHelper.Lerp(value1.Z, value2.Z, amount)
    );
  }

  /**
   * 从每个匹配的组件对中返回包含最大值的矢量。
   * @static
   * @param {Vector3} value1 源矢量。
   * @param {Vector3} value2 源矢量。
   * @returns {Vector3}
   */
  static Max(value1: Vector3, value2: Vector3) {
    return new Vector3(
      value1.X > value2.X ? value1.X : value2.X,
      value1.Y > value2.Y ? value1.Y : value2.Y,
      value1.Z > value2.Z ? value1.Z : value2.Z
    );
  }

  /**
   * 从每个匹配的组件对中返回包含最小值的矢量。
   * @static
   * @param {Vector3} value1 源矢量。
   * @param {Vector3} value2 源矢量。
   * @returns {Vector3}
   */
  static Min(value1: Vector3, value2: Vector3) {
    return new Vector3(
      value1.X < value2.X ? value1.X : value2.X,
      value1.Y < value2.Y ? value1.Y : value2.Y,
      value1.Z < value2.Z ? value1.Z : value2.Z
    );
  }

  /**
   * 将一个矢量乘以一个标量值。
   * @static
   * @param {Vector3} value1 源矢量。
   * @param {Number} scaleFactor 标量值。
   * @returns {Vector3}
   */
  static Multiply(value1: Vector3, scaleFactor: number) {
    return new Vector3(
      value1.X * scaleFactor,
      value1.Y * scaleFactor,
      value1.Z * scaleFactor
    );
  }

  /**
   * 返回指向反方向的矢量。
   * @static
   * @param {Vector3} value 源矢量。
   * @returns {Vector3}
   */
  static Negate(value: Vector3) {
    return new Vector3(-value.X, -value.Y, -value.Z);
  }

  /**
   * 根据指定的矢量创建单位矢量。结果是与原始矢量相同方向的长度矢量单位。
   * @static
   * @param {Vector3} value 源 Vector3。
   * @return {Vector3}
   */
  static Normalize(value: Vector3) {
    let factor = Vector3.Distance(value, Vector3.Zero);
    factor = 1 / factor;
    return new Vector3(value.X * factor, value.Y * factor, value.Z * factor);
  }

  /**
   * 将当前矢量转为单位矢量。结果是与原始矢量相同方向的长度矢量单位。
   */
  Normalize() {
    let factor = Vector3.Distance(this, Vector3.Zero);
    factor = 1 / factor;
    this.X *= factor;
    this.Y *= factor;
    this.Z *= factor;
  }

  /**
   * 返回具有指定法线的表面的矢量反射。
   * @static
   * @param {Vector3} vector 源矢量。
   * @param {Vector3} normal 表面的法线。
   * @returns {Vector3}
   */
  static Reflect(vector: Vector3, normal: Vector3) {
    const dotProduct =
      vector.X * normal.X + vector.Y * normal.Y + vector.Z * normal.Z;
    return new Vector3(
      vector.X - 2.0 * normal.X * dotProduct,
      vector.Y - 2.0 * normal.Y * dotProduct,
      vector.Z - 2.0 * normal.Z * dotProduct
    );
  }

  /**
   * 使用三次方程计算两个值之间的插值。
   * @static
   * @param {Vector3} value1 源值。
   * @param {Vector3} value2 源值。
   * @param {Number} amount 权重值。
   * @returns {Vector3}
   */
  static SmoothStep(value1: Vector3, value2: Vector3, amount: number) {
    return new Vector3(
      MathHelper.SmoothStep(value1.X, value2.X, amount),
      MathHelper.SmoothStep(value1.Y, value2.Y, amount),
      MathHelper.SmoothStep(value1.Z, value2.Z, amount)
    );
  }

  /**
   * 将一个矢量减去一个矢量。
   * @static
   * @param {Vector3} value1 源矢量。
   * @param {Vector3} value2 源矢量。
   * @returns {Vector3}
   */
  static Subtract(value1: Vector3, value2: Vector3) {
    return new Vector3(
      value1.X - value2.X,
      value1.Y - value2.Y,
      value1.Z - value2.Z
    );
  }

  ToString() {
    return `{X:${this.X} Y:${this.Y} Z:${this.Z}}`;
  }

  /**
   * 通过给定矩阵变换 3D 矢量。
   * @static
   * @param {Vector3} position 源矢量。
   * @param {Matrix} matrix 变换矩阵。
   * @returns {Vector3}
   */
  static Transform(position: Vector3, matrix: Matrix) {
    const x =
      position.X * matrix.M11 +
      position.Y * matrix.M21 +
      position.Z * matrix.M31 +
      matrix.M41;
    const y =
      position.X * matrix.M12 +
      position.Y * matrix.M22 +
      position.Z * matrix.M32 +
      matrix.M42;
    const z =
      position.X * matrix.M13 +
      position.Y * matrix.M23 +
      position.Z * matrix.M33 +
      matrix.M43;
    return new Vector3(x, y, z);
  }

  /**
   * 通过矩阵变换 3D 矢量法线。
   * @static
   * @param {Vector3} normal 源矢量。
   * @param {Matrix} matrix 变换矩阵。
   * @returns {Vector3}
   */
  static TransformNormal(normal: Vector3, matrix: Matrix) {
    const x =
      normal.X * matrix.M11 + normal.Y * matrix.M21 + normal.Z * matrix.M31;
    const y =
      normal.X * matrix.M12 + normal.Y * matrix.M22 + normal.Z * matrix.M32;
    const z =
      normal.X * matrix.M13 + normal.Y * matrix.M23 + normal.Z * matrix.M33;
    return new Vector3(x, y, z);
  }
}
