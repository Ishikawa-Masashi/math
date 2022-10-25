import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';
import { Plane } from './Plane';
import { Viewport } from './viewport';
import { ArrayTools } from './arrayTools';
// import { MathTmp } from './mathTmp';

export class Matrix {
  /**
   * 初始化新的 Matrix 实例。
   * @constructs
   * @param {number} M11 M11 的初始化值。
   * @param {number} M12 M12 的初始化值。
   * @param {number} M13 M13 的初始化值。
   * @param {number} M14 M14 的初始化值。
   * @param {number} M21 M21 的初始化值。
   * @param {number} M22 M22 的初始化值。
   * @param {number} M23 M23 的初始化值。
   * @param {number} M24 M24 的初始化值。
   * @param {number} M31 M31 的初始化值。
   * @param {number} M32 M32 的初始化值。
   * @param {number} M33 M33 的初始化值。
   * @param {number} M34 M34 的初始化值。
   * @param {number} M41 M41 的初始化值。
   * @param {number} M42 M42 的初始化值。
   * @param {number} M43 M43 的初始化值。
   * @param {number} M44 M44 的初始化值。
   * @returns {Matrix}
   */
  constructor(
    public M11 = 0,
    public M12 = 0,
    public M13 = 0,
    public M14 = 0,
    public M21 = 0,
    public M22 = 0,
    public M23 = 0,
    public M24 = 0,
    public M31 = 0,
    public M32 = 0,
    public M33 = 0,
    public M34 = 0,
    public M41 = 0,
    public M42 = 0,
    public M43 = 0,
    public M44 = 0
  ) {}

  /**
   * 获取 Matrix 的后向矢量。
   * @returns {Vector3}
   */
  get Backward() {
    return new Vector3(this.M31, this.M32, this.M33);
  }

  /**
   * 设置 Matrix 的后向矢量。
   * @param {Vector3} value 值。
   */
  set Backward(value: Vector3) {
    this.M31 = value.X;
    this.M32 = value.Y;
    this.M33 = value.Z;
  }

  /**
   * 获取 Matrix 的向下矢量。
   * @returns {Vector3}
   */
  get Down() {
    return new Vector3(-this.M21, -this.M22, -this.M23);
  }

  /**
   * 设置 Matrix 的向下矢量。
   * @param {Vector3} value 值。
   */
  set Down(value: Vector3) {
    this.M21 = -value.X;
    this.M22 = -value.Y;
    this.M23 = -value.Z;
  }

  /**
   * 获取 Matrix 的向前矢量。
   * @returns {Vector3}
   */
  get Forward() {
    return new Vector3(-this.M31, -this.M32, -this.M33);
  }

  /**
   * 设置 Matrix 的向前矢量。
   * @param {Vector3} value 值。
   */
  set Forward(value: Vector3) {
    this.M31 = -value.X;
    this.M32 = -value.Y;
    this.M33 = -value.Z;
  }

  /**
   * 获取 Matrix 的向左矢量。
   * @returns {Vector3}
   */
  get Left() {
    return new Vector3(-this.M11, -this.M12, -this.M13);
  }

  /**
   * 设置 Matrix 的向左矢量。
   * @param {Vector3} value 值。
   */
  set Left(value: Vector3) {
    this.M11 = -value.X;
    this.M12 = -value.Y;
    this.M13 = -value.Z;
  }

  /**
   * 获取 Matrix 的向右矢量。
   * @returns {Vector3}
   */
  get Right() {
    return new Vector3(this.M11, this.M12, this.M13);
  }

  /**
   * 设置 Matrix 的向右矢量。
   * @param {Vector3} value 值。
   */
  set Right(value: Vector3) {
    this.M11 = value.X;
    this.M12 = value.Y;
    this.M13 = value.Z;
  }

  /**
   * 获取 Matrix 的向上矢量。
   * @returns {Vector3}
   */
  get Up() {
    return new Vector3(this.M21, this.M22, this.M23);
  }

  /**
   * 设置 Matrix 的向上矢量。
   * @param {Vector3} value 值。
   */
  set Up(value: Vector3) {
    this.M21 = value.X;
    this.M22 = value.Y;
    this.M23 = value.Z;
  }

  /**
   * [非XNA4.0标准]获取 Matrix 的缩放矢量。
   * @returns {Vector3}
   */
  get Scale() {
    return new Vector3(this.M11, this.M22, this.M33);
  }

  /**
   * [非XNA4.0标准]设置 Matrix 的缩放矢量。
   * @param {Vector3} value 值。
   */
  set Scale(value: Vector3) {
    this.M11 = value.X;
    this.M22 = value.Y;
    this.M33 = value.Z;
  }

  /**
   * 获取 Matrix 的平移矢量。
   * @returns {Vector3}
   */
  get Translation() {
    return new Vector3(this.M41, this.M42, this.M43);
  }

  /**
   * 设置 Matrix 的平移矢量。
   * @param {Vector3} value 值。
   */
  set Translation(value: Vector3) {
    this.M41 = value.X;
    this.M42 = value.Y;
    this.M43 = value.Z;
  }

