import MathHelper from './MathHelper';
import Vector2 from './Vector2';
import Vector3 from './Vector3';
import Matrix from './Matrix';

class Quaternion {
  /**
   * 初始化新的 Quaternion 实例。
   * @constructs
   * @param {Number} x 四元数的 x 值。
   * @param {Number} y 四元数的 y 值。
   * @param {Number} z 四元数的 z 值。
   * @param {Number} w 四元数的 w 值。
   * @returns {Quaternion}
   */
  constructor(public X = 0, public Y = 0, public Z = 0, public W = 0) {}

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
    quaternion.X = quaternion1.X + quaternion2.X;
    quaternion.Y = quaternion1.Y + quaternion2.Y;
    quaternion.Z = quaternion1.Z + quaternion2.Z;
    quaternion.W = quaternion1.W + quaternion2.W;
    return quaternion;
  }

  static Concatenate(...args) {
    return (Quaternion.Concatenate = Overload.Create().Add(
      [Quaternion, Quaternion],
      function (value1, value2) {
        const quaternion = new Quaternion();

        const x1 = value1.X;
        const y1 = value1.Y;
        const z1 = value1.Z;
        const w1 = value1.W;

        const x2 = value2.X;
        const y2 = value2.Y;
        const z2 = value2.Z;
        const w2 = value2.W;

        quaternion.X = x2 * w1 + x1 * w2 + (y2 * z1 - z2 * y1);
        quaternion.Y = y2 * w1 + y1 * w2 + (z2 * x1 - x2 * z1);
        quaternion.Z = z2 * w1 + z1 * w2 + (x2 * y1 - y2 * x1);
        quaternion.W = w2 * w1 - (x2 * x1 + y2 * y1 + z2 * z1);

        return quaternion;
      }
    )).call(this, ...args);
  }

  static Conjugate(...args) {
    return (Quaternion.Conjugate = Overload.Create().Add(
      [Quaternion],
      function (value) {
        return new Quaternion(-value.X, -value.Y, -value.Z, value.W);
      }
    )).call(this, ...args);
  }

  Conjugate(...args) {
    return (Quaternion.prototype.Conjugate = Overload.Create().Add(
      [],
      function () {
        this.X = -this.X;
        this.Y = -this.Y;
        this.Z = -this.Z;
      }
    )).call(this, ...args);
  }

  static CreateFromAxisAngle(...args) {
    return (Quaternion.CreateFromAxisAngle = Overload.Create().Add(
      [Vector3, Number],
      function (axis, angle) {
        const half = angle * 0.5;
        const sin = Math.sin(half);
        const cos = Math.cos(half);
        return new Quaternion(axis.X * sin, axis.Y * sin, axis.Z * sin, cos);
      }
    )).call(this, ...args);
  }

  static CreateFromRotationMatrix(...args) {
    return (Quaternion.CreateFromRotationMatrix = Overload.Create().Add(
      [Matrix],
      function (matrix) {
        const quaternion = new Quaternion();
        let sqrt;
        let half;
        const scale = matrix.M11 + matrix.M22 + matrix.M33;

        if (scale > 0.0) {
          sqrt = Math.sqrt(scale + 1.0);
          quaternion.W = sqrt * 0.5;
          sqrt = 0.5 / sqrt;

          quaternion.X = (matrix.M23 - matrix.M32) * sqrt;
          quaternion.Y = (matrix.M31 - matrix.M13) * sqrt;
          quaternion.Z = (matrix.M12 - matrix.M21) * sqrt;

          return quaternion;
        }
        if (matrix.M11 >= matrix.M22 && matrix.M11 >= matrix.M33) {
          sqrt = Math.sqrt(1.0 + matrix.M11 - matrix.M22 - matrix.M33);
          half = 0.5 / sqrt;

          quaternion.X = 0.5 * sqrt;
          quaternion.Y = (matrix.M12 + matrix.M21) * half;
          quaternion.Z = (matrix.M13 + matrix.M31) * half;
          quaternion.W = (matrix.M23 - matrix.M32) * half;

          return quaternion;
        }
        if (matrix.M22 > matrix.M33) {
          sqrt = Math.sqrt(1.0 + matrix.M22 - matrix.M11 - matrix.M33);
          half = 0.5 / sqrt;

          quaternion.X = (matrix.M21 + matrix.M12) * half;
          quaternion.Y = 0.5 * sqrt;
          quaternion.Z = (matrix.M32 + matrix.M23) * half;
          quaternion.W = (matrix.M31 - matrix.M13) * half;

          return quaternion;
        }
        sqrt = Math.sqrt(1.0 + matrix.M33 - matrix.M11 - matrix.M22);
        half = 0.5 / sqrt;

        quaternion.X = (matrix.M31 + matrix.M13) * half;
        quaternion.Y = (matrix.M32 + matrix.M23) * half;
        quaternion.Z = 0.5 * sqrt;
        quaternion.W = (matrix.M12 - matrix.M21) * half;

        return quaternion;
      }
    )).call(this, ...args);
  }

  static CreateFromYawPitchRoll(...args) {
    return (Quaternion.CreateFromYawPitchRoll = Overload.Create().Add(
      [Number, Number, Number],
      function (yaw, pitch, roll) {
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
    )).call(this, ...args);
  }

  static Divide(...args) {
    return (Quaternion.Divide = Overload.Create().Add(
      [Quaternion, Quaternion],
      function (quaternion1, quaternion2) {
        const quaternion = new Quaternion();
        const x = quaternion1.X;
        const y = quaternion1.Y;
        const z = quaternion1.Z;
        const w = quaternion1.W;
        const num14 =
          quaternion2.X * quaternion2.X +
          quaternion2.Y * quaternion2.Y +
          quaternion2.Z * quaternion2.Z +
          quaternion2.W * quaternion2.W;
        const num5 = 1 / num14;
        const num4 = -quaternion2.X * num5;
        const num3 = -quaternion2.Y * num5;
        const num2 = -quaternion2.Z * num5;
        const num = quaternion2.W * num5;
        const num13 = y * num2 - z * num3;
        const num12 = z * num4 - x * num2;
        const num11 = x * num3 - y * num4;
        const num10 = x * num4 + y * num3 + z * num2;
        quaternion.X = x * num + num4 * w + num13;
        quaternion.Y = y * num + num3 * w + num12;
        quaternion.Z = z * num + num2 * w + num11;
        quaternion.W = w * num - num10;
        return quaternion;
      }
    )).call(this, ...args);
  }

  static Dot(...args) {
    return (Quaternion.Dot = Overload.Create().Add(
      [Quaternion, Quaternion],
      function (quaternion1, quaternion2) {
        return (
          quaternion1.X * quaternion2.X +
          quaternion1.Y * quaternion2.Y +
          quaternion1.Z * quaternion2.Z +
          quaternion1.W * quaternion2.W
        );
      }
    )).call(this, ...args);
  }

  Equals(...args) {
    return (Quaternion.prototype.Equals = Overload.Create()
      .Add([Quaternion], function (obj) {
        return (
          this.X == obj.X &&
          this.Y == obj.Y &&
          this.Z == obj.Z &&
          this.W == obj.W
        );
      })
      .Add(['*'], function () {
        return false;
      })).call(this, ...args);
  }

  GetHashCode(...args) {
    return (Quaternion.prototype.GetHashCode = Overload.Create().Add(
      [],
      function () {
        return this.X + this.Y + this.Z + this.W;
      }
    )).call(this, ...args);
  }

  static Inverse(...args) {
    return (Quaternion.Inverse = Overload.Create().Add(
      [Quaternion],
      function (quaternion) {
        const quaternion2 = new Quaternion();
        const num2 =
          quaternion.X * quaternion.X +
          quaternion.Y * quaternion.Y +
          quaternion.Z * quaternion.Z +
          quaternion.W * quaternion.W;
        const num = 1 / num2;
        quaternion2.X = -quaternion.X * num;
        quaternion2.Y = -quaternion.Y * num;
        quaternion2.Z = -quaternion.Z * num;
        quaternion2.W = quaternion.W * num;
        return quaternion2;
      }
    )).call(this, ...args);
  }

  Length(...args) {
    return (Quaternion.prototype.Length = Overload.Create().Add(
      [],
      function () {
        return Math.sqrt(
          this.X * this.X + this.Y * this.Y + this.Z * this.Z + this.W * this.W
        );
      }
    )).call(this, ...args);
  }

  LengthSquared(...args) {
    return (Quaternion.prototype.LengthSquared = Overload.Create().Add(
      [],
      function () {
        return (
          this.X * this.X + this.Y * this.Y + this.Z * this.Z + this.W * this.W
        );
      }
    )).call(this, ...args);
  }

  static Lerp(...args) {
    return (Quaternion.Lerp = Overload.Create().Add(
      [Quaternion, Quaternion, Number],
      function (quaternion1, quaternion2, amount) {
        const num = amount;
        const num2 = 1 - num;
        const quaternion = new Quaternion();
        const num5 =
          quaternion1.X * quaternion2.X +
          quaternion1.Y * quaternion2.Y +
          quaternion1.Z * quaternion2.Z +
          quaternion1.W * quaternion2.W;
        if (num5 >= 0) {
          quaternion.X = num2 * quaternion1.X + num * quaternion2.X;
          quaternion.Y = num2 * quaternion1.Y + num * quaternion2.Y;
          quaternion.Z = num2 * quaternion1.Z + num * quaternion2.Z;
          quaternion.W = num2 * quaternion1.W + num * quaternion2.W;
        } else {
          quaternion.X = num2 * quaternion1.X - num * quaternion2.X;
          quaternion.Y = num2 * quaternion1.Y - num * quaternion2.Y;
          quaternion.Z = num2 * quaternion1.Z - num * quaternion2.Z;
          quaternion.W = num2 * quaternion1.W - num * quaternion2.W;
        }
        const num4 =
          quaternion.X * quaternion.X +
          quaternion.Y * quaternion.Y +
          quaternion.Z * quaternion.Z +
          quaternion.W * quaternion.W;
        const num3 = 1 / Math.sqrt(num4);
        quaternion.X *= num3;
        quaternion.Y *= num3;
        quaternion.Z *= num3;
        quaternion.W *= num3;
        return quaternion;
      }
    )).call(this, ...args);
  }

  static Multiply(...args) {
    return (Quaternion.Multiply = Overload.Create()
      .Add([Quaternion, Number], function (quaternion1, scaleFactor) {
        const quaternion = new Quaternion();
        quaternion.X = quaternion1.X * scaleFactor;
        quaternion.Y = quaternion1.Y * scaleFactor;
        quaternion.Z = quaternion1.Z * scaleFactor;
        quaternion.W = quaternion1.W * scaleFactor;
        return quaternion;
      })
      .Add([Quaternion, Quaternion], function (quaternion1, quaternion2) {
        const quaternion = new Quaternion();
        const x = quaternion1.X;
        const y = quaternion1.Y;
        const z = quaternion1.Z;
        const w = quaternion1.W;
        const num4 = quaternion2.X;
        const num3 = quaternion2.Y;
        const num2 = quaternion2.Z;
        const num = quaternion2.W;
        const num12 = y * num2 - z * num3;
        const num11 = z * num4 - x * num2;
        const num10 = x * num3 - y * num4;
        const num9 = x * num4 + y * num3 + z * num2;
        quaternion.X = x * num + num4 * w + num12;
        quaternion.Y = y * num + num3 * w + num11;
        quaternion.Z = z * num + num2 * w + num10;
        quaternion.W = w * num - num9;
        return quaternion;
      })).call(this, ...args);
  }

  static Negate(...args) {
    return (Quaternion.Negate = Overload.Create().Add(
      [Quaternion],
      function (quaternion) {
        return new Quaternion(
          -quaternion.X,
          -quaternion.Y,
          -quaternion.Z,
          -quaternion.W
        );
      }
    )).call(this, ...args);
  }

  static Normalize(...args) {
    return (Quaternion.Normalize = Overload.Create().Add(
      [Quaternion],
      function (quaternion) {
        const result = new Quaternion();
        const num =
          1 /
          Math.sqrt(
            quaternion.X * quaternion.X +
              quaternion.Y * quaternion.Y +
              quaternion.Z * quaternion.Z +
              quaternion.W * quaternion.W
          );
        result.X = quaternion.X * num;
        result.Y = quaternion.Y * num;
        result.Z = quaternion.Z * num;
        result.W = quaternion.W * num;
        return result;
      }
    )).call(this, ...args);
  }

  Normalize(...args) {
    return (Quaternion.prototype.Normalize = Overload.Create().Add(
      [],
      function () {
        const num =
          1 /
          Math.sqrt(
            this.X * this.X +
              this.Y * this.Y +
              this.Z * this.Z +
              this.W * this.W
          );
        this.X *= num;
        this.Y *= num;
        this.Z *= num;
        this.W *= num;
      }
    )).call(this, ...args);
  }

  static Slerp(...args) {
    return (Quaternion.Slerp = Overload.Create().Add(
      [Quaternion, Quaternion, Number],
      function (quaternion1, quaternion2, amount) {
        let num2;
        let num3;
        const quaternion = new Quaternion();
        const num = amount;
        let num4 =
          quaternion1.X * quaternion2.X +
          quaternion1.Y * quaternion2.Y +
          quaternion1.Z * quaternion2.Z +
          quaternion1.W * quaternion2.W;
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
          num2 = flag
            ? -Math.sin(num * num5) * num6
            : Math.sin(num * num5) * num6;
        }
        quaternion.X = num3 * quaternion1.X + num2 * quaternion2.X;
        quaternion.Y = num3 * quaternion1.Y + num2 * quaternion2.Y;
        quaternion.Z = num3 * quaternion1.Z + num2 * quaternion2.Z;
        quaternion.W = num3 * quaternion1.W + num2 * quaternion2.W;
        return quaternion;
      }
    )).call(this, ...args);
  }

  static Subtract(...args) {
    return (Quaternion.Subtract = Overload.Create().Add(
      [Quaternion, Quaternion],
      function (quaternion1, quaternion2) {
        const quaternion = new Quaternion();
        quaternion.X = quaternion1.X - quaternion2.X;
        quaternion.Y = quaternion1.Y - quaternion2.Y;
        quaternion.Z = quaternion1.Z - quaternion2.Z;
        quaternion.W = quaternion1.W - quaternion2.W;
        return quaternion;
      }
    )).call(this, ...args);
  }

  ToString(...args) {
    return (Quaternion.prototype.ToString = Overload.Create().Add(
      [],
      function () {
        return `{X:${this.X} Y:${this.Y} Z:${this.Z} W:${this.W}}`;
      }
    )).call(this, ...args);
  }

  Serialize(...args) {
    const superSerialize = super.Serialize;
    return (Quaternion.prototype.Serialize = Overload.Create().Add(
      [String],
      function () {
        return superSerialize.call(this, {
          X: this.X,
          Y: this.Y,
          Z: this.Z,
          W: this.W,
        });
      }
    )).call(this, ...args);
  }

  static Deserialize(...args) {
    return (Quaternion.Deserialize = Overload.Create()
      .Add([String], function (str) {
        return this.Deserialize(JSON.parse(str));
      })
      .Add([window.Object], function (obj) {
        if (obj['Symbol'] !== Quaternion.name) {
          throw new TypeError('Unrecognized type');
        }
        return new Quaternion(obj.X, obj.Y, obj.Z, obj.W);
      })).call(this, ...args);
  }
}

export default Quaternion;
