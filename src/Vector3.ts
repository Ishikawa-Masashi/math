import { ReadonlyVector3Like, Vector3Like } from './like';
import { MathHelper } from './MathHelper';
import { Matrix } from './Matrix';

import { Epsilon } from './constants';
import { Scalar } from './scalar';
import { ArrayTools } from './arrayTools';

export class Vector3 {
  /**
   * Creates a new Vector3 object from the given x, y, z (floats) coordinates.
   * @param x defines the first coordinates (on X axis)
   * @param y defines the second coordinates (on Y axis)
   * @param z defines the third coordinates (on Z axis)
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

  private static _ZeroReadOnly: ReadonlyVector3Like = Vector3.Zero;
  private static _UnitX: ReadonlyVector3Like = Vector3.UnitX;
  private static _UnitY: ReadonlyVector3Like = Vector3.UnitY;
  private static _UnitZ: ReadonlyVector3Like = Vector3.UnitZ;

  /**
   * Gets a zero Vector3 that must not be updated
   */
  public static get ZeroReadOnly() {
    return Vector3._ZeroReadOnly;
  }

  /**
   * Gets an up Vector3 that must not be updated
   */
  public static get UnitXReadOnly() {
    return Vector3._UnitX;
  }

  /**
   * Gets a down Vector3 that must not be updated
   */
  public static get UnitYReadOnly() {
    return Vector3._UnitY;
  }