  static get Identity() {
    return new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  /**
   * Stores a list of values (16) inside a given matrix
   * @param initialM11 defines 1st value of 1st row
   * @param initialM12 defines 2nd value of 1st row
   * @param initialM13 defines 3rd value of 1st row
   * @param initialM14 defines 4th value of 1st row
   * @param initialM21 defines 1st value of 2nd row
   * @param initialM22 defines 2nd value of 2nd row
   * @param initialM23 defines 3rd value of 2nd row
   * @param initialM24 defines 4th value of 2nd row
   * @param initialM31 defines 1st value of 3rd row
   * @param initialM32 defines 2nd value of 3rd row
   * @param initialM33 defines 3rd value of 3rd row
   * @param initialM34 defines 4th value of 3rd row
   * @param initialM41 defines 1st value of 4th row
   * @param initialM42 defines 2nd value of 4th row
   * @param initialM43 defines 3rd value of 4th row
   * @param initialM44 defines 4th value of 4th row
   * @param result defines the target matrix
   * @returns result input
   */
  public static FromValuesToRef(
    initialM11: number,
    initialM12: number,
    initialM13: number,
    initialM14: number,
    initialM21: number,
    initialM22: number,
    initialM23: number,
    initialM24: number,
    initialM31: number,
    initialM32: number,
    initialM33: number,
    initialM34: number,
    initialM41: number,
    initialM42: number,
    initialM43: number,
    initialM44: number,
    result: Matrix
  ): void {
    result.M11 = initialM11;
    result.M12 = initialM12;
    result.M13 = initialM13;
    result.M14 = initialM14;

    result.M21 = initialM21;
    result.M22 = initialM22;
    result.M23 = initialM23;
    result.M24 = initialM24;

    result.M31 = initialM31;
    result.M32 = initialM32;
    result.M33 = initialM33;
    result.M34 = initialM34;

    result.M41 = initialM41;
    result.M42 = initialM42;
    result.M43 = initialM43;
    result.M44 = initialM44;
  }

  /**
   * 将一个矩阵添加到另一个矩阵。
   * @static
   * @param {Matrix} matrix1 源矩阵。
   * @param {Matrix} matrix2 源矩阵。
   * @returns {Matrix}
   */
  static Add(matrix1: Matrix, matrix2: Matrix) {
    const matrix = new Matrix();

    matrix.M11 = matrix1.M11 + matrix2.M11;
    matrix.M12 = matrix1.M12 + matrix2.M12;
    matrix.M13 = matrix1.M13 + matrix2.M13;
    matrix.M14 = matrix1.M14 + matrix2.M14;

    matrix.M21 = matrix1.M21 + matrix2.M21;
    matrix.M22 = matrix1.M22 + matrix2.M22;
    matrix.M23 = matrix1.M23 + matrix2.M23;
    matrix.M24 = matrix1.M24 + matrix2.M24;

    matrix.M31 = matrix1.M31 + matrix2.M31;
    matrix.M32 = matrix1.M32 + matrix2.M32;
    matrix.M33 = matrix1.M33 + matrix2.M33;
    matrix.M34 = matrix1.M34 + matrix2.M34;

    matrix.M41 = matrix1.M41 + matrix2.M41;
    matrix.M42 = matrix1.M42 + matrix2.M42;
    matrix.M43 = matrix1.M43 + matrix2.M43;
    matrix.M44 = matrix1.M44 + matrix2.M44;
    return matrix;
  }

  /**
   * 创建一个绕指定对象位置旋转的球形宣传物。
   * @static
   * @param {Vector3} objectPosition 宣传物围绕旋转的对象的位置。
   * @param {Vector3} cameraPosition 摄影机位置。
   * @param {Vector3} cameraUpVector 摄影机向上矢量。
   * @param {?Vector3} cameraForwardVector 可选的摄影机向前矢量。
   * @returns {Matrix}
   */
  static CreateBillboard(
    objectPosition: Vector3,
    cameraPosition: Vector3,
    cameraUpVector: Vector3,
    cameraForwardVector?: Vector3
  ) {
    const result = new Matrix();
    let vector = new Vector3();
    let vector2 = new Vector3();
    let vector3 = new Vector3();
    vector.X = objectPosition.X - cameraPosition.X;
    vector.Y = objectPosition.Y - cameraPosition.Y;
    vector.Z = objectPosition.Z - cameraPosition.Z;
    const num = vector.LengthSquared();
    if (num < 0.0001) {
      if (!(cameraForwardVector instanceof Vector3)) {
        vector = Vector3.Forward;
      } else {
        vector.X = -cameraForwardVector.X;
        vector.Y = -cameraForwardVector.Y;
        vector.Z = -cameraForwardVector.Z;
      }
    } else {
      vector = Vector3.Multiply(vector, 1 / Math.sqrt(num));
    }
    vector3 = Vector3.Cross(cameraUpVector, vector);
    vector3.Normalize();
    vector2 = Vector3.Cross(vector, vector3);
    result.M11 = vector3.X;
    result.M12 = vector3.Y;
    result.M13 = vector3.Z;
    result.M14 = 0;
    result.M21 = vector2.X;
    result.M22 = vector2.Y;
    result.M23 = vector2.Z;
    result.M24 = 0;
    result.M31 = vector.X;
    result.M32 = vector.Y;
    result.M33 = vector.Z;
    result.M34 = 0;
    result.M41 = objectPosition.X;
    result.M42 = objectPosition.Y;
    result.M43 = objectPosition.Z;
    result.M44 = 1;
    return result;
  }

  // static CreateConstrainedBillboard(...args) {
  //   return (Matrix.CreateConstrainedBillboard = Overload.Create().Add(
  //     [Vector3, Vector3, Vector3, '*', '*'],
  //     function (
  //       objectPosition,
  //       cameraPosition,
  //       rotateAxis,
  //       cameraForwardVector,
  //       objectForwardVector
  //     ) {
  //       let result = new Matrix();
  //       let num;
  //       let vector = new Vector3();
  //       let vector2 = new Vector3();
  //       let vector3 = new Vector3();
  //       vector2.X = objectPosition.X - cameraPosition.X;
  //       vector2.Y = objectPosition.Y - cameraPosition.Y;
  //       vector2.Z = objectPosition.Z - cameraPosition.Z;
  //       var num2 = vector2.LengthSquared();
  //       if (num2 < 0.0001) {
  //         if (!(cameraForwardVector instanceof Vector3)) {
  //           vector2 = Vector3.Forward;
  //         } else {
  //           vector2.X = -cameraForwardVector.X;
  //           vector2.Y = -cameraForwardVector.Y;
  //           vector2.Z = -cameraForwardVector.Z;
  //         }
  //       } else {
  //         vector2 = Vector3.Multiply(vector2, 1 / Math.sqrt(num2));
  //       }
  //       var vector4 = rotateAxis;
  //       num = Vector3.Dot(rotateAxis, vector2);
  //       if (Math.abs(num) > 0.9982547) {
  //         if (objectForwardVector instanceof Vector3) {
  //           vector = objectForwardVector;
  //           num = Vector3.Dot(rotateAxis, vector);
  //           if (Math.abs(num) > 0.9982547) {
  //             num =
  //               rotateAxis.X * Vector3.Forward.X +
  //               rotateAxis.Y * Vector3.Forward.Y +
  //               rotateAxis.Z * Vector3.Forward.Z;
  //             vector =
  //               Math.abs(num) > 0.9982547 ? Vector3.Right : Vector3.Forward;
  //           }
  //         } else {
  //           num =
  //             rotateAxis.X * Vector3.Forward.X +
  //             rotateAxis.Y * Vector3.Forward.Y +
  //             rotateAxis.Z * Vector3.Forward.Z;
  //           vector =
  //             Math.abs(num) > 0.9982547 ? Vector3.Right : Vector3.Forward;
  //         }
  //         vector3 = Vector3.Cross(rotateAxis, vector);
  //         vector3.Normalize();
  //         vector = Vector3.Cross(vector3, rotateAxis);
  //         vector.Normalize();
  //       } else {
  //         vector3 = Vector3.Cross(rotateAxis, vector2);
  //         vector3.Normalize();
  //         vector = Vector3.Cross(vector3, vector4);
  //         vector.Normalize();
  //       }
  //       result.M11 = vector3.X;
  //       result.M12 = vector3.Y;
  //       result.M13 = vector3.Z;
  //       result.M14 = 0;
  //       result.M21 = vector4.X;
  //       result.M22 = vector4.Y;
  //       result.M23 = vector4.Z;
  //       result.M24 = 0;
  //       result.M31 = vector.X;
  //       result.M32 = vector.Y;
  //       result.M33 = vector.Z;
  //       result.M34 = 0;
  //       result.M41 = objectPosition.X;
  //       result.M42 = objectPosition.Y;
  //       result.M43 = objectPosition.Z;
  //       result.M44 = 1;
  //       return result;
  //     }
  //   )).call(this, ...args);
  // }

  /**
   * 新建一个绕任意矢量旋转的 Matrix。
   * @static
   * @param {Vector3} axis 要围绕旋转的轴。
   * @param {Number} angle 绕矢量旋转的角度。
   * @returns {Matrix}
   */
  static CreateFromAxisAngle(axis: Vector3, angle: number) {
    const result = new Matrix();
    const x = axis.X;
    const y = axis.Y;
    const z = axis.Z;
    const num2 = Math.sin(angle);
    const num = Math.cos(angle);
    const num11 = x * x;
    const num10 = y * y;
    const num9 = z * z;
    const num8 = x * y;
    const num7 = x * z;
    const num6 = y * z;
    result.M11 = num11 + num * (1 - num11);
    result.M12 = num8 - num * num8 + num2 * z;
    result.M13 = num7 - num * num7 - num2 * y;
    result.M14 = 0;
    result.M21 = num8 - num * num8 - num2 * z;
    result.M22 = num10 + num * (1 - num10);
    result.M23 = num6 - num * num6 + num2 * x;
    result.M24 = 0;
    result.M31 = num7 - num * num7 + num2 * y;
    result.M32 = num6 - num * num6 - num2 * x;
    result.M33 = num9 + num * (1 - num9);
    result.M34 = 0;
    result.M41 = 0;
    result.M42 = 0;
    result.M43 = 0;
    result.M44 = 1;
    return result;
  }
  /**
   * 从 Quaternion 创建一个旋转 Matrix。
   * @static
   * @param {Quaternion} quaternion 用于创建 Matrix 的 Quaternion。
   * @returns {Matrix}
   */
  static CreateFromQuaternion(quaternion: Quaternion) {
    const result = new Matrix();
    const num9 = quaternion.X * quaternion.X;
    const num8 = quaternion.Y * quaternion.Y;
    const num7 = quaternion.Z * quaternion.Z;
    const num6 = quaternion.X * quaternion.Y;
    const num5 = quaternion.Z * quaternion.W;
    const num4 = quaternion.Z * quaternion.X;
    const num3 = quaternion.Y * quaternion.W;
    const num2 = quaternion.Y * quaternion.Z;
    const num = quaternion.X * quaternion.W;
    result.M11 = 1 - 2 * (num8 + num7);
    result.M12 = 2 * (num6 + num5);
    result.M13 = 2 * (num4 - num3);
    result.M14 = 0;
    result.M21 = 2 * (num6 - num5);
    result.M22 = 1 - 2 * (num7 + num9);
    result.M23 = 2 * (num2 + num);
    result.M24 = 0;
    result.M31 = 2 * (num4 + num3);
    result.M32 = 2 * (num2 - num);
    result.M33 = 1 - 2 * (num8 + num9);
    result.M34 = 0;
    result.M41 = 0;
    result.M42 = 0;
    result.M43 = 0;
    result.M44 = 1;
    return result;
  }
  /**
   * 用指定的偏转、俯仰和侧滚新建旋转矩阵。
   * @static
   * @param {Number} yaw 绕 y 轴的旋转角度，以弧度计。
   * @param {Number} pitch 绕 x 轴的旋转角度，以弧度计。
   * @param {Number} roll 绕 z 轴的旋转角度，以弧度计。
   * @returns {Matrix}
   */
  static CreateFromYawPitchRoll(yaw: number, pitch: number, roll: number) {
    const quaternion = Quaternion.CreateFromYawPitchRoll(yaw, pitch, roll);
    return Matrix.CreateFromQuaternion(quaternion);
  }

  /**
   * 创建视图矩阵。
   * @static
   * @param {Vector3} cameraPosition 摄影机位置。
   * @param {Vector3} cameraTarget 摄影机指向的目标。
   * @param {Vector3} cameraUpVector 摄影机视点中的“上”方向。
   * @returns {Matrix}
   */
  static CreateLookAt(
    cameraPosition: Vector3,
    cameraTarget: Vector3,
    cameraUpVector: Vector3
  ) {
    const result = new Matrix();
    const vector = Vector3.Normalize(
      Vector3.Subtract(cameraPosition, cameraTarget)
    );
    const vector2 = Vector3.Normalize(Vector3.Cross(cameraUpVector, vector));
    const vector3 = Vector3.Cross(vector, vector2);
    result.M11 = vector2.X;
    result.M12 = vector3.X;
    result.M13 = vector.X;
    result.M14 = 0;
    result.M21 = vector2.Y;
    result.M22 = vector3.Y;
    result.M23 = vector.Y;
    result.M24 = 0;
    result.M31 = vector2.Z;
    result.M32 = vector3.Z;
    result.M33 = vector.Z;
    result.M34 = 0;
    result.M41 = -Vector3.Dot(vector2, cameraPosition);
    result.M42 = -Vector3.Dot(vector3, cameraPosition);
    result.M43 = -Vector3.Dot(vector, cameraPosition);
    result.M44 = 1;
    return result;
  }

  /**
   * 构建一个正交投影矩阵。
   * @static
   * @param {Number} width 视图体积宽度。
   * @param {Number} height 视图体积高度。
   * @param {Number} zNearPlane 视图体积的最小 z 值。
   * @param {Number} zFarPlane 视图体积的最大 z 值。
   * @returns {Matrix}
   */
  static CreateOrthographic(
    width: number,
    height: number,
    zNearPlane: number,
    zFarPlane: number
  ) {
    const result = new Matrix();
    result.M11 = 2 / width;
    result.M12 = result.M13 = result.M14 = 0;
    result.M22 = 2 / height;
    result.M21 = result.M23 = result.M24 = 0;
    result.M33 = 1 / (zNearPlane - zFarPlane);
    result.M31 = result.M32 = result.M34 = 0;
    result.M41 = result.M42 = 0;
    result.M43 = zNearPlane / (zNearPlane - zFarPlane);
    result.M44 = 1;
    return result;
  }

  /**
   * 构建一个定制的正交投影矩阵。
   * @static
   * @param {Number} left 视图体积的最小 x 值。
   * @param {Number} right 视图体积的最大 x 值。
   * @param {Number} bottom 视图体积的最小 y 值。
   * @param {Number} top 视图体积的最大 y 值。
   * @param {Number} zNearPlane 视图体积的最小 z 值。
   * @param {Number} zFarPlane 视图体积的最大 z 值。
   * @return {Matrix}
   */
  static CreateOrthographicOffCenter(
    left: number,
    right: number,
    bottom: number,
    top: number,
    zNearPlane: number,
    zFarPlane: number
  ) {
    const result = new Matrix();
    result.M11 = 2.0 / (right - left);
    result.M12 = 0.0;
    result.M13 = 0.0;
    result.M14 = 0.0;
    result.M21 = 0.0;
    result.M22 = 2.0 / (top - bottom);
    result.M23 = 0.0;
    result.M24 = 0.0;
    result.M31 = 0.0;
    result.M32 = 0.0;
    result.M33 = 1.0 / (zNearPlane - zFarPlane);
    result.M34 = 0.0;
    result.M41 = (left + right) / (left - right);
    result.M42 = (top + bottom) / (bottom - top);
    result.M43 = zNearPlane / (zNearPlane - zFarPlane);
    result.M44 = 1.0;
    return result;
  }

  /**
   * 构建一个透视投影矩阵并返回结果值。
   * @static
   * @param {Number} width 近处视图平面的视图体积宽度。
   * @param {Number} height 近处视图平面的视图体积高度。
   * @param {Number} nearPlaneDistance 与近处视图平面的距离。
   * @param {Number} farPlaneDistance 与远处视图平面的距离。
   * @returns {Matrix}
   */
  static CreatePerspective(
    width: number,
    height: number,
    nearPlaneDistance: number,
    farPlaneDistance: number
  ) {
    const result = new Matrix();

    if (nearPlaneDistance <= 0) {
      throw new TypeError('nearPlaneDistance <= 0');
    }

    if (farPlaneDistance <= 0) {
      throw new TypeError('farPlaneDistance <= 0');
    }

    if (nearPlaneDistance >= farPlaneDistance) {
      throw new TypeError('nearPlaneDistance >= farPlaneDistance');
    }

    result.M11 = (2 * nearPlaneDistance) / width;
    result.M12 = result.M13 = result.M14 = 0;
    result.M22 = (2 * nearPlaneDistance) / height;
    result.M21 = result.M23 = result.M24 = 0;
    result.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
    result.M31 = result.M32 = 0;
    result.M34 = -1;
    result.M41 = result.M42 = result.M44 = 0;
    result.M43 =
      (nearPlaneDistance * farPlaneDistance) /
      (nearPlaneDistance - farPlaneDistance);
    return result;
  }

  /**
   * 构建一个基于视野的透视投影矩阵并返回值。
   * @static
   * @param {Number} fieldOfView y 方向的视野，以弧度计。
   * @param {Number} aspectRatio 纵横比，定义为视图空间宽度与高度的比率。 与视口纵横比匹配的属性 AspectRatio。
   * @param {Number} nearPlaneDistance 与近处视图平面的距离。
   * @param {Number} farPlaneDistance 与远处视图平面的距离。
   * @returns {Matrix}
   */
  static CreatePerspectiveFieldOfView(
    fieldOfView: number,
    aspectRatio: number,
    nearPlaneDistance: number,
    farPlaneDistance: number
  ) {
    const result = new Matrix();

    if (fieldOfView <= 0 || fieldOfView >= 3.141593) {
      throw new TypeError('fieldOfView <= 0 or >= PI');
    }

    if (nearPlaneDistance <= 0) {
      throw new TypeError('nearPlaneDistance <= 0');
    }

    if (farPlaneDistance <= 0) {
      throw new TypeError('farPlaneDistance <= 0');
    }

    if (nearPlaneDistance >= farPlaneDistance) {
      throw new TypeError('nearPlaneDistance >= farPlaneDistance');
    }

    const num = 1 / Math.tan(fieldOfView * 0.5);
    const num9 = num / aspectRatio;
    result.M11 = num9;
    result.M12 = result.M13 = result.M14 = 0;
    result.M22 = num;
    result.M21 = result.M23 = result.M24 = 0;
    result.M31 = result.M32 = 0;
    result.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
    result.M34 = -1;
    result.M41 = result.M42 = result.M44 = 0;
    result.M43 =
      (nearPlaneDistance * farPlaneDistance) /
      (nearPlaneDistance - farPlaneDistance);
    return result;
  }

  /**
   * 构建一个定制的透视投影矩阵。
   * @static
   * @param {Number} left 近处视图平面的视图体积的最小 x 值。
   * @param {Number} right 近处视图平面的视图体积的最大 x 值。
   * @param {Number} bottom 近处视图平面的视图体积的最小 y 值。
   * @param {Number} top 近处视图平面的视图体积的最大 y 值。
   * @param {Number} nearPlaneDistance 与近处视图平面的距离。
   * @param {Number} farPlaneDistance 与远处视图平面的距离。
   * @returns {Matrix}
   */
  static CreatePerspectiveOffCenter(
    left: number,
    right: number,
    bottom: number,
    top: number,
    nearPlaneDistance: number,
    farPlaneDistance: number
  ) {
    const result = new Matrix();

    if (nearPlaneDistance <= 0) {
      throw new TypeError('nearPlaneDistance <= 0');
    }

    if (farPlaneDistance <= 0) {
      throw new TypeError('farPlaneDistance <= 0');
    }

    if (nearPlaneDistance >= farPlaneDistance) {
      throw new TypeError('nearPlaneDistance >= farPlaneDistance');
    }

    result.M11 = (2 * nearPlaneDistance) / (right - left);
    result.M12 = result.M13 = result.M14 = 0;
    result.M22 = (2 * nearPlaneDistance) / (top - bottom);
    result.M21 = result.M23 = result.M24 = 0;
    result.M31 = (left + right) / (right - left);
    result.M32 = (top + bottom) / (top - bottom);
    result.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
    result.M34 = -1;
    result.M43 =
      (nearPlaneDistance * farPlaneDistance) /
      (nearPlaneDistance - farPlaneDistance);
    result.M41 = result.M42 = result.M44 = 0;
    return result;
  }

  /**
   * 创建一个反映指定 Plane 的相关坐标系的 Matrix。
   * @static
   * @param {Plane} value 要创建反射的 Plane。
   * @return {Matrix}
   */
  static CreateReflection(value: Plane) {
    const result = new Matrix();
    const plane = Plane.Normalize(value);
    value.Normalize();
    const x = plane.Normal.X;
    const y = plane.Normal.Y;
    const z = plane.Normal.Z;
    const num3 = -2 * x;
    const num2 = -2 * y;
    const num = -2 * z;
    result.M11 = num3 * x + 1;
    result.M12 = num2 * x;
    result.M13 = num * x;
    result.M14 = 0;
    result.M21 = num3 * y;
    result.M22 = num2 * y + 1;
    result.M23 = num * y;
    result.M24 = 0;
    result.M31 = num3 * z;
    result.M32 = num2 * z;
    result.M33 = num * z + 1;
    result.M34 = 0;
    result.M41 = num3 * plane.D;
    result.M42 = num2 * plane.D;
    result.M43 = num * plane.D;
    result.M44 = 1;
    return result;
  }

  /**
   * Creates a new rotation matrix for "angle" radians around the X axis
   * @param angle defines the angle (in radians) to use
   * @returns the new matrix
   */
  static CreateRotationX(angle: number) {
    const result = new Matrix();
    Matrix.RotationXToRef(angle, result);
    return result;
  }

  /**
   * Creates a new rotation matrix for "angle" radians around the X axis and stores it in a given matrix
   * @param angle defines the angle (in radians) to use
   * @param result defines the target matrix
   * @returns result input
   */
  public static RotationXToRef(angle: number, result: Matrix) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    Matrix.FromValuesToRef(
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      c,
      s,
      0.0,
      0.0,
      -s,
      c,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      result
    );

    return result;
  }

