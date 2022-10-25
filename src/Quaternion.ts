import { MathHelper } from './MathHelper';
import { Vector2 } from './Vector2';
import { Vector3 } from './Vector3';
import { Matrix } from './Matrix';

export class Quaternion {
  /**
   * 初始化新的 Quaternion 实例。
   * @constructs
   * @param {Number} x 四元数的 x 值。
   * @param {Number} y 四元数的 y 值。
   * @param {Number} z 四元数的 z 值。
   * @param {Number} w 四元数的 w 值。
   * @returns {Quaternion}
   */
  constructor(public x = 0, public y = 0, public z = 0, public w = 0) {}

  /**
   * 返回呈现无旋转的 Quaternion。
   * @static
   * @returns {Quaternion}
   */
  static get Zero() {
    return new Quaternion(0, 0, 0, 0);
  }

  /**
   * 返回呈现无旋转的 Quaternion。
   * @static
   * @returns {Quaternion}
   */
  static get Identity() {
    return new Quaternion(0, 0, 0, 1);
  }

  /**
   * 将两个四元数相加。
   * @static
   * @param {Quaternion} quaternion1 要添加的 Quaternion。
   * @param {Quaternion} quaternion2 要添加的 Quaternion。
   * @returns {Quaternion}
   */
  static Add(quaternion1: Quaternion, quaternion2: Quaternion) {
    const quaternion = new Quaternion();
    quaternion.x = quaternion1.x + quaternion2.x;
    quaternion.y = quaternion1.y + quaternion2.y;
    quaternion.z = quaternion1.z + quaternion2.z;
    quaternion.w = quaternion1.w + quaternion2.w;
    return quaternion;
  }

  /**
   * 连接两个 Quaternion；结果中先后呈现了 value1 旋转和 value2 旋转。
   * @static
   * @param {Quaternion} value1 序列中的第一个 Quaternion 旋转。
   * @param {Quaternion} value2 序列中的第二个 Quaternion 旋转。
   * @returns {Quaternion}
   */
  static Concatenate(value1: Quaternion, value2: Quaternion) {
    const quaternion = new Quaternion();

    const x1 = value1.x;
    const y1 = value1.y;
    const z1 = value1.z;
    const w1 = value1.w;

    const x2 = value2.x;
    const y2 = value2.y;
    const z2 = value2.z;
    const w2 = value2.w;

    quaternion.x = x2 * w1 + x1 * w2 + (y2 * z1 - z2 * y1);
    quaternion.y = y2 * w1 + y1 * w2 + (z2 * x1 - x2 * z1);
    quaternion.z = z2 * w1 + z1 * w2 + (x2 * y1 - y2 * x1);
    quaternion.w = w2 * w1 - (x2 * x1 + y2 * y1 + z2 * z1);

    return quaternion;
  }

  /**
   * 返回指定 Quaternion 的共轭。
   * @static
   * @param {Quaternion} value 返回其共轭的 Quaternion。
   * @return {Quaternion}
   */
  static Conjugate(value: Quaternion) {
    return new Quaternion(-value.x, -value.y, -value.z, value.w);
  }

