﻿import MathHelper from './MathHelper';
import { Vector3 } from './Vector3';
import Quaternion from './Quaternion';
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

  static Clamp(...args) {
    return (Vector2.Clamp = Overload.Create().Add(
      [Vector2, Vector2, Vector2],
      function (value1, min, max) {
        return new Vector2(
          MathHelper.Clamp(value1.X, min.X, max.X),
          MathHelper.Clamp(value1.Y, min.Y, max.Y)
        );
      }
    )).call(this, ...args);
  }

  static Distance(...args) {
    return (Vector2.Distance = Overload.Create().Add(
      [Vector2, Vector2],
      function (value1, value2) {
        const v1 = value1.X - value2.X;
        const v2 = value1.Y - value2.Y;
        return Math.sqrt(v1 * v1 + v2 * v2);
      }
    )).call(this, ...args);
  }

  static DistanceSquared(...args) {
    return (Vector2.DistanceSquared = Overload.Create().Add(
      [Vector2, Vector2],
      function (value1, value2) {
        const v1 = value1.X - value2.X;
        const v2 = value1.Y - value2.Y;
        return v1 * v1 + v2 * v2;
      }
    )).call(this, ...args);
  }

  static Divide(...args) {
    return (Vector2.Divide = Overload.Create()
      .Add([Vector2, Number], function (value1, divider) {
        const factor = 1 / divider;
        return new Vector2(value1.X * factor, value1.Y * factor);
      })
      .Add([Vector2, Vector2], function (value1, value2) {
        return new Vector2(value1.X / value2.X, value1.Y / value2.Y);
      })).call(this, ...args);
  }

  static Dot(...args) {
    return (Vector2.Dot = Overload.Create().Add(
      [Vector2, Vector2],
      function (value1, value2) {
        return value1.X * value2.X + value1.Y * value2.Y;
      }
    )).call(this, ...args);
  }

  Equals(...args) {
    return (Vector2.prototype.Equals = Overload.Create()
      .Add([Vector2], function (obj) {
        return (
          Math.abs(this.X - obj.X) < 1e-6 && Math.abs(this.Y - obj.Y) < 1e-6
        );
      })
      .Add(['*'], function () {
        return false;
      })).call(this, ...args);
  }

  GetHashCode(...args) {
    return (Vector2.prototype.GetHashCode = Overload.Create().Add(
      [],
      function () {
        return (this.X * 397) ^ this.Y;
      }
    )).call(this, ...args);
  }

  static Hermite(...args) {
    return (Vector2.Hermite = Overload.Create().Add(
      [Vector2, Vector2, Vector2, Vector2, Number],
      function (value1, tangent1, value2, tangent2, amount) {
        return new Vector2(
          MathHelper.Hermite(
            value1.X,
            tangent1.X,
            value2.X,
            tangent2.X,
            amount
          ),
          MathHelper.Hermite(value1.Y, tangent1.Y, value2.Y, tangent2.Y, amount)
        );
      }
    )).call(this, ...args);
  }

  Length(...args) {
    return (Vector2.prototype.Length = Overload.Create().Add([], function () {
      return Math.sqrt(this.X * this.X + this.Y * this.Y);
    })).call(this, ...args);
  }

  LengthSquared(...args) {
    return (Vector2.prototype.LengthSquared = Overload.Create().Add(
      [],
      function () {
        return this.X * this.X + this.Y * this.Y;
      }
    )).call(this, ...args);
  }

  static Lerp(...args) {
    return (Vector2.Lerp = Overload.Create().Add(
      [Vector2, Vector2, Number],
      function (value1, value2, amount) {
        return new Vector2(
          MathHelper.Lerp(value1.X, value2.X, amount),
          MathHelper.Lerp(value1.Y, value2.Y, amount)
        );
      }
    )).call(this, ...args);
  }

  static Max(...args) {
    return (Vector2.Max = Overload.Create().Add(
      [Vector2, Vector2],
      function (value1, value2) {
        return new Vector2(
          value1.X > value2.X ? value1.X : value2.X,
          value1.Y > value2.Y ? value1.Y : value2.Y
        );
      }
    )).call(this, ...args);
  }

  static Min(...args) {
    return (Vector2.Min = Overload.Create().Add(
      [Vector2, Vector2],
      function (value1, value2) {
        return new Vector2(
          value1.X < value2.X ? value1.X : value2.X,
          value1.Y < value2.Y ? value1.Y : value2.Y
        );
      }
    )).call(this, ...args);
  }

  static Multiply(...args) {
    return (Vector2.Multiply = Overload.Create()
      .Add([Vector2, Number], function (value1, scaleFactor) {
        return new Vector2(value1.X * scaleFactor, value1.Y * scaleFactor);
      })
      .Add([Vector2, Vector2], function (value1, value2) {
        return new Vector2(value1.X * value2.X, value1.Y * value2.Y);
      })).call(this, ...args);
  }

  static Negate(...args) {
    return (Vector2.Negate = Overload.Create().Add([Vector2], function (value) {
      return new Vector2(-value.X, -value.Y);
    })).call(this, ...args);
  }

  static Normalize(...args) {
    return (Vector2.Normalize = Overload.Create().Add(
      [Vector2],
      function (value) {
        const val = 1.0 / Math.sqrt(value.X * value.X + value.Y * value.Y);
        return new Vector2(value.X * val, value.Y * val);
      }
    )).call(this, ...args);
  }

  Normalize(...args) {
    return (Vector2.prototype.Normalize = Overload.Create().Add(
      [],
      function () {
        const val = 1 / Math.sqrt(this.X * this.X + this.Y * this.Y);
        this.X *= val;
        this.Y *= val;
      }
    )).call(this, ...args);
  }

  static Reflect(...args) {
    return (Vector2.Reflect = Overload.Create().Add(
      [Vector2, Vector2],
      function (vector, normal) {
        const val = 2.0 * (vector.X * normal.X + vector.Y * normal.Y);
        return new Vector2(
          vector.X - normal.X * val,
          vector.Y - normal.Y * val
        );
      }
    )).call(this, ...args);
  }

  static SmoothStep(...args) {
    return (Vector2.SmoothStep = Overload.Create().Add(
      [Vector2, Vector2, Number],
      function (value1, value2, amount) {
        return new Vector2(
          MathHelper.SmoothStep(value1.X, value2.X, amount),
          MathHelper.SmoothStep(value1.Y, value2.Y, amount)
        );
      }
    )).call(this, ...args);
  }

  static Subtract(...args) {
    return (Vector2.Subtract = Overload.Create().Add(
      [Vector2, Vector2],
      function (value1, value2) {
        return new Vector2(value1.X - value2.X, value1.Y - value2.Y);
      }
    )).call(this, ...args);
  }

  ToString(...args) {
    return (Vector2.prototype.ToString = Overload.Create().Add([], function () {
      return `{X:${this.X} Y:${this.Y}}`;
    })).call(this, ...args);
  }

  static Transform(...args) {
    return (Vector2.Transform = Overload.Create()
      .Add([Vector2, Matrix], function (position, matrix) {
        const x =
          position.X * matrix.M11 + position.Y * matrix.M21 + matrix.M41;
        const y =
          position.X * matrix.M12 + position.Y * matrix.M22 + matrix.M42;
        return new Vector2(x, y);
      })
      .Add([Vector2, Quaternion], function (value, rotation) {
        const rot1 = new Vector3(
          rotation.X + rotation.X,
          rotation.Y + rotation.Y,
          rotation.Z + rotation.Z
        );
        const rot2 = new Vector3(rotation.X, rotation.X, rotation.W);
        const rot3 = new Vector3(1, rotation.Y, rotation.Z);
        const rot4 = Vector3.Multiply(rot1, rot2);
        const rot5 = Vector3.Multiply(rot1, rot3);

        const v = new Vector2();
        v.X = value.X * (1.0 - rot5.Y - rot5.Z) + value.Y * (rot4.Y - rot4.Z);
        v.Y = value.X * (rot4.Y + rot4.Z) + value.Y * (1.0 - rot4.X - rot5.Z);
        return v;
      })
      .Add(
        [
          TypeList.T(Vector2),
          Number,
          Matrix,
          TypeList.T(Vector2),
          Number,
          Number,
        ],
        function (
          sourceArray,
          sourceIndex,
          matrix,
          destinationArray,
          destinationIndex,
          length
        ) {
          if (sourceArray == null) {
            throw new TypeError(new Error('sourceArray'));
          }

          if (destinationArray == null) {
            throw new TypeError(new Error('destinationArray'));
          }

          if (sourceArray.Length < sourceIndex + length) {
            throw new TypeError(
              new Error(
                'Source array length is lesser than sourceIndex + length'
              )
            );
          }

          if (destinationArray.Length < destinationIndex + length) {
            throw new TypeError(
              new Error(
                'Destination array length is lesser than destinationIndex + length'
              )
            );
          }

          for (let i = 0; i < destinationArray.Length; i++) {
            destinationArray[i] = destinationArray[i] || Vector2.Zero;
          }

          for (let x = 0; x < length; x++) {
            const position = sourceArray[sourceIndex + x];
            const destination = destinationArray[destinationIndex + x];
            destination.X =
              position.X * matrix.M11 + position.Y * matrix.M21 + matrix.M41;
            destination.Y =
              position.X * matrix.M12 + position.Y * matrix.M22 + matrix.M42;
          }
        }
      )
      .Add(
        [
          TypeList.T(Vector2),
          Number,
          Quaternion,
          TypeList.T(Vector2),
          Number,
          Number,
        ],
        function (
          sourceArray,
          sourceIndex,
          rotation,
          destinationArray,
          destinationIndex,
          length
        ) {
          if (sourceArray == null) {
            throw new TypeError(new Error('sourceArray'));
          }

          if (destinationArray == null) {
            throw new TypeError(new Error('destinationArray'));
          }

          if (sourceArray.Length < sourceIndex + length) {
            throw new TypeError(
              new Error(
                'Source array length is lesser than sourceIndex + length'
              )
            );
          }

          if (destinationArray.Length < destinationIndex + length) {
            throw new TypeError(
              new Error(
                'Destination array length is lesser than destinationIndex + length'
              )
            );
          }

          for (let i = 0; i < destinationArray.Length; i++) {
            destinationArray[i] = destinationArray[i] || Vector2.Zero;
          }

          for (let x = 0; x < length; x++) {
            const position = sourceArray[sourceIndex + x];
            const destination = destinationArray[destinationIndex + x];

            const v = Vector2.Transform(position, rotation);

            destination.X = v.X;
            destination.Y = v.Y;
          }
        }
      )
      .Add(
        [TypeList.T(Vector2), Matrix, TypeList.T(Vector2)],
        function (sourceArray, matrix, destinationArray) {
          Vector2.Transform(
            sourceArray,
            0,
            matrix,
            destinationArray,
            0,
            sourceArray.Length
          );
        }
      )
      .Add(
        [TypeList.T(Vector2), Quaternion, TypeList.T(Vector2)],
        function (sourceArray, rotation, destinationArray) {
          Vector2.Transform(
            sourceArray,
            0,
            rotation,
            destinationArray,
            0,
            sourceArray.Length
          );
        }
      )).call(this, ...args);
  }

  static TransformNormal(...args) {
    return (Vector2.TransformNormal = Overload.Create()
      .Add([Vector2, Matrix], function (normal, matrix) {
        return new Vector2(
          normal.X * matrix.M11 + normal.Y * matrix.M21,
          normal.X * matrix.M12 + normal.Y * matrix.M22
        );
      })
      .Add(
        [
          TypeList.T(Vector2),
          Number,
          Matrix,
          TypeList.T(Vector2),
          Number,
          Number,
        ],
        function (
          sourceArray,
          sourceIndex,
          matrix,
          destinationArray,
          destinationIndex,
          length
        ) {
          if (sourceArray == null) {
            throw new TypeError(new Error('sourceArray'));
          }

          if (destinationArray == null) {
            throw new TypeError(new Error('destinationArray'));
          }

          if (sourceArray.Length < sourceIndex + length) {
            throw new TypeError(
              new Error(
                'Source array length is lesser than sourceIndex + length'
              )
            );
          }

          if (destinationArray.Length < destinationIndex + length) {
            throw new TypeError(
              new Error(
                'Destination array length is lesser than destinationIndex + length'
              )
            );
          }

          for (let i = 0; i < destinationArray.Length; i++) {
            destinationArray[i] = destinationArray[i] || Vector2.Zero;
          }

          for (let i = 0; i < length; i++) {
            const normal = sourceArray[sourceIndex + i];

            destinationArray[destinationIndex + i] = new Vector2(
              normal.X * matrix.M11 + normal.Y * matrix.M21,
              normal.X * matrix.M12 + normal.Y * matrix.M22
            );
          }
        }
      )
      .Add(
        [TypeList.T(Vector2), Matrix, TypeList.T(Vector2)],
        function (sourceArray, matrix, destinationArray) {
          Vector2.TransformNormal(
            sourceArray,
            0,
            matrix,
            destinationArray,
            0,
            sourceArray.Length
          );
        }
      )).call(this, ...args);
  }
}