  /**
   * 返回一个可绕 y 轴旋转一组顶点的矩阵。
   * @static
   * @param {Number} radians 绕 y 轴旋转的程度，以弧度计。请注意，您可以使用 ToRadians 将角度转换为弧度。
   * @returns {Matrix}
   */
  static CreateRotationY(radians: number) {
    const result = Matrix.Identity;

    const val1 = Math.cos(radians);
    const val2 = Math.sin(radians);

    result.M11 = val1;
    result.M13 = -val2;
    result.M31 = val2;
    result.M33 = val1;
    return result;
  }

  /**
   * 返回一个可绕 z 轴旋转一组顶点的矩阵。
   * @static
   * @param {Number} radians 绕 z 轴旋转的程度，以弧度计。请注意，您可以使用 ToRadians 将角度转换为弧度。
   * @returns {Matrix}
   */
  static CreateRotationZ(radians: number) {
    const result = Matrix.Identity;

    const val1 = Math.cos(radians);
    const val2 = Math.sin(radians);

    result.M11 = val1;
    result.M12 = val2;
    result.M21 = -val2;
    result.M22 = val1;
    return result;
  }

  /**
   * 创建一个缩放 Matrix。
   * @static
   * @param {Number} xScale x 轴上的缩放值。
   * @param {Number} yScale y 轴上的缩放值。
   * @param {Number} zScale z 轴上的缩放值。
   * @returns {Matrix}
   */
  static CreateScale(xScale: number, yScale: number, zScale: number) {
    const result = new Matrix();
    result.M11 = xScale;
    result.M12 = 0;
    result.M13 = 0;
    result.M14 = 0;
    result.M21 = 0;
    result.M22 = yScale;
    result.M23 = 0;
    result.M24 = 0;
    result.M31 = 0;
    result.M32 = 0;
    result.M33 = zScale;
    result.M34 = 0;
    result.M41 = 0;
    result.M42 = 0;
    result.M43 = 0;
    result.M44 = 1;
    return result;
  }