  /**
   * Gets a right Vector3 that must not be updated
   */
  public static get UnitZReadOnly() {
    return Vector3._UnitZ;
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
  public copyFrom(source: ReadonlyVector3Like): this {
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
   * Adds the given vector to the current Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#4
   * @param otherVector defines the second operand
   * @returns the current updated Vector3
   */
  public addInPlace(otherVector: ReadonlyVector3Like): this {
    return this.addInPlaceFromFloats(
      otherVector.x,
      otherVector.y,
      otherVector.z
    );
  }

  /**
   * Adds the given coordinates to the current Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#5
   * @param x defines the x coordinate of the operand
   * @param y defines the y coordinate of the operand
   * @param z defines the z coordinate of the operand
   * @returns the current updated Vector3
   */
  public addInPlaceFromFloats(x: number, y: number, z: number): this {
    this.x += x;
    this.y += y;
    this.z += z;
    return this;
  }

  /**
   * Gets a new Vector3, result of the addition the current Vector3 and the given vector
   * Example Playground https://playground.babylonjs.com/#R1F8YU#3
   * @param otherVector defines the second operand
   * @returns the resulting Vector3
   */
  public add(otherVector: Vector3) {
    return new Vector3(
      this.x + otherVector.x,
      this.y + otherVector.y,
      this.z + otherVector.z
    );
  }

  /**
   * Adds the current Vector3 to the given one and stores the result in the vector "result"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#6
   * @param otherVector defines the second operand
   * @param result defines the Vector3 object where to store the result
   * @returns the result
   */
  public addToRef(otherVector: Vector3, result: Vector3) {
    return result.copyFromFloats(
      this.x + otherVector.x,
      this.y + otherVector.y,
      this.z + otherVector.z
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
  public static Cross(left: ReadonlyVector3Like, right: ReadonlyVector3Like) {
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
  public static CrossToRef(
    left: ReadonlyVector3Like,
    right: ReadonlyVector3Like,
    result: Vector3
  ) {
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
   * Returns the dot product (float) between the vectors "left" and "right"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#82
   * @param left defines the left operand
   * @param right defines the right operand
   * @returns the dot product
   */
  public static Dot(
    left: ReadonlyVector3Like,
    right: ReadonlyVector3Like
  ): number {
    return left.x * right.x + left.y * right.y + left.z * right.z;
  }

  /**
   * Returns the dot product (float) between the vectors "left" and "right"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#82
   * @param otherVector defines the right operand
   * @returns the dot product
   */
  public dot(otherVector: ReadonlyVector3Like): number {
    return Vector3.Dot(this, otherVector);
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
  /**
   * Returns true if the current Vector3 and the given vector coordinates are strictly equal
   * Example Playground https://playground.babylonjs.com/#R1F8YU#19
   * @param otherVector defines the second operand
   * @returns true if both vectors are equals
   */
  public equals(otherVector: ReadonlyVector3Like): boolean {
    return (
      otherVector &&
      this.x === otherVector.x &&
      this.y === otherVector.y &&
      this.z === otherVector.z
    );
  }

  /**
   * Returns true if the current Vector3 and the given vector coordinates are distant less than epsilon
   * Example Playground https://playground.babylonjs.com/#R1F8YU#21
   * @param otherVector defines the second operand
   * @param epsilon defines the minimal distance to define values as equals
   * @returns true if both vectors are distant less than epsilon
   */
  public equalsWithEpsilon(
    otherVector: ReadonlyVector3Like,
    epsilon: number = Epsilon
  ): boolean {
    return (
      otherVector &&
      Scalar.WithinEpsilon(this.x, otherVector.x, epsilon) &&
      Scalar.WithinEpsilon(this.y, otherVector.y, epsilon) &&
      Scalar.WithinEpsilon(this.z, otherVector.z, epsilon)
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
   * Returns a new Vector3 set with the current Vector3 coordinates multiplied by the float "scale"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#53
   * @param scale defines the multiplier factor
   * @returns a new Vector3
   */
  public scale(scale: number) {
    return new Vector3(this.x * scale, this.y * scale, this.z * scale);
  }

  /**
   * Multiplies the current Vector3 coordinates by the float "scale" and stores the result in the given vector "result" coordinates
   * Example Playground https://playground.babylonjs.com/#R1F8YU#57
   * @param scale defines the multiplier factor
   * @param result defines the Vector3 object where to store the result
   * @returns the result
   */
  public scaleToRef(scale: number, result: Vector3) {
    return result.copyFromFloats(
      this.x * scale,
      this.y * scale,
      this.z * scale
    );
  }

  /**
   * Scale the current Vector3 values by a factor and add the result to a given Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#55
   * @param scale defines the scale factor
   * @param result defines the Vector3 object where to store the result
   * @returns result input
   */
  public scaleAndAddToRef(scale: number, result: Vector3) {
    return result.addInPlaceFromFloats(
      this.x * scale,
      this.y * scale,
      this.z * scale
    );
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
   * Gets a new Vector3 set with the current Vector3 negated coordinates
   * Example Playground https://playground.babylonjs.com/#R1F8YU#35
   * @returns a new Vector3
   */
  public negate() {
    return new Vector3(-this.x, -this.y, -this.z);
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
   * Normalize the current Vector3 to a new vector
   * Example Playground https://playground.babylonjs.com/#R1F8YU#124
   * @returns the new Vector3
   */
  public normalizeToNew() {
    const normalized = new Vector3(0, 0, 0);
    this.normalizeToRef(normalized);
    return normalized;
  }

  /**
   * Normalize the current Vector3 to the reference
   * Example Playground https://playground.babylonjs.com/#R1F8YU#125
   * @param reference define the Vector3 to update
   * @returns the updated Vector3
   */
  public normalizeToRef(reference: Vector3) {
    const len = this.length();
    if (len === 0 || len === 1.0) {
      return reference.copyFromFloats(this.x, this.y, this.z);
    }

    return this.scaleToRef(1.0 / len, reference);
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
   * Subtract the given vector from the current Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#61
   * @param otherVector defines the second operand
   * @returns the current updated Vector3
   */
  public subtractInPlace(otherVector: ReadonlyVector3Like): this {
    this.x -= otherVector.x;
    this.y -= otherVector.y;
    this.z -= otherVector.z;
    return this;
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
    vector: ReadonlyVector3Like,
    transformation: Matrix,
    result: Vector3Like
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
    result: Vector3Like
  ) {
    const {
      m11,
      m12,
      m13,
      m14,
      m21,
      m22,
      m23,
      m24,
      m31,
      m32,
      m33,
      m34,
      m41,
      m42,
      m43,
      m44,
    } = transformation;
    const rx = x * m11 + y * m21 + z * m31 + m41;
    const ry = x * m12 + y * m22 + z * m32 + m42;
    const rz = x * m13 + y * m23 + z * m33 + m43;
    const rw = 1 / (x * m14 + y * m24 + z * m34 + m44);

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
  // static TransformNormal(normal: Vector3, matrix: Matrix) {
  //   const x =
  //     normal.x * matrix.m11 + normal.y * matrix.m21 + normal.z * matrix.m31;
  //   const y =
  //     normal.x * matrix.m12 + normal.y * matrix.m22 + normal.z * matrix.m32;
  //   const z =
  //     normal.x * matrix.m13 + normal.y * matrix.m23 + normal.z * matrix.m33;
  //   return new Vector3(x, y, z);
  // }

  /**
   * Returns a new Vector3 set with the result of the normal transformation by the given matrix of the given vector
   * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
   * Example Playground https://playground.babylonjs.com/#R1F8YU#112
   * @param vector defines the Vector3 to transform
   * @param transformation defines the transformation matrix
   * @returns the new Vector3
   */
  public static TransformNormal(
    vector: ReadonlyVector3Like,
    transformation: Matrix
  ): Vector3 {
    const result = Vector3.Zero;
    Vector3.TransformNormalToRef(vector, transformation, result);
    return result;
  }

  /**
   * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given vector
   * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
   * Example Playground https://playground.babylonjs.com/#R1F8YU#114
   * @param vector defines the Vector3 to transform
   * @param transformation defines the transformation matrix
   * @param result defines the Vector3 where to store the result
   * @returns result input
   */
  public static TransformNormalToRef(
    vector: ReadonlyVector3Like,
    transformation: Matrix,
    result: Vector3
  ) {
    this.TransformNormalFromFloatsToRef(
      vector.x,
      vector.y,
      vector.z,
      transformation,
      result
    );
    return result;
  }

  /**
   * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given floats (x, y, z)
   * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
   * Example Playground https://playground.babylonjs.com/#R1F8YU#116
   * @param x define the x coordinate of the source vector
   * @param y define the y coordinate of the source vector
   * @param z define the z coordinate of the source vector
   * @param transformation defines the transformation matrix
   * @param result defines the Vector3 where to store the result
   * @returns result input
   */
  public static TransformNormalFromFloatsToRef(
    x: number,
    y: number,
    z: number,
    transformation: Matrix,
    result: Vector3
  ) {
    // const m = transformation.m;
    // result.x = x * m[0] + y * m[4] + z * m[8];
    // result.y = x * m[1] + y * m[5] + z * m[9];
    // result.z = x * m[2] + y * m[6] + z * m[10];

    result.x =
      x * transformation.m11 + y * transformation.m21 + z * transformation.m31;
    result.y =
      x * transformation.m12 + y * transformation.m22 + z * transformation.m32;
    result.z =
      x * transformation.m13 + y * transformation.m23 + z * transformation.m33;

    return result;
  }

  /**
   * Projects "vector" on the triangle determined by its extremities "p0", "p1" and "p2", stores the result in "ref"
   * and returns the distance to the projected point.
   * Example Playground https://playground.babylonjs.com/#R1F8YU#104
   * From http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.104.4264&rep=rep1&type=pdf
   *
   * @param vector the vector to get distance from
   * @param p0 extremity of the triangle
   * @param p1 extremity of the triangle
   * @param p2 extremity of the triangle
   * @param ref variable to store the result to
   * @returns The distance between "ref" and "vector"
   */
  public static ProjectOnTriangleToRef(
    vector: Vector3,
    p0: Vector3,
    p1: Vector3,
    p2: Vector3,
    ref: Vector3
  ): number {
    const p1p0 = MathTmp.Vector3[0];
    const p2p0 = MathTmp.Vector3[1];
    const p2p1 = MathTmp.Vector3[2];
    const normal = MathTmp.Vector3[3];
    const vectorp0 = MathTmp.Vector3[4];

    // Triangle vectors
    p1.subtractToRef(p0, p1p0);
    p2.subtractToRef(p0, p2p0);
    p2.subtractToRef(p1, p2p1);

    const p1p0L = p1p0.length();
    const p2p0L = p2p0.length();
    const p2p1L = p2p1.length();

    if (p1p0L < Epsilon || p2p0L < Epsilon || p2p1L < Epsilon) {
      // This is a degenerate triangle. As we assume this is part of a non-degenerate mesh,
      // we will find a better intersection later.
      // Let's just return one of the extremities
      ref.copyFrom(p0);
      return Vector3.Distance(vector, p0);
    }

    // Compute normal and vector to p0
    vector.subtractToRef(p0, vectorp0);
    Vector3.CrossToRef(p1p0, p2p0, normal);
    const nl = normal.length();
    if (nl < Epsilon) {
      // Extremities are aligned, we are back on the case of a degenerate triangle
      ref.copyFrom(p0);
      return Vector3.Distance(vector, p0);
    }
    normal.normalizeFromLength(nl);
    let l = vectorp0.length();
    if (l < Epsilon) {
      // Vector is p0
      ref.copyFrom(p0);
      return 0;
    }
    vectorp0.normalizeFromLength(l);

    // Project to "proj" that lies on the triangle plane
    const cosA = Vector3.Dot(normal, vectorp0);
    const projVector = MathTmp.Vector3[5];
    const proj = MathTmp.Vector3[6];
    projVector.copyFrom(normal).scaleInPlace(-l * cosA);
    proj.copyFrom(vector).addInPlace(projVector);

    // Compute barycentric coordinates (v0, v1 and v2 are axis from barycenter to extremities)
    const v0 = MathTmp.Vector3[4];
    const v1 = MathTmp.Vector3[5];
    const v2 = MathTmp.Vector3[7];
    const tmp = MathTmp.Vector3[8];

    v0.copyFrom(p1p0).scaleInPlace(1 / p1p0L);
    tmp.copyFrom(p2p0).scaleInPlace(1 / p2p0L);
    v0.addInPlace(tmp).scaleInPlace(-1);

    v1.copyFrom(p1p0).scaleInPlace(-1 / p1p0L);
    tmp.copyFrom(p2p1).scaleInPlace(1 / p2p1L);
    v1.addInPlace(tmp).scaleInPlace(-1);

    v2.copyFrom(p2p1).scaleInPlace(-1 / p2p1L);
    tmp.copyFrom(p2p0).scaleInPlace(-1 / p2p0L);
    v2.addInPlace(tmp).scaleInPlace(-1);

    // Determines which edge of the triangle is closest to "proj"
    const projP = MathTmp.Vector3[9];
    let dot;
    projP.copyFrom(proj).subtractInPlace(p0);
    Vector3.CrossToRef(v0, projP, tmp);
    dot = Vector3.Dot(tmp, normal);
    const s0 = dot;

    projP.copyFrom(proj).subtractInPlace(p1);
    Vector3.CrossToRef(v1, projP, tmp);
    dot = Vector3.Dot(tmp, normal);
    const s1 = dot;

    projP.copyFrom(proj).subtractInPlace(p2);
    Vector3.CrossToRef(v2, projP, tmp);
    dot = Vector3.Dot(tmp, normal);
    const s2 = dot;

    const edge = MathTmp.Vector3[10];
    let e0, e1;
    if (s0 > 0 && s1 < 0) {
      edge.copyFrom(p1p0);
      e0 = p0;
      e1 = p1;
    } else if (s1 > 0 && s2 < 0) {
      edge.copyFrom(p2p1);
      e0 = p1;
      e1 = p2;
    } else {
      edge.copyFrom(p2p0).scaleInPlace(-1);
      e0 = p2;
      e1 = p0;
    }

    // Determines if "proj" lies inside the triangle
    const tmp2 = MathTmp.Vector3[9];
    const tmp3 = MathTmp.Vector3[4];
    e0.subtractToRef(proj, tmp);
    e1.subtractToRef(proj, tmp2);
    Vector3.CrossToRef(tmp, tmp2, tmp3);
    const isOutside = Vector3.Dot(tmp3, normal) < 0;

    // If inside, we already found the projected point, "proj"
    if (!isOutside) {
      ref.copyFrom(proj);
      return Math.abs(l * cosA);
    }

    // If outside, we find "triProj", the closest point from "proj" on the closest edge
    const r = MathTmp.Vector3[5];
    Vector3.CrossToRef(edge, tmp3, r);
    r.normalize();
    const e0proj = MathTmp.Vector3[9];
    e0proj.copyFrom(e0).subtractInPlace(proj);
    const e0projL = e0proj.length();
    if (e0projL < Epsilon) {
      // Proj is e0
      ref.copyFrom(e0);
      return Vector3.Distance(vector, e0);
    }
    e0proj.normalizeFromLength(e0projL);
    const cosG = Vector3.Dot(r, e0proj);
    const triProj = MathTmp.Vector3[7];
    triProj.copyFrom(proj).addInPlace(r.scaleInPlace(e0projL * cosG));

    // Now we clamp "triProj" so it lies between e0 and e1
    tmp.copyFrom(triProj).subtractInPlace(e0);
    l = edge.length();
    edge.normalizeFromLength(l);
    let t = Vector3.Dot(tmp, edge) / Math.max(l, Epsilon);
    t = Scalar.Clamp(t, 0, 1);
    triProj.copyFrom(e0).addInPlace(edge.scaleInPlace(t * l));
    ref.copyFrom(triProj);

    return Vector3.Distance(vector, triProj);
  }
}

/**
 * @internal
 * Same as Tmp but not exported to keep it only for math functions to avoid conflicts
 */
class MathTmp {
  public static Vector3 = ArrayTools.BuildTuple(11, () => Vector3.Zero);
  //   public static Matrix = ArrayTools.BuildTuple(2, () => Matrix.Identity);
  //   public static Quaternion = ArrayTools.BuildTuple(3, () => Quaternion.Zero);
}