  /**
   * 将该 Quaternion 变换为其共轭。
   */
  Conjugate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
  }

  /**
   * 用矢量和绕其旋转的角度创建 Quaternion。
   * @static
   * @param {Vector3} axis 要围绕旋转的矢量。
   * @param {Number} angle 绕矢量旋转的角度。
   * @returns {Quaternion}
   */
  static CreateFromAxisAngle(axis: Vector3, angle: number) {
    const half = angle * 0.5;
    const sin = Math.sin(half);
    const cos = Math.cos(half);
    return new Quaternion(axis.x * sin, axis.y * sin, axis.z * sin, cos);
  }

  /**
   * 从旋转 Matrix 创建一个 Quaternion。
   * @static
   * @param {Matrix} matrix 用于创建 Quaternion 的旋转 Matrix。
   * @returns {Quaternion}
   */
  static CreateFromRotationMatrix(matrix: Matrix) {
    const quaternion = new Quaternion();
    let sqrt;
    let half;
    const scale = matrix.m11 + matrix.m22 + matrix.m33;

    if (scale > 0.0) {
      sqrt = Math.sqrt(scale + 1.0);
      quaternion.w = sqrt * 0.5;
      sqrt = 0.5 / sqrt;

      quaternion.x = (matrix.m23 - matrix.m32) * sqrt;
      quaternion.y = (matrix.m31 - matrix.m13) * sqrt;
      quaternion.z = (matrix.m12 - matrix.m21) * sqrt;

      return quaternion;
    }
    if (matrix.m11 >= matrix.m22 && matrix.m11 >= matrix.m33) {
      sqrt = Math.sqrt(1.0 + matrix.m11 - matrix.m22 - matrix.m33);
      half = 0.5 / sqrt;

      quaternion.x = 0.5 * sqrt;
      quaternion.y = (matrix.m12 + matrix.m21) * half;
      quaternion.z = (matrix.m13 + matrix.m31) * half;
      quaternion.w = (matrix.m23 - matrix.m32) * half;

      return quaternion;
    }
    if (matrix.m22 > matrix.m33) {
      sqrt = Math.sqrt(1.0 + matrix.m22 - matrix.m11 - matrix.m33);
      half = 0.5 / sqrt;

      quaternion.x = (matrix.m21 + matrix.m12) * half;
      quaternion.y = 0.5 * sqrt;
      quaternion.z = (matrix.m32 + matrix.m23) * half;
      quaternion.w = (matrix.m31 - matrix.m13) * half;

      return quaternion;
    }
    sqrt = Math.sqrt(1.0 + matrix.m33 - matrix.m11 - matrix.m22);
    half = 0.5 / sqrt;

    quaternion.x = (matrix.m31 + matrix.m13) * half;
    quaternion.y = (matrix.m32 + matrix.m23) * half;
    quaternion.z = 0.5 * sqrt;
    quaternion.w = (matrix.m12 - matrix.m21) * half;

    return quaternion;
  }

  /**
   * 用指定的偏转、俯仰和侧滚角度新建 Quaternion。
   * @static
   * @param {Number} yaw 绕 y 轴的偏转角度，以弧度计。
   * @param {Number} pitch 绕 x 轴的俯仰角度，以弧度计。
   * @param {Number} roll 绕 z 轴的侧滚角度，以弧度计。
   * @returns {Quaternion}
   */
  static CreateFromYawPitchRoll(yaw: number, pitch: number, roll: number) {
    const halfRoll = roll * 0.5;
    const halfPitch = pitch * 0.5;
    const halfYaw = yaw * 0.5;

    const sinRoll = Math.sin(halfRoll);
    const cosRoll = Math.cos(halfRoll);
    const sinPitch = Math.sin(halfPitch);
    const cosPitch = Math.cos(halfPitch);
    const sinYaw = Math.sin(halfYaw);
    const cosYaw = Math.cos(halfYaw);

    return new Quaternion(
      cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll,
      sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll,
      cosYaw * cosPitch * sinRoll - sinYaw * sinPitch * cosRoll,
      cosYaw * cosPitch * cosRoll + sinYaw * sinPitch * sinRoll
    );
  }

  /**
   * 用一个 Quaternion 除以另一个 Quaternion。
   * @static
   * @param {Quaternion} quaternion1 源 Quaternion。
   * @param {Quaternion} quaternion2 除数。
   * @returns {Quaternion}
   */
  static Divide(quaternion1: Quaternion, quaternion2: Quaternion) {
    const quaternion = new Quaternion();
    const x = quaternion1.x;
    const y = quaternion1.y;
    const z = quaternion1.z;
    const w = quaternion1.w;
    const num14 =
      quaternion2.x * quaternion2.x +
      quaternion2.y * quaternion2.y +
      quaternion2.z * quaternion2.z +
      quaternion2.w * quaternion2.w;
    const num5 = 1 / num14;
    const num4 = -quaternion2.x * num5;
    const num3 = -quaternion2.y * num5;
    const num2 = -quaternion2.z * num5;
    const num = quaternion2.w * num5;
    const num13 = y * num2 - z * num3;
    const num12 = z * num4 - x * num2;
    const num11 = x * num3 - y * num4;
    const num10 = x * num4 + y * num3 + z * num2;
    quaternion.x = x * num + num4 * w + num13;
    quaternion.y = y * num + num3 * w + num12;
    quaternion.z = z * num + num2 * w + num11;
    quaternion.w = w * num - num10;
    return quaternion;
  }

  /**
   * 计算两个四元数的点积。
   * @static
   * @param {Quaternion} quaternion1 源 Quaternion。
   * @param {Quaternion} quaternion2 源 Quaternion。
   * @returns {Number}
   */
  static Dot(quaternion1: Quaternion, quaternion2: Quaternion) {
    return (
      quaternion1.x * quaternion2.x +
      quaternion1.y * quaternion2.y +
      quaternion1.z * quaternion2.z +
      quaternion1.w * quaternion2.w
    );
  }

  /**
   * 确定指定的 Object 是否等于 Quaternion。
   * @param {Quaternion} other 用于与当前 Quaternion 比较的 Quaternion。
   * @returns {Boolean}
   */
  Equals(other: Quaternion) {
    return (
      this.x == other.x &&
      this.y == other.y &&
      this.z == other.z &&
      this.w == other.w
    );
  }

  GetHashCode() {
    return this.x + this.y + this.z + this.w;
  }

  /**
   * 返回 Quaternion 的逆四元数。
   * @static
   * @param {Quaternion} quaternion 源 Quaternion。
   * @returns {Quaternion}
   */
  static Inverse(quaternion: Quaternion) {
    const quaternion2 = new Quaternion();
    const num2 =
      quaternion.x * quaternion.x +
      quaternion.y * quaternion.y +
      quaternion.z * quaternion.z +
      quaternion.w * quaternion.w;
    const num = 1 / num2;
    quaternion2.x = -quaternion.x * num;
    quaternion2.y = -quaternion.y * num;
    quaternion2.z = -quaternion.z * num;
    quaternion2.w = quaternion.w * num;
    return quaternion2;
  }

  /**
   * 计算四元数的长度。
   * @returns {Number}
   */
  Length() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }

  /**
   * 计算四元数的平方长度。
   * @returns {Number}
   */
  LengthSquared() {
    return (
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }

  /**
   * 在两个四元数之间执行线性插值。
   * @static
   * @param {Quaternion} quaternion1 源四元数。
   * @param {Quaternion} quaternion2 源四元数。
   * @param {Number} amount 指示四元数之间的插值距离的值。
   * @returns {Quaternion}
   */
  static Lerp(
    quaternion1: Quaternion,
    quaternion2: Quaternion,
    amount: number
  ) {
    const num = amount;
    const num2 = 1 - num;
    const quaternion = new Quaternion();
    const num5 =
      quaternion1.x * quaternion2.x +
      quaternion1.y * quaternion2.y +
      quaternion1.z * quaternion2.z +
      quaternion1.w * quaternion2.w;
    if (num5 >= 0) {
      quaternion.x = num2 * quaternion1.x + num * quaternion2.x;
      quaternion.y = num2 * quaternion1.y + num * quaternion2.y;
      quaternion.z = num2 * quaternion1.z + num * quaternion2.z;
      quaternion.w = num2 * quaternion1.w + num * quaternion2.w;
    } else {
      quaternion.x = num2 * quaternion1.x - num * quaternion2.x;
      quaternion.y = num2 * quaternion1.y - num * quaternion2.y;
      quaternion.z = num2 * quaternion1.z - num * quaternion2.z;
      quaternion.w = num2 * quaternion1.w - num * quaternion2.w;
    }
    const num4 =
      quaternion.x * quaternion.x +
      quaternion.y * quaternion.y +
      quaternion.z * quaternion.z +
      quaternion.w * quaternion.w;
    const num3 = 1 / Math.sqrt(num4);
    quaternion.x *= num3;
    quaternion.y *= num3;
    quaternion.z *= num3;
    quaternion.w *= num3;
    return quaternion;
  }

  /**
   * 将两个四元数相乘。
   * @static
   * @param {Quaternion} quaternion1 乘号左边的四元数。
   * @param {Quaternion} quaternion2 乘号右边的四元数。
   * @returns {Quaternion}
   */
  static Multiply(quaternion1: Quaternion, quaternion2: Quaternion) {
    const quaternion = new Quaternion();
    const x = quaternion1.x;
    const y = quaternion1.y;
    const z = quaternion1.z;
    const w = quaternion1.w;
    const num4 = quaternion2.x;
    const num3 = quaternion2.y;
    const num2 = quaternion2.z;
    const num = quaternion2.w;
    const num12 = y * num2 - z * num3;
    const num11 = z * num4 - x * num2;
    const num10 = x * num3 - y * num4;
    const num9 = x * num4 + y * num3 + z * num2;
    quaternion.x = x * num + num4 * w + num12;
    quaternion.y = y * num + num3 * w + num11;
    quaternion.z = z * num + num2 * w + num10;
    quaternion.w = w * num - num9;
    return quaternion;
  }

  /**
   * 对四元数每个组件的符号取反。
   * @static
   * @param {Quaternion} quaternion 源四元数。
   * @returns {Quaternion}
   */
  static Negate(quaternion: Quaternion) {
    return new Quaternion(
      -quaternion.x,
      -quaternion.y,
      -quaternion.z,
      -quaternion.w
    );
  }

  /**
   * 以四元数的长度除四元数的每个组件。
   * @static
   * @param {Quaternion} quaternion 源四元数。
   * @returns {Quaternion}
   */
  static Normalize(quaternion: Quaternion) {
    const result = new Quaternion();
    const num =
      1 /
      Math.sqrt(
        quaternion.x * quaternion.x +
          quaternion.y * quaternion.y +
          quaternion.z * quaternion.z +
          quaternion.w * quaternion.w
      );
    result.x = quaternion.x * num;
    result.y = quaternion.y * num;
    result.z = quaternion.z * num;
    result.w = quaternion.w * num;
    return result;
  }

  /**
   * 以四元数的长度除四元数的每个组件。
   */
  Normalize() {
    const num =
      1 /
      Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    this.x *= num;
    this.y *= num;
    this.z *= num;
    this.w *= num;
  }

  /**
   * 使用球面线性插值计算两个四元数之间的插值。
   * @static
   * @param {Quaternion} quaternion1 源四元数。
   * @param {Quaternion} quaternion2 源四元数。
   * @param {Number} amount 指示要在四元数之间插入多远距离的值。
   * @returns {Quaternion}
   */
  static Slerp(
    quaternion1: Quaternion,
    quaternion2: Quaternion,
    amount: number
  ) {
    let num2;
    let num3;
    const quaternion = new Quaternion();
    const num = amount;
    let num4 =
      quaternion1.x * quaternion2.x +
      quaternion1.y * quaternion2.y +
      quaternion1.z * quaternion2.z +
      quaternion1.w * quaternion2.w;
    let flag = false;
    if (num4 < 0) {
      flag = true;
      num4 = -num4;
    }
    if (num4 > 0.999999) {
      num3 = 1 - num;
      num2 = flag ? -num : num;
    } else {
      const num5 = Math.acos(num4);
      const num6 = 1.0 / Math.sin(num5);
      num3 = Math.sin((1 - num) * num5) * num6;
      num2 = flag ? -Math.sin(num * num5) * num6 : Math.sin(num * num5) * num6;
    }
    quaternion.x = num3 * quaternion1.x + num2 * quaternion2.x;
    quaternion.y = num3 * quaternion1.y + num2 * quaternion2.y;
    quaternion.z = num3 * quaternion1.z + num2 * quaternion2.z;
    quaternion.w = num3 * quaternion1.w + num2 * quaternion2.w;
    return quaternion;
  }

  /**
   * 将一个四元数减去另一个四元数。
   * @static
   * @param {Quaternion} quaternion1 源四元数。
   * @param {Quaternion} quaternion2 源四元数。
   * @returns {Quaternion}
   */
  static Subtract(quaternion1: Quaternion, quaternion2: Quaternion) {
    const quaternion = new Quaternion();
    quaternion.x = quaternion1.x - quaternion2.x;
    quaternion.y = quaternion1.y - quaternion2.y;
    quaternion.z = quaternion1.z - quaternion2.z;
    quaternion.w = quaternion1.w - quaternion2.w;
    return quaternion;
  }

  ToString() {
    return `{X:${this.x} Y:${this.y} Z:${this.z} W:${this.w}}`;
  }
}