  /**
   * 创建一个将几何体展平为指定 Plane 的 Matrix（就像从指定的光源投射阴影）。
   * @static
   * @param {Vector3} lightDirection 指定投影灯光方向的 Vector3。
   * @param {Plane} plane 新矩阵为投射阴影而将几何体展平到的 Plane。
   * @returns {Matrix}
   */
  static CreateShadow(lightDirection: Vector3, plane: Plane) {
    const result = new Matrix();
    plane = Plane.Normalize(plane);
    const dot =
      plane.Normal.X * lightDirection.X +
      plane.Normal.Y * lightDirection.Y +
      plane.Normal.Z * lightDirection.Z;
    const x = -plane.Normal.X;
    const y = -plane.Normal.Y;
    const z = -plane.Normal.Z;
    const d = -plane.D;

    result.M11 = x * lightDirection.X + dot;
    result.M12 = x * lightDirection.Y;
    result.M13 = x * lightDirection.Z;
    result.M14 = 0;
    result.M21 = y * lightDirection.X;
    result.M22 = y * lightDirection.Y + dot;
    result.M23 = y * lightDirection.Z;
    result.M24 = 0;
    result.M31 = z * lightDirection.X;
    result.M32 = z * lightDirection.Y;
    result.M33 = z * lightDirection.Z + dot;
    result.M34 = 0;
    result.M41 = d * lightDirection.X;
    result.M42 = d * lightDirection.Y;
    result.M43 = d * lightDirection.Z;
    result.M44 = dot;
    return result;
  }

