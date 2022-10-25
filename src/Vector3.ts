import { MathHelper } from './MathHelper';
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
  constructor(public x = 0, public y = 0, public z = 0) {}

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
   * Returns a new Vector3 set to (0.0, 0.0, 0.0)
   * @returns a new empty Vector3
   */
  public static get Zero(): Vector3 {
    return new Vector3(0.0, 0.0, 0.0);
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
   * Creates a new Vector3 copied from the current Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#11
   * @returns the new Vector3
   */
  public clone() {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Copies the given vector coordinates to the current Vector3 ones
   * Example Playground https://playground.babylonjs.com/#R1F8YU#12
   * @param source defines the source Vector3
   * @returns the current updated Vector3
   */
  public copyFrom(source: Vector3): this {
    return this.copyFromFloats(source.x, source.y, source.z);
  }

  /**
   * Copies the given floats to the current Vector3 coordinates
   * Example Playground https://playground.babylonjs.com/#R1F8YU#13
   * @param x defines the x coordinate of the operand
   * @param y defines the y coordinate of the operand
   * @param z defines the z coordinate of the operand
   * @returns the current updated Vector3
   */
  public copyFromFloats(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
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
      value1.x + value2.x,
      value1.y + value2.y,
      value1.z + value2.z
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
      MathHelper.Barycentric(value1.x, value2.x, value3.x, amount1, amount2),
      MathHelper.Barycentric(value1.y, value2.y, value3.y, amount1, amount2),
      MathHelper.Barycentric(value1.z, value2.z, value3.z, amount1, amount2)
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
      MathHelper.CatmullRom(value1.x, value2.x, value3.x, value4.x, amount),
      MathHelper.CatmullRom(value1.y, value2.y, value3.y, value4.y, amount),
      MathHelper.CatmullRom(value1.z, value2.z, value3.z, value4.z, amount)
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
      MathHelper.Clamp(value1.x, min.x, max.x),
      MathHelper.Clamp(value1.y, min.y, max.y),
      MathHelper.Clamp(value1.z, min.z, max.z)
    );
  }

  // /**
  //  * 计算两个矢量的叉积。
  //  * @param {Vector3} vector1 源矢量。
  //  * @param {Vector3} vector2 源矢量。
  //  * @return {Vector3}
  //  */
  // static Cross(vector1: Vector3, vector2: Vector3) {
  //   const x = vector1.y * vector2.z - vector2.y * vector1.z;
  //   const y = -(vector1.x * vector2.z - vector2.x * vector1.z);
  //   const z = vector1.x * vector2.y - vector2.x * vector1.y;
  //   return new Vector3(x, y, z);
  // }

  /**
   * Returns a new Vector3 as the cross product of the vectors "left" and "right"
   * The cross product is then orthogonal to both "left" and "right"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#15
   * @param left defines the left operand
   * @param right defines the right operand
   * @returns the cross product
   */
  public static Cross(left: Vector3, right: Vector3) {
    const result = new Vector3();
    Vector3.CrossToRef(left, right, result);
    return result;
  }

  /**
   * Sets the given vector "result" with the cross product of "left" and "right"
   * The cross product is then orthogonal to both "left" and "right"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#78
   * @param left defines the left operand
   * @param right defines the right operand
   * @param result defines the Vector3 where to store the result
   * @returns result input
   */
  public static CrossToRef(left: Vector3, right: Vector3, result: Vector3) {
    const x = left.y * right.z - left.z * right.y;
    const y = left.z * right.x - left.x * right.z;
    const z = left.x * right.y - left.y * right.x;
    result.copyFromFloats(x, y, z);
    return result;
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
    const v1 = value1.x - value2.x;
    const v2 = value1.y - value2.y;
    const v3 = value1.z - value2.z;
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
    return new Vector3(value1.x * factor, value1.y * factor, value1.z * factor);
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
      vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z
    );
  }

  /**
   * 确定指定的 Object 是否等于 Vector3。
   * @param {Vector3} other 用于与当前 Vector3 比较的 Vector3。
   * @returns {Boolean}
   */
  Equals(other: Vector3) {
    return (
      Math.abs(this.x - other.x) < 1e-6 &&
      Math.abs(this.y - other.y) < 1e-6 &&
      Math.abs(this.z - other.z) < 1e-6
    );
  }

  GetHashCode() {
    let hashCode = this.x;
    hashCode = (hashCode * 397) ^ this.y;
    hashCode = (hashCode * 397) ^ this.z;
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
      MathHelper.Hermite(value1.x, tangent1.x, value2.x, tangent2.x, amount),
      MathHelper.Hermite(value1.y, tangent1.y, value2.y, tangent2.y, amount),
      MathHelper.Hermite(value1.z, tangent1.z, value2.z, tangent2.z, amount)
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
      MathHelper.Lerp(value1.x, value2.x, amount),
      MathHelper.Lerp(value1.y, value2.y, amount),
      MathHelper.Lerp(value1.z, value2.z, amount)
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
      value1.x > value2.x ? value1.x : value2.x,
      value1.y > value2.y ? value1.y : value2.y,
      value1.z > value2.z ? value1.z : value2.z
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
      value1.x < value2.x ? value1.x : value2.x,
      value1.y < value2.y ? value1.y : value2.y,
      value1.z < value2.z ? value1.z : value2.z
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
      value1.x * scaleFactor,
      value1.y * scaleFactor,
      value1.z * scaleFactor
    );
  }

  /**
   * Multiplies the Vector3 coordinates by the float "scale"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#56
   * @param scale defines the multiplier factor
   * @returns the current updated Vector3
   */
  public scaleInPlace(scale: number): this {
    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
    return this;
  }

  /**
   * 返回指向反方向的矢量。
   * @static
   * @param {Vector3} value 源矢量。
   * @returns {Vector3}
   */
  static Negate(value: Vector3) {
    return new Vector3(-value.x, -value.y, -value.z);
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
    return new Vector3(value.x * factor, value.y * factor, value.z * factor);
  }

  /**
   * 将当前矢量转为单位矢量。结果是与原始矢量相同方向的长度矢量单位。
   */
  Normalize() {
    let factor = Vector3.Distance(this, Vector3.Zero);
    factor = 1 / factor;
    this.x *= factor;
    this.y *= factor;
    this.z *= factor;
  }

  // Properties
  /**
   * Gets the length of the Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#25
   * @returns the length of the Vector3
   */
  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * Gets the squared length of the Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#26
   * @returns squared length of the Vector3
   */
  public lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /**
   * Normalize the current Vector3 with the given input length.
   * Please note that this is an in place operation.
   * Example Playground https://playground.babylonjs.com/#R1F8YU#123
   * @param len the length of the vector
   * @returns the current updated Vector3
   */
  public normalizeFromLength(len: number): this {
    if (len === 0 || len === 1.0) {
      return this;
    }

    return this.scaleInPlace(1.0 / len);
  }

  /**
   * Normalize the current Vector3.
   * Please note that this is an in place operation.
   * Example Playground https://playground.babylonjs.com/#R1F8YU#122
   * @returns the current updated Vector3
   */
  public normalize(): this {
    return this.normalizeFromLength(this.length());
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
      vector.x * normal.x + vector.y * normal.y + vector.z * normal.z;
    return new Vector3(
      vector.x - 2.0 * normal.x * dotProduct,
      vector.y - 2.0 * normal.y * dotProduct,
      vector.z - 2.0 * normal.z * dotProduct
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
      MathHelper.SmoothStep(value1.x, value2.x, amount),
      MathHelper.SmoothStep(value1.y, value2.y, amount),
      MathHelper.SmoothStep(value1.z, value2.z, amount)
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
      value1.x - value2.x,
      value1.y - value2.y,
      value1.z - value2.z
    );
  }

  /**
   * Returns a new Vector3, result of the subtraction of the given vector from the current Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#60
   * @param otherVector defines the second operand
   * @returns the resulting Vector3
   */
  public subtract(otherVector: Vector3) {
    return new Vector3(
      this.x - otherVector.x,
      this.y - otherVector.y,
      this.z - otherVector.z
    );
  }

  /**
   * Subtracts the given vector from the current Vector3 and stores the result in the vector "result".
   * Example Playground https://playground.babylonjs.com/#R1F8YU#63
   * @param otherVector defines the second operand
   * @param result defines the Vector3 object where to store the result
   * @returns the result
   */
  public subtractToRef(otherVector: Vector3, result: Vector3) {
    return this.subtractFromFloatsToRef(
      otherVector.x,
      otherVector.y,
      otherVector.z,
      result
    );
  }

  /**
   * Returns a new Vector3 set with the subtraction of the given floats from the current Vector3 coordinates
   * Example Playground https://playground.babylonjs.com/#R1F8YU#62
   * @param x defines the x coordinate of the operand
   * @param y defines the y coordinate of the operand
   * @param z defines the z coordinate of the operand
   * @returns the resulting Vector3
   */
  public subtractFromFloats(x: number, y: number, z: number) {
    return new Vector3(this.x - x, this.y - y, this.z - z);
  }

  /**
   * Subtracts the given floats from the current Vector3 coordinates and set the given vector "result" with this result
   * Example Playground https://playground.babylonjs.com/#R1F8YU#64
   * @param x defines the x coordinate of the operand
   * @param y defines the y coordinate of the operand
   * @param z defines the z coordinate of the operand
   * @param result defines the Vector3 object where to store the result
   * @returns the result
   */
  public subtractFromFloatsToRef<T extends Vector3>(
    x: number,
    y: number,
    z: number,
    result: T
  ): T {
    return result.copyFromFloats(this.x - x, this.y - y, this.z - z);
  }

  ToString() {
    return `{X:${this.x} Y:${this.y} Z:${this.z}}`;
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
      position.x * matrix.m11 +
      position.y * matrix.m21 +
      position.z * matrix.m31 +
      matrix.m41;
    const y =
      position.x * matrix.m12 +
      position.y * matrix.m22 +
      position.z * matrix.m32 +
      matrix.m42;
    const z =
      position.x * matrix.m13 +
      position.y * matrix.m23 +
      position.z * matrix.m33 +
      matrix.m43;
    return new Vector3(x, y, z);
  }

  /**
   * Returns a new Vector3 set with the result of the transformation by the given matrix of the given vector.
   * This method computes transformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
   * Example Playground https://playground.babylonjs.com/#R1F8YU#111
   * @param vector defines the Vector3 to transform
   * @param transformation defines the transformation matrix
   * @returns the transformed Vector3
   */
  public static TransformCoordinates(
    vector: Vector3,
    transformation: Matrix
  ): Vector3 {
    const result = Vector3.Zero;
    Vector3.TransformCoordinatesToRef(vector, transformation, result);
    return result;
  }

  /**
   * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given vector
   * This method computes transformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
   * Example Playground https://playground.babylonjs.com/#R1F8YU#113
   * @param vector defines the Vector3 to transform
   * @param transformation defines the transformation matrix
   * @param result defines the Vector3 where to store the result
   * @returns result input
   */
  public static TransformCoordinatesToRef(
    vector: Vector3,
    transformation: Matrix,
    result: Vector3
  ) {
    Vector3.TransformCoordinatesFromFloatsToRef(
      vector.x,
      vector.y,
      vector.z,
      transformation,
      result
    );
    return result;
  }

  /**
   * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given floats (x, y, z)
   * This method computes transformed coordinates only, not transformed direction vectors
   * Example Playground https://playground.babylonjs.com/#R1F8YU#115
   * @param x define the x coordinate of the source vector
   * @param y define the y coordinate of the source vector
   * @param z define the z coordinate of the source vector
   * @param transformation defines the transformation matrix
   * @param result defines the Vector3 where to store the result
   * @returns result input
   */
  public static TransformCoordinatesFromFloatsToRef(
    x: number,
    y: number,
    z: number,
    transformation: Matrix,
    result: Vector3
  ) {
    const {
      m11: M11,
      m12: M12,
      m13: M13,
      m14: M14,
      m21: M21,
      m22: M22,
      m23: M23,
      m24: M24,
      m31: M31,
      m32: M32,
      m33: M33,
      m34: M34,
      m41: M41,
      m42: M42,
      m43: M43,
      m44: M44,
    } = transformation;
    const rx = x * M11 + y * M21 + z * M31 + M41;
    const ry = x * M12 + y * M22 + z * M32 + M42;
    const rz = x * M13 + y * M23 + z * M33 + M43;
    const rw = 1 / (x * M14 + y * M24 + z * M34 + M44);

    result.x = rx * rw;
    result.y = ry * rw;
    result.z = rz * rw;
    return result;
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
      normal.x * matrix.m11 + normal.y * matrix.m21 + normal.z * matrix.m31;
    const y =
      normal.x * matrix.m12 + normal.y * matrix.m22 + normal.z * matrix.m32;
    const z =
      normal.x * matrix.m13 + normal.y * matrix.m23 + normal.z * matrix.m33;
    return new Vector3(x, y, z);
  }
}
