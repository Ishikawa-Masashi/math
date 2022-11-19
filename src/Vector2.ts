import { Epsilon } from './constants';
import { ReadonlyVector2Like, Vector2Like } from './like';
import { MathHelper } from './MathHelper';
import { Matrix } from './Matrix';
import { Scalar } from './scalar';

export class Vector2 {
  /**
   * Creates a new Vector2 from the given x and y coordinates
   * @param x defines the first coordinate
   * @param y defines the second coordinate
   */
  constructor(
    /** defines the first coordinate */
    public x: number = 0,
    /** defines the second coordinate */
    public y: number = 0
  ) {}

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
   * Sets the Vector2 coordinates in the given array or Float32Array from the given index.
   * Example Playground https://playground.babylonjs.com/#QYBWV4#15
   * @param array defines the source array
   * @param index defines the offset in source array
   * @returns the current Vector2
   */
  public toArray(array: number[], index = 0): this {
    array[index] = this.x;
    array[index + 1] = this.y;
    return this;
  }

  /**
   * Update the current vector from an array
   * Example Playground https://playground.babylonjs.com/#QYBWV4#39
   * @param array defines the destination array
   * @param index defines the offset in the destination array
   * @returns the current Vector2
   */
  public fromArray(array: number[], index = 0): this {
    Vector2.FromArrayToRef(array, index, this);
    return this;
  }

  /**
   * Copy the current vector to an array
   * Example Playground https://playground.babylonjs.com/#QYBWV4#40
   * @returns a new array with 2 elements: the Vector2 coordinates.
   */
  public asArray(): number[] {
    const result = new Array<number>();
    this.toArray(result, 0);
    return result;
  }

  /**
   * Sets the Vector2 coordinates with the given Vector2 coordinates
   * Example Playground https://playground.babylonjs.com/#QYBWV4#24
   * @param source defines the source Vector2
   * @returns the current updated Vector2
   */
  public copyFrom(source: ReadonlyVector2Like): this {
    this.x = source.x;
    this.y = source.y;
    return this;
  }