  /**
   * Creates a scaling matrix
   * @param x defines the scale factor on X axis
   * @param y defines the scale factor on Y axis
   * @param z defines the scale factor on Z axis
   * @returns the new matrix
   */
  public static Scaling(x: number, y: number, z: number): Matrix {
    const result = new Matrix();
    Matrix.ScalingToRef(x, y, z, result);
    return result;
  }

  /**
   * Creates a scaling matrix and stores it in a given matrix
   * @param x defines the scale factor on X axis
   * @param y defines the scale factor on Y axis
   * @param z defines the scale factor on Z axis
   * @param result defines the target matrix
   * @returns result input
   */
  public static ScalingToRef(x: number, y: number, z: number, result: Matrix) {
    Matrix.FromValuesToRef(
      x,
      0.0,
      0.0,
      0.0,
      0.0,
      y,
      0.0,
      0.0,
      0.0,
      0.0,
      z,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      result
    );

    return result;
  }

  /**
   * 创建一个平移 Matrix。
   * @static
   * @param {Number} xPosition x 轴上的平移值。
   * @param {Number} yPosition y 轴上的平移值。
   * @param {Number} zPosition z 轴上的平移值。
   * @returns {Matrix}
   */
  static CreateTranslation(
    xPosition: number,
    yPosition: number,
    zPosition: number
  ) {
    const result = new Matrix();
    result.M11 = 1;
    result.M12 = 0;
    result.M13 = 0;
    result.M14 = 0;
    result.M21 = 0;
    result.M22 = 1;
    result.M23 = 0;
    result.M24 = 0;
    result.M31 = 0;
    result.M32 = 0;
    result.M33 = 1;
    result.M34 = 0;
    result.M41 = xPosition;
    result.M42 = yPosition;
    result.M43 = zPosition;
    result.M44 = 1;
    return result;
  }

  /**
   * 用指定的参数创建场景矩阵。
   * @static
   * @param {Vector3} position 对象位置。该值被用于平移操作。
   * @param {Vector3} forward 对象的前方方向。
   * @param {Vector3} up 通常是 [0, 1, 0]。
   * @returns {Matrix}
   */
  static CreateWorld(position: Vector3, forward: Vector3, up: Vector3) {
    const z = Vector3.Normalize(forward);
    const x = Vector3.Cross(forward, up);
    const y = Vector3.Cross(x, forward);
    x.Normalize();
    y.Normalize();

    const result = new Matrix();
    result.Right = x;
    result.Up = y;
    result.Forward = z;
    result.Translation = position;
    result.M44 = 1;
    return result;
  }

  /**
   * 从 3D 缩放/旋转/平移 (SRT) Matrix 中提取标量、平移和旋转组件。
   * @param {Vector3} scale [Out]转换矩阵的标量组件，表达为 Vector3。
   * @param {Quaternion} rotation [Out] 转换矩阵的旋转组件，表达为 Quaternion。
   * @param {Vector3} translation [Out] 转换矩阵的平移组件，表达为 Vector3。
   * @returns {Boolean} 是否可以被分解
   */
  Decompose(scale: Vector3, rotation: Quaternion, translation: Vector3) {
    translation.X = this.M41;
    translation.Y = this.M42;
    translation.Z = this.M43;

    const xs =
      Math.sign(this.M11 * this.M12 * this.M13 * this.M14) < 0 ? -1 : 1;
    const ys =
      Math.sign(this.M21 * this.M22 * this.M23 * this.M24) < 0 ? -1 : 1;
    const zs =
      Math.sign(this.M31 * this.M32 * this.M33 * this.M34) < 0 ? -1 : 1;

    scale.X =
      xs *
      Math.sqrt(
        this.M11 * this.M11 + this.M12 * this.M12 + this.M13 * this.M13
      );
    scale.Y =
      ys *
      Math.sqrt(
        this.M21 * this.M21 + this.M22 * this.M22 + this.M23 * this.M23
      );
    scale.Z =
      zs *
      Math.sqrt(
        this.M31 * this.M31 + this.M32 * this.M32 + this.M33 * this.M33
      );

    if (scale.X == 0.0 || scale.Y == 0.0 || scale.Z == 0.0) {
      const quaternion = Quaternion.Identity;
      rotation.X = quaternion.X;
      rotation.Y = quaternion.Y;
      rotation.Z = quaternion.Z;
      rotation.W = quaternion.W;
      return false;
    }

    const m1 = new Matrix(
      this.M11 / scale.X,
      this.M12 / scale.X,
      this.M13 / scale.X,
      0,
      this.M21 / scale.Y,
      this.M22 / scale.Y,
      this.M23 / scale.Y,
      0,
      this.M31 / scale.Z,
      this.M32 / scale.Z,
      this.M33 / scale.Z,
      0,
      0,
      0,
      0,
      1
    );

    const quaternion = Quaternion.CreateFromRotationMatrix(m1);
    rotation.X = quaternion.X;
    rotation.Y = quaternion.Y;
    rotation.Z = quaternion.Z;
    rotation.W = quaternion.W;
    return true;
  }

  /**
   * 计算矩阵的决定因子。
   * @returns {Number}
   */
  Determinant() {
    const num22 = this.M11;
    const num21 = this.M12;
    const num20 = this.M13;
    const num19 = this.M14;
    const num12 = this.M21;
    const num11 = this.M22;
    const num10 = this.M23;
    const num9 = this.M24;
    const num8 = this.M31;
    const num7 = this.M32;
    const num6 = this.M33;
    const num5 = this.M34;
    const num4 = this.M41;
    const num3 = this.M42;
    const num2 = this.M43;
    const num = this.M44;
    const num18 = num6 * num - num5 * num2;
    const num17 = num7 * num - num5 * num3;
    const num16 = num7 * num2 - num6 * num3;
    const num15 = num8 * num - num5 * num4;
    const num14 = num8 * num2 - num6 * num4;
    const num13 = num8 * num3 - num7 * num4;
    return (
      num22 * (num11 * num18 - num10 * num17 + num9 * num16) -
      num21 * (num12 * num18 - num10 * num15 + num9 * num14) +
      num20 * (num12 * num17 - num11 * num15 + num9 * num13) -
      num19 * (num12 * num16 - num11 * num14 + num10 * num13)
    );
  }

  /**
   * 用矩阵组件除以标量。
   * @static
   * @param {Matrix} matrix1 源矩阵。
   * @param {Number} divider 除数。
   * @returns {Matrix}
   */
  static Divide(matrix1: Matrix, divider: number) {
    const result = new Matrix();
    const num = 1 / divider;
    result.M11 = matrix1.M11 * num;
    result.M12 = matrix1.M12 * num;
    result.M13 = matrix1.M13 * num;
    result.M14 = matrix1.M14 * num;
    result.M21 = matrix1.M21 * num;
    result.M22 = matrix1.M22 * num;
    result.M23 = matrix1.M23 * num;
    result.M24 = matrix1.M24 * num;
    result.M31 = matrix1.M31 * num;
    result.M32 = matrix1.M32 * num;
    result.M33 = matrix1.M33 * num;
    result.M34 = matrix1.M34 * num;
    result.M41 = matrix1.M41 * num;
    result.M42 = matrix1.M42 * num;
    result.M43 = matrix1.M43 * num;
    result.M44 = matrix1.M44 * num;
    return result;
  }

