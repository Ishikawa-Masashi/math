export class MathHelper {
  /**
   * 呈现数学常量 e。
   * @static
   * @returns {Number}
   */
  static get E() {
    return 2.718281828459045;
    // return 2.71828175;
  }

  /**
   * 呈现以 10 为底 e 的对数。
   * @static
   * @returns {Number}
   */
  static get Log10E() {
    return 0.4342945;
  }

  /**
   * 呈现以 2 为底 e 的对数。
   * @static
   * @returns {Number}
   */
  static get Log2E() {
    return 1.442695;
  }

  /**
   * 呈现 pi 的值。
   * @static
   * @returns {Number}
   */
  static get Pi() {
    return 3.141592653589793;
    // return 3.14159274;
  }

  static get PiOver2() {
    return 1.57079637;
  }

  static get PiOver4() {
    return 0.7853982;
  }

  static get TwoPi() {
    return 6.28318548;
  }

  /**
   * 返回给定三角形定义的某个点在一个轴上的 Cartesian 坐标，以及两个法线化质心（重心）坐标。
   * @static
   * @param {Number} value1 定义三角形的顶点 1 在一个轴上的坐标。
   * @param {Number} value2 定义三角形的顶点 2 在同一轴上的坐标。
   * @param {Number} value3 定义三角形的顶点 3 在同一轴上的坐标。
   * @param {Number} amount1 法线化质心（重心）坐标 b2，等于顶点 2 的权重因子，该顶点的坐标已在 value2 中指定。
   * @param {Number} amount2 法线化质心（重心）坐标 b3，等于顶点 3 的权重因子，该顶点的坐标已在 value3 中指定。
   * @returns {Number}
   */
  static Barycentric(
    value1: number,
    value2: number,
    value3: number,
    amount1: number,
    amount2: number
  ) {
    return value1 + (value2 - value1) * amount1 + (value3 - value1) * amount2;
  }

  /**
   * 用指定的位置执行 Catmull-Rom 插值。
   * @static
   * @param {Number} value1 插值中的第一个位置。
   * @param {Number} value2 插值中的第二个位置。
   * @param {Number} value3 插值中的第三个位置。
   * @param {Number} value4 插值中的第四个位置。
   * @param {Number} amount 权重因子。
   * @returns {Number}
   */
  static CatmullRom(
    value1: number,
    value2: number,
    value3: number,
    value4: number,
    amount: number
  ) {
    const amountSquared = amount * amount;
    const amountCubed = amountSquared * amount;
    return (
      0.5 *
      (2 * value2 +
        (value3 - value1) * amount +
        (2 * value1 - 5 * value2 + 4 * value3 - value4) * amountSquared +
        (3 * value2 - value1 - 3 * value3 + value4) * amountCubed)
    );
  }

  /**
   * 将值限制在指定范围内。
   * @static
   * @param {Number} value 要限制的值。
   * @param {Number} min 最小值。如果 value 小于 min，将返回 min。
   * @param {Number} max 最大值。如果 value 大于 max，将返回 max。
   * @returns {Number}
   */
  static Clamp(value: number, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
    // return Math.max(min, Math.min(max, value));
  }

  /**
   * 计算两个值之差的绝对值。
   * @static
   * @param {Number} value1 源值。
   * @param {Number} value2 源值。
   * @returns {Number}
   */
  static Distance(value1: number, value2: number) {
    return Math.abs(value1 - value2);
  }

  /**
   * 执行 Hermite 样条插值。
   * @static
   * @param {Number} value1 源位置。
   * @param {Number} tangent1 源切线。
   * @param {Number} value2 源位置。
   * @param {Number} tangent2 源切线。
   * @param {Number} amount 权重因子。
   * @returns {Number}
   */
  static Hermite(
    value1: number,
    tangent1: number,
    value2: number,
    tangent2: number,
    amount: number
  ) {
    const v1 = value1;
    const v2 = value2;
    const t1 = tangent1;
    const t2 = tangent2;
    const s = amount;
    let result;
    const sCubed = s * s * s;
    const sSquared = s * s;

    switch (amount) {
      case 0:
        result = value1;
        break;
      case 1:
        result = value2;
        break;
      default:
        result =
          (2 * v1 - 2 * v2 + t2 + t1) * sCubed +
          (3 * v2 - 3 * v1 - 2 * t1 - t2) * sSquared +
          t1 * s +
          v1;
        break;
    }

    return result;
  }

  /**
   * 在两个值之间执行线性插值。
   * @static
   * @param {Number} value1 源值。
   * @param {Number} value2 源值。
   * @param {Number} amount 指示 value2 权重的 0 到 1 之间的值。
   * @returns {Number}
   */
  static Lerp(value1: number, value2: number, amount: number) {
    return value1 + (value2 - value1) * amount;
  }

  /**
   * 返回两个值中的较大值。
   * @static
   * @param {Number} value1 源值。
   * @param {Number} value2 源值。
   * @returns {Number}
   */
  static Max(value1: number, value2: number) {
    return Math.max(value1, value2);
  }

  /**
   * 返回两个值中较小值。
   * @static
   * @param {number} value1 源值。
   * @param {number} value2 源值。
   * @returns {number}
   */
  static Min(value1: number, value2: number) {
    return Math.min(value1, value2);
  }

  /**
   * 使用三次方程计算两个值之间的插值。
   * @static
   * @param {Number} value1 源值。
   * @param {Number} value2 源值。
   * @param {Number} amount 权重值。
   * @returns {Number}
   */
  static SmoothStep(value1: number, value2: number, amount: number) {
    let result = MathHelper.Clamp(amount, 0, 1);
    result = MathHelper.Hermite(value1, 0, value2, 0, result);

    return result;
  }

  /**
   * 将弧度转换为角度。
   * @static
   * @param {Number} radians 以弧度表示的角。
   * @returns {Number}
   */
  static ToDegrees(radians: number) {
    return (radians * 180) / Math.PI;
    // return radians * 57.295779513082320876798154814105;
  }

  /**
   * 将角度转换为弧度。
   * @static
   * @param {Number} degrees 以角度表示的角。
   * @returns {Number}
   */
  static ToRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
    // return degrees * 0.017453292519943295769236907684886;
  }

  /**
   * 将一个给定角度减小到介于 π 和 -π 的值。
   * @static
   * @param {Number} angle 要减少的角度，以弧度计。
   * @returns {Number}
   */
  static WrapAngle(angle: number) {
    if (angle > -MathHelper.Pi && angle <= MathHelper.Pi) {
      return angle;
    }

    angle %= MathHelper.TwoPi;

    if (angle <= -MathHelper.Pi) {
      return angle + MathHelper.TwoPi;
    }

    if (angle > MathHelper.Pi) {
      return angle - MathHelper.TwoPi;
    }

    return angle;
  }
}