  /**
   * Sets the Vector2 coordinates with the given floats
   * Example Playground https://playground.babylonjs.com/#QYBWV4#25
   * @param x defines the first coordinate
   * @param y defines the second coordinate
   * @returns the current updated Vector2
   */
  public copyFromFloats(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Sets the Vector2 coordinates with the given floats
   * Example Playground https://playground.babylonjs.com/#QYBWV4#62
   * @param x defines the first coordinate
   * @param y defines the second coordinate
   * @returns the current updated Vector2
   */
  public set(x: number, y: number): this {
    return this.copyFromFloats(x, y);
  }

  /**
   * Add another vector with the current one
   * Example Playground https://playground.babylonjs.com/#QYBWV4#11
   * @param otherVector defines the other vector
   * @returns a new Vector2 set with the addition of the current Vector2 and the given one coordinates
   */
  public add(otherVector: ReadonlyVector2Like) {
    return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
  }

  /**
   * Sets the "result" coordinates with the addition of the current Vector2 and the given one coordinates
   * Example Playground https://playground.babylonjs.com/#QYBWV4#12
   * @param otherVector defines the other vector
   * @param result defines the target vector
   * @returns result input
   */
  public addToRef(otherVector: ReadonlyVector2Like, result: Vector2Like) {
    result.x = this.x + otherVector.x;
    result.y = this.y + otherVector.y;
    return result;
  }

  /**
   * Set the Vector2 coordinates by adding the given Vector2 coordinates
   * Example Playground https://playground.babylonjs.com/#QYBWV4#13
   * @param otherVector defines the other vector
   * @returns the current updated Vector2
   */
  public addInPlace(otherVector: ReadonlyVector2Like): this {
    this.x += otherVector.x;
    this.y += otherVector.y;
    return this;
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
   * Sets "result" from the given index element of the given array
   * Example Playground https://playground.babylonjs.com/#QYBWV4#80
   * @param array defines the data source
   * @param offset defines the offset in the data source
   * @param result defines the target vector
   * @returns result input
   */
  public static FromArrayToRef(
    array: ArrayLike<number>,
    offset: number,
    result: Vector2Like
  ) {
    result.x = array[offset];
    result.y = array[offset + 1];
    return result;
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
   * Gets the dot product of the vector "left" and the vector "right"
   * Example Playground https://playground.babylonjs.com/#QYBWV4#90
   * @param left defines first vector
   * @param right defines second vector
   * @returns the dot product (float)
   */
  public static Dot(
    left: ReadonlyVector2Like,
    right: ReadonlyVector2Like
  ): number {
    return left.x * right.x + left.y * right.y;
  }

  /**
   * Gets the dot product of the vector "left" and the vector "right"
   * Example Playground https://playground.babylonjs.com/#QYBWV4#90
   * @param otherVector defines second vector
   * @returns the dot product (float)
   */
  public dot(otherVector: ReadonlyVector2Like): number {
    return Vector2.Dot(this, otherVector);
    // return this.x * otherVector.x + this.y * otherVector.y;
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
  /**
   * Gets a boolean if two vectors are equals
   * Example Playground https://playground.babylonjs.com/#QYBWV4#31
   * @param otherVector defines the other vector
   * @returns true if the given vector coordinates strictly equal the current Vector2 ones
   */
  public equals(otherVector: ReadonlyVector2Like): boolean {
    return otherVector && this.x === otherVector.x && this.y === otherVector.y;
  }

  /**
   * Gets a boolean if two vectors are equals (using an epsilon value)
   * Example Playground https://playground.babylonjs.com/#QYBWV4#32
   * @param otherVector defines the other vector
   * @param epsilon defines the minimal distance to consider equality
   * @returns true if the given vector coordinates are close to the current ones by a distance of epsilon.
   */
  public equalsWithEpsilon(
    otherVector: ReadonlyVector2Like,
    epsilon = Epsilon
  ): boolean {
    return (
      otherVector &&
      Scalar.WithinEpsilon(this.x, otherVector.x, epsilon) &&
      Scalar.WithinEpsilon(this.y, otherVector.y, epsilon)
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
   * Multiplies in place the current Vector2 coordinates by the given ones
   * Example Playground https://playground.babylonjs.com/#QYBWV4#43
   * @param otherVector defines the other vector
   * @returns the current updated Vector2
   */
  public multiplyInPlace(otherVector: Vector2Like): this {
    this.x *= otherVector.x;
    this.y *= otherVector.y;
    return this;
  }

  /**
   * Returns a new Vector2 set with the multiplication of the current Vector2 and the given one coordinates
   * Example Playground https://playground.babylonjs.com/#QYBWV4#42
   * @param otherVector defines the other vector
   * @returns a new Vector2
   */
  public multiply(otherVector: Vector2Like) {
    return new Vector2(this.x * otherVector.x, this.y * otherVector.y);
  }

  /**
   * Sets "result" coordinates with the multiplication of the current Vector2 and the given one coordinates
   * Example Playground https://playground.babylonjs.com/#QYBWV4#44
   * @param otherVector defines the other vector
   * @param result defines the target vector
   * @returns result input
   */
  public multiplyToRef(otherVector: Vector2Like, result: Vector2Like) {
    result.x = this.x * otherVector.x;
    result.y = this.y * otherVector.y;
    return result;
  }

  /**
   * Multiply the Vector2 coordinates by
   * Example Playground https://playground.babylonjs.com/#QYBWV4#59
   * @param scale defines the scaling factor
   * @returns the current updated Vector2
   */
  public scaleInPlace(scale: number): this {
    this.x *= scale;
    this.y *= scale;
    return this;
  }

  /**
   * Returns a new Vector2 scaled by "scale" from the current Vector2
   * Example Playground https://playground.babylonjs.com/#QYBWV4#52
   * @param scale defines the scaling factor
   * @returns a new Vector2
   */
  public scale(scale: number) {
    const result = new Vector2(0, 0);
    this.scaleToRef(scale, result);
    return result;
  }

  /**
   * Scale the current Vector2 values by a factor to a given Vector2
   * Example Playground https://playground.babylonjs.com/#QYBWV4#57
   * @param scale defines the scale factor
   * @param result defines the Vector2 object where to store the result
   * @returns result input
   */
  public scaleToRef(scale: number, result: Vector2): Vector2 {
    result.x = this.x * scale;
    result.y = this.y * scale;
    return result;
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

  // /**
  //  * 根据指定的矢量创建单位矢量。结果是与原始矢量相同方向的长度矢量单位。
  //  * @static
  //  * @param {Vector2} value 源 Vector2。
  //  * @return {Vector2}
  //  */
  // static Normalize(value: Vector2) {
  //   const val = 1.0 / Math.sqrt(value.x * value.x + value.y * value.y);
  //   return new Vector2(value.x * val, value.y * val);
  // }

  // /**
  //  * 将当前矢量转为单位矢量。结果是与原始矢量相同方向的长度矢量单位。
  //  */
  // Normalize() {
  //   const val = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
  //   this.x *= val;
  //   this.y *= val;
  // }

  // Properties

  /**
   * Gets the length of the vector
   * @returns the vector length (float)
   */
  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Gets the vector squared length
   * @returns the vector squared length (float)
   */
  public lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  // Methods

  /**
   * Normalize the vector
   * Example Playground https://playground.babylonjs.com/#QYBWV4#48
   * @returns the current updated Vector2
   */
  public normalize(): this {
    Vector2.NormalizeToRef(this, this);
    return this;
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
    const x = position.x * matrix.m11 + position.y * matrix.m21 + matrix.m41;
    const y = position.x * matrix.m12 + position.y * matrix.m22 + matrix.m42;
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
      normal.x * matrix.m11 + normal.y * matrix.m21,
      normal.x * matrix.m12 + normal.y * matrix.m22
    );
  }

  /**
   * Returns a new Vector2 equal to the normalized given vector
   * Example Playground https://playground.babylonjs.com/#QYBWV4#46
   * @param vector defines the vector to normalize
   * @returns a new Vector2
   */
  public static Normalize(vector: Vector2) {
    const newVector = new Vector2();
    this.NormalizeToRef(vector, newVector);
    return newVector;
  }

  /**
   * Normalize a given vector into a second one
   * Example Playground https://playground.babylonjs.com/#QYBWV4#50
   * @param vector defines the vector to normalize
   * @param result defines the vector where to store the result
   * @returns result input
   */
  public static NormalizeToRef(vector: Vector2, result: Vector2Like) {
    const len = vector.length();

    if (len === 0) {
      return result;
    }

    result.x = vector.x / len;
    result.y = vector.y / len;
    return result;
  }
}