  /**
   * 确定指定的 Object 是否等于 Matrix。
   * @param {Matrix} other 用于与当前 Matrix 比较的 Object。
   * @returns {Boolean}
   */
  Equals(other: Matrix) {
    return (
      Math.abs(this.M11 - other.M11) < 1e-6 &&
      Math.abs(this.M22 - other.M22) < 1e-6 &&
      Math.abs(this.M33 - other.M33) < 1e-6 &&
      Math.abs(this.M44 - other.M44) < 1e-6 &&
      Math.abs(this.M12 - other.M12) < 1e-6 &&
      Math.abs(this.M13 - other.M13) < 1e-6 &&
      Math.abs(this.M14 - other.M14) < 1e-6 &&
      Math.abs(this.M21 - other.M21) < 1e-6 &&
      Math.abs(this.M23 - other.M23) < 1e-6 &&
      Math.abs(this.M24 - other.M24) < 1e-6 &&
      Math.abs(this.M31 - other.M31) < 1e-6 &&
      Math.abs(this.M32 - other.M32) < 1e-6 &&
      Math.abs(this.M34 - other.M34) < 1e-6 &&
      Math.abs(this.M41 - other.M41) < 1e-6 &&
      Math.abs(this.M42 - other.M42) < 1e-6 &&
      Math.abs(this.M43 - other.M43) < 1e-6
    );
  }

  GetHashCode() {
    return (
      this.M11 +
      this.M12 +
      this.M13 +
      this.M14 +
      this.M21 +
      this.M22 +
      this.M23 +
      this.M24 +
      this.M31 +
      this.M32 +
      this.M33 +
      this.M34 +
      this.M41 +
      this.M42 +
      this.M43 +
      this.M44
    );
  }

  /**
   * 计算矩阵的逆矩阵。
   * @static
   * @param {Matrix} matrix 源矩阵。
   * @returns {Matrix}
   */
  static Invert(matrix: Matrix) {
    const result = new Matrix();
    const num1 = matrix.M11;
    const num2 = matrix.M12;
    const num3 = matrix.M13;
    const num4 = matrix.M14;
    const num5 = matrix.M21;
    const num6 = matrix.M22;
    const num7 = matrix.M23;
    const num8 = matrix.M24;
    const num9 = matrix.M31;
    const num10 = matrix.M32;
    const num11 = matrix.M33;
    const num12 = matrix.M34;
    const num13 = matrix.M41;
    const num14 = matrix.M42;
    const num15 = matrix.M43;
    const num16 = matrix.M44;
    const num17 = num11 * num16 - num12 * num15;
    const num18 = num10 * num16 - num12 * num14;
    const num19 = num10 * num15 - num11 * num14;
    const num20 = num9 * num16 - num12 * num13;
    const num21 = num9 * num15 - num11 * num13;
    const num22 = num9 * num14 - num10 * num13;
    const num23 = num6 * num17 - num7 * num18 + num8 * num19;
    const num24 = -(num5 * num17 - num7 * num20 + num8 * num21);
    const num25 = num5 * num18 - num6 * num20 + num8 * num22;
    const num26 = -(num5 * num19 - num6 * num21 + num7 * num22);
    const num27 =
      1.0 / (num1 * num23 + num2 * num24 + num3 * num25 + num4 * num26);

    result.M11 = num23 * num27;
    result.M21 = num24 * num27;
    result.M31 = num25 * num27;
    result.M41 = num26 * num27;
    result.M12 = -(num2 * num17 - num3 * num18 + num4 * num19) * num27;
    result.M22 = (num1 * num17 - num3 * num20 + num4 * num21) * num27;
    result.M32 = -(num1 * num18 - num2 * num20 + num4 * num22) * num27;
    result.M42 = (num1 * num19 - num2 * num21 + num3 * num22) * num27;
    const num28 = num7 * num16 - num8 * num15;
    const num29 = num6 * num16 - num8 * num14;
    const num30 = num6 * num15 - num7 * num14;
    const num31 = num5 * num16 - num8 * num13;
    const num32 = num5 * num15 - num7 * num13;
    const num33 = num5 * num14 - num6 * num13;
    result.M13 = (num2 * num28 - num3 * num29 + num4 * num30) * num27;
    result.M23 = -(num1 * num28 - num3 * num31 + num4 * num32) * num27;
    result.M33 = (num1 * num29 - num2 * num31 + num4 * num33) * num27;
    result.M43 = -(num1 * num30 - num2 * num32 + num3 * num33) * num27;
    const num34 = num7 * num12 - num8 * num11;
    const num35 = num6 * num12 - num8 * num10;
    const num36 = num6 * num11 - num7 * num10;
    const num37 = num5 * num12 - num8 * num9;
    const num38 = num5 * num11 - num7 * num9;
    const num39 = num5 * num10 - num6 * num9;
    result.M14 = -(num2 * num34 - num3 * num35 + num4 * num36) * num27;
    result.M24 = (num1 * num34 - num3 * num37 + num4 * num38) * num27;
    result.M34 = -(num1 * num35 - num2 * num37 + num4 * num39) * num27;
    result.M44 = (num1 * num36 - num2 * num38 + num3 * num39) * num27;
    return result;
  }

  /**
   * 在两个矩阵的对应值之间执行线性插值。
   * @static
   * @param {Matrix} matrix1 源矩阵。
   * @param {Matrix} matrix2 源矩阵。
   * @param {Number} amount 插值。
   * @returns {Matrix}
   */
  static Lerp(matrix1: Matrix, matrix2: Matrix, amount: number) {
    const result = new Matrix();
    result.M11 = matrix1.M11 + (matrix2.M11 - matrix1.M11) * amount;
    result.M12 = matrix1.M12 + (matrix2.M12 - matrix1.M12) * amount;
    result.M13 = matrix1.M13 + (matrix2.M13 - matrix1.M13) * amount;
    result.M14 = matrix1.M14 + (matrix2.M14 - matrix1.M14) * amount;
    result.M21 = matrix1.M21 + (matrix2.M21 - matrix1.M21) * amount;
    result.M22 = matrix1.M22 + (matrix2.M22 - matrix1.M22) * amount;
    result.M23 = matrix1.M23 + (matrix2.M23 - matrix1.M23) * amount;
    result.M24 = matrix1.M24 + (matrix2.M24 - matrix1.M24) * amount;
    result.M31 = matrix1.M31 + (matrix2.M31 - matrix1.M31) * amount;
    result.M32 = matrix1.M32 + (matrix2.M32 - matrix1.M32) * amount;
    result.M33 = matrix1.M33 + (matrix2.M33 - matrix1.M33) * amount;
    result.M34 = matrix1.M34 + (matrix2.M34 - matrix1.M34) * amount;
    result.M41 = matrix1.M41 + (matrix2.M41 - matrix1.M41) * amount;
    result.M42 = matrix1.M42 + (matrix2.M42 - matrix1.M42) * amount;
    result.M43 = matrix1.M43 + (matrix2.M43 - matrix1.M43) * amount;
    result.M44 = matrix1.M44 + (matrix2.M44 - matrix1.M44) * amount;
    return result;
  }

  /**
   * 将一个矩阵乘以另一个矩阵。
   * @static
   * @param {Matrix} matrix1 源矩阵。
   * @param {Matrix} matrix2 源矩阵。
   * @returns {Matrix}
   */
  static Multiply(matrix1: Matrix, matrix2: Matrix) {
    const result = new Matrix();
    const m11 =
      matrix1.M11 * matrix2.M11 +
      matrix1.M12 * matrix2.M21 +
      matrix1.M13 * matrix2.M31 +
      matrix1.M14 * matrix2.M41;
    const m12 =
      matrix1.M11 * matrix2.M12 +
      matrix1.M12 * matrix2.M22 +
      matrix1.M13 * matrix2.M32 +
      matrix1.M14 * matrix2.M42;
    const m13 =
      matrix1.M11 * matrix2.M13 +
      matrix1.M12 * matrix2.M23 +
      matrix1.M13 * matrix2.M33 +
      matrix1.M14 * matrix2.M43;
    const m14 =
      matrix1.M11 * matrix2.M14 +
      matrix1.M12 * matrix2.M24 +
      matrix1.M13 * matrix2.M34 +
      matrix1.M14 * matrix2.M44;
    const m21 =
      matrix1.M21 * matrix2.M11 +
      matrix1.M22 * matrix2.M21 +
      matrix1.M23 * matrix2.M31 +
      matrix1.M24 * matrix2.M41;
    const m22 =
      matrix1.M21 * matrix2.M12 +
      matrix1.M22 * matrix2.M22 +
      matrix1.M23 * matrix2.M32 +
      matrix1.M24 * matrix2.M42;
    const m23 =
      matrix1.M21 * matrix2.M13 +
      matrix1.M22 * matrix2.M23 +
      matrix1.M23 * matrix2.M33 +
      matrix1.M24 * matrix2.M43;
    const m24 =
      matrix1.M21 * matrix2.M14 +
      matrix1.M22 * matrix2.M24 +
      matrix1.M23 * matrix2.M34 +
      matrix1.M24 * matrix2.M44;
    const m31 =
      matrix1.M31 * matrix2.M11 +
      matrix1.M32 * matrix2.M21 +
      matrix1.M33 * matrix2.M31 +
      matrix1.M34 * matrix2.M41;
    const m32 =
      matrix1.M31 * matrix2.M12 +
      matrix1.M32 * matrix2.M22 +
      matrix1.M33 * matrix2.M32 +
      matrix1.M34 * matrix2.M42;
    const m33 =
      matrix1.M31 * matrix2.M13 +
      matrix1.M32 * matrix2.M23 +
      matrix1.M33 * matrix2.M33 +
      matrix1.M34 * matrix2.M43;
    const m34 =
      matrix1.M31 * matrix2.M14 +
      matrix1.M32 * matrix2.M24 +
      matrix1.M33 * matrix2.M34 +
      matrix1.M34 * matrix2.M44;
    const m41 =
      matrix1.M41 * matrix2.M11 +
      matrix1.M42 * matrix2.M21 +
      matrix1.M43 * matrix2.M31 +
      matrix1.M44 * matrix2.M41;
    const m42 =
      matrix1.M41 * matrix2.M12 +
      matrix1.M42 * matrix2.M22 +
      matrix1.M43 * matrix2.M32 +
      matrix1.M44 * matrix2.M42;
    const m43 =
      matrix1.M41 * matrix2.M13 +
      matrix1.M42 * matrix2.M23 +
      matrix1.M43 * matrix2.M33 +
      matrix1.M44 * matrix2.M43;
    const m44 =
      matrix1.M41 * matrix2.M14 +
      matrix1.M42 * matrix2.M24 +
      matrix1.M43 * matrix2.M34 +
      matrix1.M44 * matrix2.M44;
    result.M11 = m11;
    result.M12 = m12;
    result.M13 = m13;
    result.M14 = m14;
    result.M21 = m21;
    result.M22 = m22;
    result.M23 = m23;
    result.M24 = m24;
    result.M31 = m31;
    result.M32 = m32;
    result.M33 = m33;
    result.M34 = m34;
    result.M41 = m41;
    result.M42 = m42;
    result.M43 = m43;
    result.M44 = m44;
    return result;
  }

  /**
   * Multiply two matrices
   * @param other defines the second operand
   * @returns a new matrix set with the multiplication result of the current Matrix and the given one
   */
  public multiply(other: Matrix): this {
    this.multiplyToRef(other, this);
    return this;
  }
  /**
   * Sets the given matrix "result" with the multiplication result of the current Matrix and the given one
   * @param this defines the second operand
   * @param other defines the matrix where to store the multiplication
   * @returns result input
   */
  public multiplyToRef(other: Matrix, result: Matrix) {
    const m11 =
      this.M11 * other.M11 +
      this.M12 * other.M21 +
      this.M13 * other.M31 +
      this.M14 * other.M41;
    const m12 =
      this.M11 * other.M12 +
      this.M12 * other.M22 +
      this.M13 * other.M32 +
      this.M14 * other.M42;
    const m13 =
      this.M11 * other.M13 +
      this.M12 * other.M23 +
      this.M13 * other.M33 +
      this.M14 * other.M43;
    const m14 =
      this.M11 * other.M14 +
      this.M12 * other.M24 +
      this.M13 * other.M34 +
      this.M14 * other.M44;
    const m21 =
      this.M21 * other.M11 +
      this.M22 * other.M21 +
      this.M23 * other.M31 +
      this.M24 * other.M41;
    const m22 =
      this.M21 * other.M12 +
      this.M22 * other.M22 +
      this.M23 * other.M32 +
      this.M24 * other.M42;
    const m23 =
      this.M21 * other.M13 +
      this.M22 * other.M23 +
      this.M23 * other.M33 +
      this.M24 * other.M43;
    const m24 =
      this.M21 * other.M14 +
      this.M22 * other.M24 +
      this.M23 * other.M34 +
      this.M24 * other.M44;
    const m31 =
      this.M31 * other.M11 +
      this.M32 * other.M21 +
      this.M33 * other.M31 +
      this.M34 * other.M41;
    const m32 =
      this.M31 * other.M12 +
      this.M32 * other.M22 +
      this.M33 * other.M32 +
      this.M34 * other.M42;
    const m33 =
      this.M31 * other.M13 +
      this.M32 * other.M23 +
      this.M33 * other.M33 +
      this.M34 * other.M43;
    const m34 =
      this.M31 * other.M14 +
      this.M32 * other.M24 +
      this.M33 * other.M34 +
      this.M34 * other.M44;
    const m41 =
      this.M41 * other.M11 +
      this.M42 * other.M21 +
      this.M43 * other.M31 +
      this.M44 * other.M41;
    const m42 =
      this.M41 * other.M12 +
      this.M42 * other.M22 +
      this.M43 * other.M32 +
      this.M44 * other.M42;
    const m43 =
      this.M41 * other.M13 +
      this.M42 * other.M23 +
      this.M43 * other.M33 +
      this.M44 * other.M43;
    const m44 =
      this.M41 * other.M14 +
      this.M42 * other.M24 +
      this.M43 * other.M34 +
      this.M44 * other.M44;

    result.M11 = m11;
    result.M12 = m12;
    result.M13 = m13;
    result.M14 = m14;
    result.M21 = m21;
    result.M22 = m22;
    result.M23 = m23;
    result.M24 = m24;
    result.M31 = m31;
    result.M32 = m32;
    result.M33 = m33;
    result.M34 = m34;
    result.M41 = m41;
    result.M42 = m42;
    result.M43 = m43;
    result.M44 = m44;

    return other;
  }

  /**
   * 对矩阵的单个元素求反。
   * @static
   * @param {Matrix} matrix 源矩阵。
   * @returns {Matrix}
   */
  static Negate(matrix: Matrix) {
    const result = new Matrix();
    result.M11 = -matrix.M11;
    result.M12 = -matrix.M12;
    result.M13 = -matrix.M13;
    result.M14 = -matrix.M14;
    result.M21 = -matrix.M21;
    result.M22 = -matrix.M22;
    result.M23 = -matrix.M23;
    result.M24 = -matrix.M24;
    result.M31 = -matrix.M31;
    result.M32 = -matrix.M32;
    result.M33 = -matrix.M33;
    result.M34 = -matrix.M34;
    result.M41 = -matrix.M41;
    result.M42 = -matrix.M42;
    result.M43 = -matrix.M43;
    result.M44 = -matrix.M44;
    return result;
  }

  /**
   * 减去矩阵。
   * @static
   * @param {Matrix} matrix1 源矩阵。
   * @param {Matrix} matrix2 源矩阵。
   * @returns {Matrix}
   */
  static Subtract(matrix1: Matrix, matrix2: Matrix) {
    const result = new Matrix();
    result.M11 = matrix1.M11 - matrix2.M11;
    result.M12 = matrix1.M12 - matrix2.M12;
    result.M13 = matrix1.M13 - matrix2.M13;
    result.M14 = matrix1.M14 - matrix2.M14;
    result.M21 = matrix1.M21 - matrix2.M21;
    result.M22 = matrix1.M22 - matrix2.M22;
    result.M23 = matrix1.M23 - matrix2.M23;
    result.M24 = matrix1.M24 - matrix2.M24;
    result.M31 = matrix1.M31 - matrix2.M31;
    result.M32 = matrix1.M32 - matrix2.M32;
    result.M33 = matrix1.M33 - matrix2.M33;
    result.M34 = matrix1.M34 - matrix2.M34;
    result.M41 = matrix1.M41 - matrix2.M41;
    result.M42 = matrix1.M42 - matrix2.M42;
    result.M43 = matrix1.M43 - matrix2.M43;
    result.M44 = matrix1.M44 - matrix2.M44;
    return result;
  }

  ToString() {
    return (
      '{M11:' +
      this.M11 +
      ' M12:' +
      this.M12 +
      ' M13:' +
      this.M13 +
      ' M14:' +
      this.M14 +
      '} ' +
      '{M21:' +
      this.M21 +
      ' M22:' +
      this.M22 +
      ' M23:' +
      this.M23 +
      ' M24:' +
      this.M24 +
      '} ' +
      '{M31:' +
      this.M31 +
      ' M32:' +
      this.M32 +
      ' M33:' +
      this.M33 +
      ' M34:' +
      this.M34 +
      '} ' +
      '{M41:' +
      this.M41 +
      ' M42:' +
      this.M42 +
      ' M43:' +
      this.M43 +
      ' M44:' +
      this.M44 +
      '}'
    );
  }

  /**
   * 通过应用 Quaternion 旋转变换 Matrix。
   * @static
   * @param {Matrix} value 要变换的 Matrix。
   * @param {Quaternion} rotation 要应用的旋转,表达为 Quaternion。
   * @returns {Matrix}
   */
  static Transform(value: Matrix, rotation: Quaternion) {
    const x2 = rotation.X + rotation.X;
    const y2 = rotation.Y + rotation.Y;
    const z2 = rotation.Z + rotation.Z;

    const wx2 = rotation.W * x2;
    const wy2 = rotation.W * y2;
    const wz2 = rotation.W * z2;
    const xx2 = rotation.X * x2;
    const xy2 = rotation.X * y2;
    const xz2 = rotation.X * z2;
    const yy2 = rotation.Y * y2;
    const yz2 = rotation.Y * z2;
    const zz2 = rotation.Z * z2;

    const q11 = 1.0 - yy2 - zz2;
    const q21 = xy2 - wz2;
    const q31 = xz2 + wy2;

    const q12 = xy2 + wz2;
    const q22 = 1.0 - xx2 - zz2;
    const q32 = yz2 - wx2;

    const q13 = xz2 - wy2;
    const q23 = yz2 + wx2;
    const q33 = 1.0 - xx2 - yy2;

    const result = new Matrix();

    result.M11 = value.M11 * q11 + value.M12 * q21 + value.M13 * q31;
    result.M12 = value.M11 * q12 + value.M12 * q22 + value.M13 * q32;
    result.M13 = value.M11 * q13 + value.M12 * q23 + value.M13 * q33;
    result.M14 = value.M14;
    result.M21 = value.M21 * q11 + value.M22 * q21 + value.M23 * q31;
    result.M22 = value.M21 * q12 + value.M22 * q22 + value.M23 * q32;
    result.M23 = value.M21 * q13 + value.M22 * q23 + value.M23 * q33;
    result.M24 = value.M24;
    result.M31 = value.M31 * q11 + value.M32 * q21 + value.M33 * q31;
    result.M32 = value.M31 * q12 + value.M32 * q22 + value.M33 * q32;
    result.M33 = value.M31 * q13 + value.M32 * q23 + value.M33 * q33;
    result.M34 = value.M34;
    result.M41 = value.M41 * q11 + value.M42 * q21 + value.M43 * q31;
    result.M42 = value.M41 * q12 + value.M42 * q22 + value.M43 * q32;
    result.M43 = value.M41 * q13 + value.M42 * q23 + value.M43 * q33;
    result.M44 = value.M44;
    return result;
  }

  /**
   * 转置矩阵的行和列。
   * @static
   * @param {Matrix} matrix 源矩阵。
   * @returns {Matrix}
   */
  static Transpose(matrix: Matrix) {
    const result = new Matrix();

    result.M11 = matrix.M11;
    result.M12 = matrix.M21;
    result.M13 = matrix.M31;
    result.M14 = matrix.M41;

    result.M21 = matrix.M12;
    result.M22 = matrix.M22;
    result.M23 = matrix.M32;
    result.M24 = matrix.M42;

    result.M31 = matrix.M13;
    result.M32 = matrix.M23;
    result.M33 = matrix.M33;
    result.M34 = matrix.M43;

    result.M41 = matrix.M14;
    result.M42 = matrix.M24;
    result.M43 = matrix.M34;
    result.M44 = matrix.M44;

    return result;
  }

  /**
   * Project a Vector3 onto screen space to reference
   * Example Playground https://playground.babylonjs.com/#R1F8YU#102
   * @param vector defines the Vector3 to project
   * @param world defines the world matrix to use
   * @param transform defines the transform (view x projection) matrix to use
   * @param viewport defines the screen viewport to use
   * @param result the vector in which the screen space will be stored
   * @returns result input
   */
  public static ProjectToRef(
    vector: Vector3,
    world: Matrix,
    transform: Matrix,
    viewport: Viewport,
    result: Vector3
  ) {
    const cw = viewport.width;
    const ch = viewport.height;
    const cx = viewport.x;
    const cy = viewport.y;

    const viewportMatrix = MathTmp.Matrix[1];

    Matrix.FromValuesToRef(
      cw / 2.0,
      0,
      0,
      0,
      0,
      -ch / 2.0,
      0,
      0,
      0,
      0,
      0.5,
      0,
      cx + cw / 2.0,
      ch / 2.0 + cy,
      0.5,
      1,
      viewportMatrix
    );

    const matrix = MathTmp.Matrix[0];
    world.multiplyToRef(transform, matrix);
    matrix.multiplyToRef(viewportMatrix, matrix);

    Vector3.TransformCoordinatesToRef(vector, matrix, result);
    return result;
  }
}

/**
 * @internal
 * Same as Tmp but not exported to keep it only for math functions to avoid conflicts
 */
export class MathTmp {
  public static Vector3 = ArrayTools.BuildTuple(11, () => Vector3.Zero);
  public static Matrix = ArrayTools.BuildTuple(2, () => Matrix.Identity);
  public static Quaternion = ArrayTools.BuildTuple(3, () => Quaternion.Zero);
}
