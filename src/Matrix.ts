import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';
import { Plane } from './Plane';
import { Viewport } from './viewport';
import { ArrayTools } from './arrayTools';
import { ReadonlyMatrixLike } from './like';
import { Epsilon } from './constants';
// import { MathTmp } from './mathTmp';

export class Matrix {
  /**
   * 初始化新的 Matrix 实例。
   * @constructs
   * @param {number} m11 M11 的初始化值。
   * @param {number} m12 M12 的初始化值。
   * @param {number} m13 M13 的初始化值。
   * @param {number} m14 M14 的初始化值。
   * @param {number} m21 M21 的初始化值。
   * @param {number} m22 M22 的初始化值。
   * @param {number} m23 M23 的初始化值。
   * @param {number} m24 M24 的初始化值。
   * @param {number} m31 M31 的初始化值。
   * @param {number} m32 M32 的初始化值。
   * @param {number} m33 M33 的初始化值。
   * @param {number} m34 M34 的初始化值。
   * @param {number} m41 M41 的初始化值。
   * @param {number} m42 M42 的初始化值。
   * @param {number} m43 M43 的初始化值。
   * @param {number} m44 M44 的初始化值。
   * @returns {Matrix}
   */
  constructor(
    public m11 = 0,
    public m12 = 0,
    public m13 = 0,
    public m14 = 0,
    public m21 = 0,
    public m22 = 0,
    public m23 = 0,
    public m24 = 0,
    public m31 = 0,
    public m32 = 0,
    public m33 = 0,
    public m34 = 0,
    public m41 = 0,
    public m42 = 0,
    public m43 = 0,
    public m44 = 0
  ) {}

  /**
   * 获取 Matrix 的后向矢量。
   * @returns {Vector3}
   */
  get Backward() {
    return new Vector3(this.m31, this.m32, this.m33);
  }

  /**
   * 设置 Matrix 的后向矢量。
   * @param {Vector3} value 值。
   */
  set Backward(value: Vector3) {
    this.m31 = value.x;
    this.m32 = value.y;
    this.m33 = value.z;
  }

  /**
   * 获取 Matrix 的向下矢量。
   * @returns {Vector3}
   */
  get Down() {
    return new Vector3(-this.m21, -this.m22, -this.m23);
  }

  /**
   * 设置 Matrix 的向下矢量。
   * @param {Vector3} value 值。
   */
  set Down(value: Vector3) {
    this.m21 = -value.x;
    this.m22 = -value.y;
    this.m23 = -value.z;
  }

  /**
   * 获取 Matrix 的向前矢量。
   * @returns {Vector3}
   */
  get Forward() {
    return new Vector3(-this.m31, -this.m32, -this.m33);
  }

  /**
   * 设置 Matrix 的向前矢量。
   * @param {Vector3} value 值。
   */
  set Forward(value: Vector3) {
    this.m31 = -value.x;
    this.m32 = -value.y;
    this.m33 = -value.z;
  }

  /**
   * 获取 Matrix 的向左矢量。
   * @returns {Vector3}
   */
  get Left() {
    return new Vector3(-this.m11, -this.m12, -this.m13);
  }

  /**
   * 设置 Matrix 的向左矢量。
   * @param {Vector3} value 值。
   */
  set Left(value: Vector3) {
    this.m11 = -value.x;
    this.m12 = -value.y;
    this.m13 = -value.z;
  }

  /**
   * 获取 Matrix 的向右矢量。
   * @returns {Vector3}
   */
  get Right() {
    return new Vector3(this.m11, this.m12, this.m13);
  }

  /**
   * 设置 Matrix 的向右矢量。
   * @param {Vector3} value 值。
   */
  set Right(value: Vector3) {
    this.m11 = value.x;
    this.m12 = value.y;
    this.m13 = value.z;
  }

  /**
   * 获取 Matrix 的向上矢量。
   * @returns {Vector3}
   */
  get Up() {
    return new Vector3(this.m21, this.m22, this.m23);
  }

  /**
   * 设置 Matrix 的向上矢量。
   * @param {Vector3} value 值。
   */
  set Up(value: Vector3) {
    this.m21 = value.x;
    this.m22 = value.y;
    this.m23 = value.z;
  }

  /**
   * [非XNA4.0标准]获取 Matrix 的缩放矢量。
   * @returns {Vector3}
   */
  get Scale() {
    return new Vector3(this.m11, this.m22, this.m33);
  }

  /**
   * [非XNA4.0标准]设置 Matrix 的缩放矢量。
   * @param {Vector3} value 值。
   */
  set Scale(value: Vector3) {
    this.m11 = value.x;
    this.m22 = value.y;
    this.m33 = value.z;
  }

  /**
   * 获取 Matrix 的平移矢量。
   * @returns {Vector3}
   */
  get Translation() {
    return new Vector3(this.m41, this.m42, this.m43);
  }

  /**
   * 设置 Matrix 的平移矢量。
   * @param {Vector3} value 值。
   */
  set Translation(value: Vector3) {
    this.m41 = value.x;
    this.m42 = value.y;
    this.m43 = value.z;
  }

  static get Identity() {
    return new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  /**
   * Check if the current matrix is identity
   * @returns true is the matrix is the identity matrix
   */
  public isIdentity(): boolean {
    return (
      this.m11 === 1.0 &&
      this.m12 === 0.0 &&
      this.m13 === 0.0 &&
      this.m14 === 0.0 &&
      this.m21 === 0.0 &&
      this.m22 === 1.0 &&
      this.m23 === 0.0 &&
      this.m24 === 0.0 &&
      this.m31 === 0.0 &&
      this.m32 === 0.0 &&
      this.m33 === 1.0 &&
      this.m34 === 0.0 &&
      this.m41 === 0.0 &&
      this.m42 === 0.0 &&
      this.m43 === 0.0 &&
      this.m44 === 1.0
    );
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
    result.m11 = initialM11;
    result.m12 = initialM12;
    result.m13 = initialM13;
    result.m14 = initialM14;

    result.m21 = initialM21;
    result.m22 = initialM22;
    result.m23 = initialM23;
    result.m24 = initialM24;

    result.m31 = initialM31;
    result.m32 = initialM32;
    result.m33 = initialM33;
    result.m34 = initialM34;

    result.m41 = initialM41;
    result.m42 = initialM42;
    result.m43 = initialM43;
    result.m44 = initialM44;
  }

  /**
   * Creates new matrix from a list of values (16)
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
   * @returns the new matrix
   */
  public static FromValues(
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
    initialM44: number
  ): Matrix {
    const result = new Matrix();

    result.m11 = initialM11;
    result.m12 = initialM12;
    result.m13 = initialM13;
    result.m14 = initialM14;
    result.m21 = initialM21;
    result.m22 = initialM22;
    result.m23 = initialM23;
    result.m24 = initialM24;
    result.m31 = initialM31;
    result.m32 = initialM32;
    result.m33 = initialM33;
    result.m34 = initialM34;
    result.m41 = initialM41;
    result.m42 = initialM42;
    result.m43 = initialM43;
    result.m44 = initialM44;

    return result;
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

    matrix.m11 = matrix1.m11 + matrix2.m11;
    matrix.m12 = matrix1.m12 + matrix2.m12;
    matrix.m13 = matrix1.m13 + matrix2.m13;
    matrix.m14 = matrix1.m14 + matrix2.m14;

    matrix.m21 = matrix1.m21 + matrix2.m21;
    matrix.m22 = matrix1.m22 + matrix2.m22;
    matrix.m23 = matrix1.m23 + matrix2.m23;
    matrix.m24 = matrix1.m24 + matrix2.m24;

    matrix.m31 = matrix1.m31 + matrix2.m31;
    matrix.m32 = matrix1.m32 + matrix2.m32;
    matrix.m33 = matrix1.m33 + matrix2.m33;
    matrix.m34 = matrix1.m34 + matrix2.m34;

    matrix.m41 = matrix1.m41 + matrix2.m41;
    matrix.m42 = matrix1.m42 + matrix2.m42;
    matrix.m43 = matrix1.m43 + matrix2.m43;
    matrix.m44 = matrix1.m44 + matrix2.m44;
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
    vector.x = objectPosition.x - cameraPosition.x;
    vector.y = objectPosition.y - cameraPosition.y;
    vector.z = objectPosition.z - cameraPosition.z;
    const num = vector.LengthSquared();
    if (num < 0.0001) {
      if (!(cameraForwardVector instanceof Vector3)) {
        vector = Vector3.Forward;
      } else {
        vector.x = -cameraForwardVector.x;
        vector.y = -cameraForwardVector.y;
        vector.z = -cameraForwardVector.z;
      }
    } else {
      vector = Vector3.Multiply(vector, 1 / Math.sqrt(num));
    }
    vector3 = Vector3.Cross(cameraUpVector, vector);
    vector3.Normalize();
    vector2 = Vector3.Cross(vector, vector3);
    result.m11 = vector3.x;
    result.m12 = vector3.y;
    result.m13 = vector3.z;
    result.m14 = 0;
    result.m21 = vector2.x;
    result.m22 = vector2.y;
    result.m23 = vector2.z;
    result.m24 = 0;
    result.m31 = vector.x;
    result.m32 = vector.y;
    result.m33 = vector.z;
    result.m34 = 0;
    result.m41 = objectPosition.x;
    result.m42 = objectPosition.y;
    result.m43 = objectPosition.z;
    result.m44 = 1;
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
    const x = axis.x;
    const y = axis.y;
    const z = axis.z;
    const num2 = Math.sin(angle);
    const num = Math.cos(angle);
    const num11 = x * x;
    const num10 = y * y;
    const num9 = z * z;
    const num8 = x * y;
    const num7 = x * z;
    const num6 = y * z;
    result.m11 = num11 + num * (1 - num11);
    result.m12 = num8 - num * num8 + num2 * z;
    result.m13 = num7 - num * num7 - num2 * y;
    result.m14 = 0;
    result.m21 = num8 - num * num8 - num2 * z;
    result.m22 = num10 + num * (1 - num10);
    result.m23 = num6 - num * num6 + num2 * x;
    result.m24 = 0;
    result.m31 = num7 - num * num7 + num2 * y;
    result.m32 = num6 - num * num6 - num2 * x;
    result.m33 = num9 + num * (1 - num9);
    result.m34 = 0;
    result.m41 = 0;
    result.m42 = 0;
    result.m43 = 0;
    result.m44 = 1;
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
    const num9 = quaternion.x * quaternion.x;
    const num8 = quaternion.y * quaternion.y;
    const num7 = quaternion.z * quaternion.z;
    const num6 = quaternion.x * quaternion.y;
    const num5 = quaternion.z * quaternion.w;
    const num4 = quaternion.z * quaternion.x;
    const num3 = quaternion.y * quaternion.w;
    const num2 = quaternion.y * quaternion.z;
    const num = quaternion.x * quaternion.w;
    result.m11 = 1 - 2 * (num8 + num7);
    result.m12 = 2 * (num6 + num5);
    result.m13 = 2 * (num4 - num3);
    result.m14 = 0;
    result.m21 = 2 * (num6 - num5);
    result.m22 = 1 - 2 * (num7 + num9);
    result.m23 = 2 * (num2 + num);
    result.m24 = 0;
    result.m31 = 2 * (num4 + num3);
    result.m32 = 2 * (num2 - num);
    result.m33 = 1 - 2 * (num8 + num9);
    result.m34 = 0;
    result.m41 = 0;
    result.m42 = 0;
    result.m43 = 0;
    result.m44 = 1;
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
    result.m11 = vector2.x;
    result.m12 = vector3.x;
    result.m13 = vector.x;
    result.m14 = 0;
    result.m21 = vector2.y;
    result.m22 = vector3.y;
    result.m23 = vector.y;
    result.m24 = 0;
    result.m31 = vector2.z;
    result.m32 = vector3.z;
    result.m33 = vector.z;
    result.m34 = 0;
    result.m41 = -Vector3.Dot(vector2, cameraPosition);
    result.m42 = -Vector3.Dot(vector3, cameraPosition);
    result.m43 = -Vector3.Dot(vector, cameraPosition);
    result.m44 = 1;
    return result;
  }

  /**
   * Gets a new rotation matrix used to rotate an entity so as it looks at the target vector3, from the eye vector3 position, the up vector3 being oriented like "up"
   * This function works in right handed mode
   * @param eye defines the final position of the entity
   * @param target defines where the entity should look at
   * @param up defines the up vector for the entity
   * @returns the new matrix
   */
  public static LookAtRH(eye: Vector3, target: Vector3, up: Vector3): Matrix {
    const result = new Matrix();
    Matrix.LookAtRHToRef(eye, target, up, result);
    return result;
  }

  /**
   * Sets the given "result" Matrix to a rotation matrix used to rotate an entity so that it looks at the target vector3, from the eye vector3 position, the up vector3 being oriented like "up".
   * This function works in right handed mode
   * @param eye defines the final position of the entity
   * @param target defines where the entity should look at
   * @param up defines the up vector for the entity
   * @param result defines the target matrix
   * @returns result input
   */
  public static LookAtRHToRef(
    eye: Vector3,
    target: Vector3,
    up: Vector3,
    result: Matrix
  ) {
    const xAxis = MathTmp.Vector3[0];
    const yAxis = MathTmp.Vector3[1];
    const zAxis = MathTmp.Vector3[2];

    // Z axis
    eye.subtractToRef(target, zAxis);
    zAxis.normalize();

    // X axis
    Vector3.CrossToRef(up, zAxis, xAxis);

    const xSquareLength = xAxis.lengthSquared();
    if (xSquareLength === 0) {
      xAxis.x = 1.0;
    } else {
      xAxis.normalizeFromLength(Math.sqrt(xSquareLength));
    }

    // Y axis
    Vector3.CrossToRef(zAxis, xAxis, yAxis);
    yAxis.normalize();

    // Eye angles
    const ex = -Vector3.Dot(xAxis, eye);
    const ey = -Vector3.Dot(yAxis, eye);
    const ez = -Vector3.Dot(zAxis, eye);

    Matrix.FromValuesToRef(
      xAxis.x,
      yAxis.x,
      zAxis.x,
      0.0,
      xAxis.y,
      yAxis.y,
      zAxis.y,
      0.0,
      xAxis.z,
      yAxis.z,
      zAxis.z,
      0.0,
      ex,
      ey,
      ez,
      1.0,
      result
    );
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
    result.m11 = 2 / width;
    result.m12 = result.m13 = result.m14 = 0;
    result.m22 = 2 / height;
    result.m21 = result.m23 = result.m24 = 0;
    result.m33 = 1 / (zNearPlane - zFarPlane);
    result.m31 = result.m32 = result.m34 = 0;
    result.m41 = result.m42 = 0;
    result.m43 = zNearPlane / (zNearPlane - zFarPlane);
    result.m44 = 1;
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
    result.m11 = 2.0 / (right - left);
    result.m12 = 0.0;
    result.m13 = 0.0;
    result.m14 = 0.0;
    result.m21 = 0.0;
    result.m22 = 2.0 / (top - bottom);
    result.m23 = 0.0;
    result.m24 = 0.0;
    result.m31 = 0.0;
    result.m32 = 0.0;
    result.m33 = 1.0 / (zNearPlane - zFarPlane);
    result.m34 = 0.0;
    result.m41 = (left + right) / (left - right);
    result.m42 = (top + bottom) / (bottom - top);
    result.m43 = zNearPlane / (zNearPlane - zFarPlane);
    result.m44 = 1.0;
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

    result.m11 = (2 * nearPlaneDistance) / width;
    result.m12 = result.m13 = result.m14 = 0;
    result.m22 = (2 * nearPlaneDistance) / height;
    result.m21 = result.m23 = result.m24 = 0;
    result.m33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
    result.m31 = result.m32 = 0;
    result.m34 = -1;
    result.m41 = result.m42 = result.m44 = 0;
    result.m43 =
      (nearPlaneDistance * farPlaneDistance) /
      (nearPlaneDistance - farPlaneDistance);
    return result;
  }

  /**
   * Creates a left-handed perspective projection matrix
   * @param width defines the viewport width
   * @param height defines the viewport height
   * @param znear defines the near clip plane
   * @param zfar defines the far clip plane
   * @param halfZRange true to generate NDC coordinates between 0 and 1 instead of -1 and 1 (default: false)
   * @param projectionPlaneTilt optional tilt angle of the projection plane around the X axis (horizontal)
   * @returns a new matrix as a left-handed perspective projection matrix
   */
  public static PerspectiveLH(
    width: number,
    height: number,
    znear: number,
    zfar: number,
    halfZRange?: boolean,
    projectionPlaneTilt = 0
  ): Matrix {
    const matrix = new Matrix();

    const n = znear;
    const f = zfar;

    const a = (2.0 * n) / width;
    const b = (2.0 * n) / height;
    const c = (f + n) / (f - n);
    const d = (-2.0 * f * n) / (f - n);
    const rot = Math.tan(projectionPlaneTilt);

    Matrix.FromValuesToRef(
      a,
      0.0,
      0.0,
      0.0,
      0.0,
      b,
      0.0,
      rot,
      0.0,
      0.0,
      c,
      1.0,
      0.0,
      0.0,
      d,
      0.0,
      matrix
    );

    if (halfZRange) {
      matrix.multiplyToRef(mtxConvertNDCToHalfZRange, matrix);
    }

    return matrix;
  }

  /**
   * Creates a right-handed perspective projection matrix
   * @param fov defines the horizontal field of view
   * @param aspect defines the aspect ratio
   * @param znear defines the near clip plane
   * @param zfar defines the far clip plane. If 0, assume we are in "infinite zfar" mode
   * @param halfZRange true to generate NDC coordinates between 0 and 1 instead of -1 and 1 (default: false)
   * @param projectionPlaneTilt optional tilt angle of the projection plane around the X axis (horizontal)
   * @param reverseDepthBufferMode true to indicate that we are in a reverse depth buffer mode (meaning znear and zfar have been inverted when calling the function)
   * @returns a new matrix as a right-handed perspective projection matrix
   */
  public static PerspectiveFovRH(
    fov: number,
    aspect: number,
    znear: number,
    zfar: number,
    halfZRange?: boolean,
    projectionPlaneTilt = 0,
    reverseDepthBufferMode = false
  ): Matrix {
    const matrix = new Matrix();
    Matrix.PerspectiveFovRHToRef(
      fov,
      aspect,
      znear,
      zfar,
      matrix,
      true,
      halfZRange,
      projectionPlaneTilt,
      reverseDepthBufferMode
    );
    return matrix;
  }

  /**
   * Stores a right-handed perspective projection into a given matrix
   * @param fov defines the horizontal field of view
   * @param aspect defines the aspect ratio
   * @param znear defines the near clip plane
   * @param zfar defines the far clip plane. If 0, assume we are in "infinite zfar" mode
   * @param result defines the target matrix
   * @param isVerticalFovFixed defines it the fov is vertically fixed (default) or horizontally
   * @param halfZRange true to generate NDC coordinates between 0 and 1 instead of -1 and 1 (default: false)
   * @param projectionPlaneTilt optional tilt angle of the projection plane around the X axis (horizontal)
   * @param reverseDepthBufferMode true to indicate that we are in a reverse depth buffer mode (meaning znear and zfar have been inverted when calling the function)
   * @returns result input
   */
  public static PerspectiveFovRHToRef(
    fov: number,
    aspect: number,
    znear: number,
    zfar: number,
    result: Matrix,
    isVerticalFovFixed = true,
    halfZRange?: boolean,
    projectionPlaneTilt = 0,
    reverseDepthBufferMode = false
  ) {
    //alternatively this could be expressed as:
    //    m = PerspectiveFovLHToRef
    //    m[10] *= -1.0;
    //    m[11] *= -1.0;

    const n = znear;
    const f = zfar;

    const t = 1.0 / Math.tan(fov * 0.5);
    const a = isVerticalFovFixed ? t / aspect : t;
    const b = isVerticalFovFixed ? t : t * aspect;
    const c =
      reverseDepthBufferMode && n === 0 ? 1 : f !== 0 ? -(f + n) / (f - n) : -1;
    const d =
      reverseDepthBufferMode && n === 0
        ? 2 * f
        : f !== 0
        ? (-2 * f * n) / (f - n)
        : -2 * n;
    const rot = Math.tan(projectionPlaneTilt);

    Matrix.FromValuesToRef(
      a,
      0.0,
      0.0,
      0.0,
      0.0,
      b,
      0.0,
      rot,
      0.0,
      0.0,
      c,
      -1.0,
      0.0,
      0.0,
      d,
      0.0,
      result
    );

    if (halfZRange) {
      result.multiplyToRef(mtxConvertNDCToHalfZRange, result);
    }

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
    result.m11 = num9;
    result.m12 = result.m13 = result.m14 = 0;
    result.m22 = num;
    result.m21 = result.m23 = result.m24 = 0;
    result.m31 = result.m32 = 0;
    result.m33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
    result.m34 = -1;
    result.m41 = result.m42 = result.m44 = 0;
    result.m43 =
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

    result.m11 = (2 * nearPlaneDistance) / (right - left);
    result.m12 = result.m13 = result.m14 = 0;
    result.m22 = (2 * nearPlaneDistance) / (top - bottom);
    result.m21 = result.m23 = result.m24 = 0;
    result.m31 = (left + right) / (right - left);
    result.m32 = (top + bottom) / (top - bottom);
    result.m33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
    result.m34 = -1;
    result.m43 =
      (nearPlaneDistance * farPlaneDistance) /
      (nearPlaneDistance - farPlaneDistance);
    result.m41 = result.m42 = result.m44 = 0;
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
    const x = plane.Normal.x;
    const y = plane.Normal.y;
    const z = plane.Normal.z;
    const num3 = -2 * x;
    const num2 = -2 * y;
    const num = -2 * z;
    result.m11 = num3 * x + 1;
    result.m12 = num2 * x;
    result.m13 = num * x;
    result.m14 = 0;
    result.m21 = num3 * y;
    result.m22 = num2 * y + 1;
    result.m23 = num * y;
    result.m24 = 0;
    result.m31 = num3 * z;
    result.m32 = num2 * z;
    result.m33 = num * z + 1;
    result.m34 = 0;
    result.m41 = num3 * plane.D;
    result.m42 = num2 * plane.D;
    result.m43 = num * plane.D;
    result.m44 = 1;
    return result;
  }

  /**
   * Creates a new rotation matrix for "angle" radians around the X axis
   * @param angle defines the angle (in radians) to use
   * @returns the new matrix
   */
  static RotationX(angle: number) {
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
   * Creates a new rotation matrix for "angle" radians around the Y axis
   * @param angle defines the angle (in radians) to use
   * @returns the new matrix
   */
  public static RotationY(angle: number): Matrix {
    const result = new Matrix();
    Matrix.RotationYToRef(angle, result);
    return result;
  }

  /**
   * Creates a new rotation matrix for "angle" radians around the Y axis and stores it in a given matrix
   * @param angle defines the angle (in radians) to use
   * @param result defines the target matrix
   * @returns result input
   */
  public static RotationYToRef(angle: number, result: Matrix) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    Matrix.FromValuesToRef(
      c,
      0.0,
      -s,
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      s,
      0.0,
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
   * Creates a new rotation matrix for "angle" radians around the Z axis
   * @param angle defines the angle (in radians) to use
   * @returns the new matrix
   */
  public static RotationZ(angle: number): Matrix {
    const result = new Matrix();
    Matrix.RotationZToRef(angle, result);
    return result;
  }

  /**
   * Creates a new rotation matrix for "angle" radians around the Z axis and stores it in a given matrix
   * @param angle defines the angle (in radians) to use
   * @param result defines the target matrix
   * @returns result input
   */
  public static RotationZToRef(angle: number, result: Matrix) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    Matrix.FromValuesToRef(
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
   * 创建一个缩放 Matrix。
   * @static
   * @param {Number} xScale x 轴上的缩放值。
   * @param {Number} yScale y 轴上的缩放值。
   * @param {Number} zScale z 轴上的缩放值。
   * @returns {Matrix}
   */
  static CreateScale(xScale: number, yScale: number, zScale: number) {
    const result = new Matrix();
    result.m11 = xScale;
    result.m12 = 0;
    result.m13 = 0;
    result.m14 = 0;
    result.m21 = 0;
    result.m22 = yScale;
    result.m23 = 0;
    result.m24 = 0;
    result.m31 = 0;
    result.m32 = 0;
    result.m33 = zScale;
    result.m34 = 0;
    result.m41 = 0;
    result.m42 = 0;
    result.m43 = 0;
    result.m44 = 1;
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
      plane.Normal.x * lightDirection.x +
      plane.Normal.y * lightDirection.y +
      plane.Normal.z * lightDirection.z;
    const x = -plane.Normal.x;
    const y = -plane.Normal.y;
    const z = -plane.Normal.z;
    const d = -plane.D;

    result.m11 = x * lightDirection.x + dot;
    result.m12 = x * lightDirection.y;
    result.m13 = x * lightDirection.z;
    result.m14 = 0;
    result.m21 = y * lightDirection.x;
    result.m22 = y * lightDirection.y + dot;
    result.m23 = y * lightDirection.z;
    result.m24 = 0;
    result.m31 = z * lightDirection.x;
    result.m32 = z * lightDirection.y;
    result.m33 = z * lightDirection.z + dot;
    result.m34 = 0;
    result.m41 = d * lightDirection.x;
    result.m42 = d * lightDirection.y;
    result.m43 = d * lightDirection.z;
    result.m44 = dot;
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
    result.m11 = 1;
    result.m12 = 0;
    result.m13 = 0;
    result.m14 = 0;
    result.m21 = 0;
    result.m22 = 1;
    result.m23 = 0;
    result.m24 = 0;
    result.m31 = 0;
    result.m32 = 0;
    result.m33 = 1;
    result.m34 = 0;
    result.m41 = xPosition;
    result.m42 = yPosition;
    result.m43 = zPosition;
    result.m44 = 1;
    return result;
  }

  /**
   * Creates a translation matrix
   * @param x defines the translation on X axis
   * @param y defines the translation on Y axis
   * @param z defines the translationon Z axis
   * @returns the new matrix
   */
  public static Translation(x: number, y: number, z: number): Matrix {
    const result = new Matrix();
    Matrix.TranslationToRef(x, y, z, result);
    return result;
  }

  /**
   * Creates a translation matrix and stores it in a given matrix
   * @param x defines the translation on X axis
   * @param y defines the translation on Y axis
   * @param z defines the translationon Z axis
   * @param result defines the target matrix
   * @returns result input
   */
  public static TranslationToRef<T extends Matrix>(
    x: number,
    y: number,
    z: number,
    result: T
  ): T {
    Matrix.FromValuesToRef(
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      x,
      y,
      z,
      1.0,
      result
    );
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
    result.m44 = 1;
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
    translation.x = this.m41;
    translation.y = this.m42;
    translation.z = this.m43;

    const xs =
      Math.sign(this.m11 * this.m12 * this.m13 * this.m14) < 0 ? -1 : 1;
    const ys =
      Math.sign(this.m21 * this.m22 * this.m23 * this.m24) < 0 ? -1 : 1;
    const zs =
      Math.sign(this.m31 * this.m32 * this.m33 * this.m34) < 0 ? -1 : 1;

    scale.x =
      xs *
      Math.sqrt(
        this.m11 * this.m11 + this.m12 * this.m12 + this.m13 * this.m13
      );
    scale.y =
      ys *
      Math.sqrt(
        this.m21 * this.m21 + this.m22 * this.m22 + this.m23 * this.m23
      );
    scale.z =
      zs *
      Math.sqrt(
        this.m31 * this.m31 + this.m32 * this.m32 + this.m33 * this.m33
      );

    if (scale.x == 0.0 || scale.y == 0.0 || scale.z == 0.0) {
      const quaternion = Quaternion.Identity;
      rotation.x = quaternion.x;
      rotation.y = quaternion.y;
      rotation.z = quaternion.z;
      rotation.w = quaternion.w;
      return false;
    }

    const m1 = new Matrix(
      this.m11 / scale.x,
      this.m12 / scale.x,
      this.m13 / scale.x,
      0,
      this.m21 / scale.y,
      this.m22 / scale.y,
      this.m23 / scale.y,
      0,
      this.m31 / scale.z,
      this.m32 / scale.z,
      this.m33 / scale.z,
      0,
      0,
      0,
      0,
      1
    );

    const quaternion = Quaternion.CreateFromRotationMatrix(m1);
    rotation.x = quaternion.x;
    rotation.y = quaternion.y;
    rotation.z = quaternion.z;
    rotation.w = quaternion.w;
    return true;
  }

  /**
   * 计算矩阵的决定因子。
   * @returns {Number}
   */
  Determinant() {
    const num22 = this.m11;
    const num21 = this.m12;
    const num20 = this.m13;
    const num19 = this.m14;
    const num12 = this.m21;
    const num11 = this.m22;
    const num10 = this.m23;
    const num9 = this.m24;
    const num8 = this.m31;
    const num7 = this.m32;
    const num6 = this.m33;
    const num5 = this.m34;
    const num4 = this.m41;
    const num3 = this.m42;
    const num2 = this.m43;
    const num = this.m44;
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
    result.m11 = matrix1.m11 * num;
    result.m12 = matrix1.m12 * num;
    result.m13 = matrix1.m13 * num;
    result.m14 = matrix1.m14 * num;
    result.m21 = matrix1.m21 * num;
    result.m22 = matrix1.m22 * num;
    result.m23 = matrix1.m23 * num;
    result.m24 = matrix1.m24 * num;
    result.m31 = matrix1.m31 * num;
    result.m32 = matrix1.m32 * num;
    result.m33 = matrix1.m33 * num;
    result.m34 = matrix1.m34 * num;
    result.m41 = matrix1.m41 * num;
    result.m42 = matrix1.m42 * num;
    result.m43 = matrix1.m43 * num;
    result.m44 = matrix1.m44 * num;
    return result;
  }

  /**
   * 确定指定的 Object 是否等于 Matrix。
   * @param {Matrix} other 用于与当前 Matrix 比较的 Object。
   * @returns {Boolean}
   */
  Equals(other: Matrix) {
    return (
      Math.abs(this.m11 - other.m11) < 1e-6 &&
      Math.abs(this.m22 - other.m22) < 1e-6 &&
      Math.abs(this.m33 - other.m33) < 1e-6 &&
      Math.abs(this.m44 - other.m44) < 1e-6 &&
      Math.abs(this.m12 - other.m12) < 1e-6 &&
      Math.abs(this.m13 - other.m13) < 1e-6 &&
      Math.abs(this.m14 - other.m14) < 1e-6 &&
      Math.abs(this.m21 - other.m21) < 1e-6 &&
      Math.abs(this.m23 - other.m23) < 1e-6 &&
      Math.abs(this.m24 - other.m24) < 1e-6 &&
      Math.abs(this.m31 - other.m31) < 1e-6 &&
      Math.abs(this.m32 - other.m32) < 1e-6 &&
      Math.abs(this.m34 - other.m34) < 1e-6 &&
      Math.abs(this.m41 - other.m41) < 1e-6 &&
      Math.abs(this.m42 - other.m42) < 1e-6 &&
      Math.abs(this.m43 - other.m43) < 1e-6
    );
  }

  /**
   * Check equality between this matrix and a second one
   * @param value defines the second matrix to compare
   * @returns true is the current matrix and the given one values are strictly equal
   */
  public equals(other: ReadonlyMatrixLike): boolean {
    return (
      Math.abs(this.m11 - other.m11) < 1e-6 &&
      Math.abs(this.m22 - other.m22) < 1e-6 &&
      Math.abs(this.m33 - other.m33) < 1e-6 &&
      Math.abs(this.m44 - other.m44) < 1e-6 &&
      Math.abs(this.m12 - other.m12) < 1e-6 &&
      Math.abs(this.m13 - other.m13) < 1e-6 &&
      Math.abs(this.m14 - other.m14) < 1e-6 &&
      Math.abs(this.m21 - other.m21) < 1e-6 &&
      Math.abs(this.m23 - other.m23) < 1e-6 &&
      Math.abs(this.m24 - other.m24) < 1e-6 &&
      Math.abs(this.m31 - other.m31) < 1e-6 &&
      Math.abs(this.m32 - other.m32) < 1e-6 &&
      Math.abs(this.m34 - other.m34) < 1e-6 &&
      Math.abs(this.m41 - other.m41) < 1e-6 &&
      Math.abs(this.m42 - other.m42) < 1e-6 &&
      Math.abs(this.m43 - other.m43) < 1e-6
    );
  }

  public equalsWithEpsilon(
    other: ReadonlyMatrixLike,
    epsilon: number = Epsilon
  ): boolean {
    return (
      Math.abs(this.m11 - other.m11) < epsilon &&
      Math.abs(this.m22 - other.m22) < epsilon &&
      Math.abs(this.m33 - other.m33) < epsilon &&
      Math.abs(this.m44 - other.m44) < epsilon &&
      Math.abs(this.m12 - other.m12) < epsilon &&
      Math.abs(this.m13 - other.m13) < epsilon &&
      Math.abs(this.m14 - other.m14) < epsilon &&
      Math.abs(this.m21 - other.m21) < epsilon &&
      Math.abs(this.m23 - other.m23) < epsilon &&
      Math.abs(this.m24 - other.m24) < epsilon &&
      Math.abs(this.m31 - other.m31) < epsilon &&
      Math.abs(this.m32 - other.m32) < epsilon &&
      Math.abs(this.m34 - other.m34) < epsilon &&
      Math.abs(this.m41 - other.m41) < epsilon &&
      Math.abs(this.m42 - other.m42) < epsilon &&
      Math.abs(this.m43 - other.m43) < epsilon
    );
  }

  GetHashCode() {
    return (
      this.m11 +
      this.m12 +
      this.m13 +
      this.m14 +
      this.m21 +
      this.m22 +
      this.m23 +
      this.m24 +
      this.m31 +
      this.m32 +
      this.m33 +
      this.m34 +
      this.m41 +
      this.m42 +
      this.m43 +
      this.m44
    );
  }

  /**
   * Inverts the current matrix in place
   * @returns the current inverted matrix
   */
  public invert(): this {
    this.invertToRef(this);
    return this;
  }

  /**
   * Sets the given matrix to the current inverted Matrix
   * @param other defines the target matrix
   * @returns result input
   */
  invertToRef(other: Matrix) {
    const num1 = this.m11;
    const num2 = this.m12;
    const num3 = this.m13;
    const num4 = this.m14;
    const num5 = this.m21;
    const num6 = this.m22;
    const num7 = this.m23;
    const num8 = this.m24;
    const num9 = this.m31;
    const num10 = this.m32;
    const num11 = this.m33;
    const num12 = this.m34;
    const num13 = this.m41;
    const num14 = this.m42;
    const num15 = this.m43;
    const num16 = this.m44;
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

    other.m11 = num23 * num27;
    other.m21 = num24 * num27;
    other.m31 = num25 * num27;
    other.m41 = num26 * num27;
    other.m12 = -(num2 * num17 - num3 * num18 + num4 * num19) * num27;
    other.m22 = (num1 * num17 - num3 * num20 + num4 * num21) * num27;
    other.m32 = -(num1 * num18 - num2 * num20 + num4 * num22) * num27;
    other.m42 = (num1 * num19 - num2 * num21 + num3 * num22) * num27;
    const num28 = num7 * num16 - num8 * num15;
    const num29 = num6 * num16 - num8 * num14;
    const num30 = num6 * num15 - num7 * num14;
    const num31 = num5 * num16 - num8 * num13;
    const num32 = num5 * num15 - num7 * num13;
    const num33 = num5 * num14 - num6 * num13;
    other.m13 = (num2 * num28 - num3 * num29 + num4 * num30) * num27;
    other.m23 = -(num1 * num28 - num3 * num31 + num4 * num32) * num27;
    other.m33 = (num1 * num29 - num2 * num31 + num4 * num33) * num27;
    other.m43 = -(num1 * num30 - num2 * num32 + num3 * num33) * num27;
    const num34 = num7 * num12 - num8 * num11;
    const num35 = num6 * num12 - num8 * num10;
    const num36 = num6 * num11 - num7 * num10;
    const num37 = num5 * num12 - num8 * num9;
    const num38 = num5 * num11 - num7 * num9;
    const num39 = num5 * num10 - num6 * num9;
    other.m14 = -(num2 * num34 - num3 * num35 + num4 * num36) * num27;
    other.m24 = (num1 * num34 - num3 * num37 + num4 * num38) * num27;
    other.m34 = -(num1 * num35 - num2 * num37 + num4 * num39) * num27;
    other.m44 = (num1 * num36 - num2 * num38 + num3 * num39) * num27;
    return other;
  }

  /**
   * 计算矩阵的逆矩阵。
   * @static
   * @param {Matrix} matrix 源矩阵。
   * @returns {Matrix}
   */
  static Invert(matrix: Matrix) {
    const result = new Matrix();
    const num1 = matrix.m11;
    const num2 = matrix.m12;
    const num3 = matrix.m13;
    const num4 = matrix.m14;
    const num5 = matrix.m21;
    const num6 = matrix.m22;
    const num7 = matrix.m23;
    const num8 = matrix.m24;
    const num9 = matrix.m31;
    const num10 = matrix.m32;
    const num11 = matrix.m33;
    const num12 = matrix.m34;
    const num13 = matrix.m41;
    const num14 = matrix.m42;
    const num15 = matrix.m43;
    const num16 = matrix.m44;
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

    result.m11 = num23 * num27;
    result.m21 = num24 * num27;
    result.m31 = num25 * num27;
    result.m41 = num26 * num27;
    result.m12 = -(num2 * num17 - num3 * num18 + num4 * num19) * num27;
    result.m22 = (num1 * num17 - num3 * num20 + num4 * num21) * num27;
    result.m32 = -(num1 * num18 - num2 * num20 + num4 * num22) * num27;
    result.m42 = (num1 * num19 - num2 * num21 + num3 * num22) * num27;
    const num28 = num7 * num16 - num8 * num15;
    const num29 = num6 * num16 - num8 * num14;
    const num30 = num6 * num15 - num7 * num14;
    const num31 = num5 * num16 - num8 * num13;
    const num32 = num5 * num15 - num7 * num13;
    const num33 = num5 * num14 - num6 * num13;
    result.m13 = (num2 * num28 - num3 * num29 + num4 * num30) * num27;
    result.m23 = -(num1 * num28 - num3 * num31 + num4 * num32) * num27;
    result.m33 = (num1 * num29 - num2 * num31 + num4 * num33) * num27;
    result.m43 = -(num1 * num30 - num2 * num32 + num3 * num33) * num27;
    const num34 = num7 * num12 - num8 * num11;
    const num35 = num6 * num12 - num8 * num10;
    const num36 = num6 * num11 - num7 * num10;
    const num37 = num5 * num12 - num8 * num9;
    const num38 = num5 * num11 - num7 * num9;
    const num39 = num5 * num10 - num6 * num9;
    result.m14 = -(num2 * num34 - num3 * num35 + num4 * num36) * num27;
    result.m24 = (num1 * num34 - num3 * num37 + num4 * num38) * num27;
    result.m34 = -(num1 * num35 - num2 * num37 + num4 * num39) * num27;
    result.m44 = (num1 * num36 - num2 * num38 + num3 * num39) * num27;
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
    result.m11 = matrix1.m11 + (matrix2.m11 - matrix1.m11) * amount;
    result.m12 = matrix1.m12 + (matrix2.m12 - matrix1.m12) * amount;
    result.m13 = matrix1.m13 + (matrix2.m13 - matrix1.m13) * amount;
    result.m14 = matrix1.m14 + (matrix2.m14 - matrix1.m14) * amount;
    result.m21 = matrix1.m21 + (matrix2.m21 - matrix1.m21) * amount;
    result.m22 = matrix1.m22 + (matrix2.m22 - matrix1.m22) * amount;
    result.m23 = matrix1.m23 + (matrix2.m23 - matrix1.m23) * amount;
    result.m24 = matrix1.m24 + (matrix2.m24 - matrix1.m24) * amount;
    result.m31 = matrix1.m31 + (matrix2.m31 - matrix1.m31) * amount;
    result.m32 = matrix1.m32 + (matrix2.m32 - matrix1.m32) * amount;
    result.m33 = matrix1.m33 + (matrix2.m33 - matrix1.m33) * amount;
    result.m34 = matrix1.m34 + (matrix2.m34 - matrix1.m34) * amount;
    result.m41 = matrix1.m41 + (matrix2.m41 - matrix1.m41) * amount;
    result.m42 = matrix1.m42 + (matrix2.m42 - matrix1.m42) * amount;
    result.m43 = matrix1.m43 + (matrix2.m43 - matrix1.m43) * amount;
    result.m44 = matrix1.m44 + (matrix2.m44 - matrix1.m44) * amount;
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
      matrix1.m11 * matrix2.m11 +
      matrix1.m12 * matrix2.m21 +
      matrix1.m13 * matrix2.m31 +
      matrix1.m14 * matrix2.m41;
    const m12 =
      matrix1.m11 * matrix2.m12 +
      matrix1.m12 * matrix2.m22 +
      matrix1.m13 * matrix2.m32 +
      matrix1.m14 * matrix2.m42;
    const m13 =
      matrix1.m11 * matrix2.m13 +
      matrix1.m12 * matrix2.m23 +
      matrix1.m13 * matrix2.m33 +
      matrix1.m14 * matrix2.m43;
    const m14 =
      matrix1.m11 * matrix2.m14 +
      matrix1.m12 * matrix2.m24 +
      matrix1.m13 * matrix2.m34 +
      matrix1.m14 * matrix2.m44;
    const m21 =
      matrix1.m21 * matrix2.m11 +
      matrix1.m22 * matrix2.m21 +
      matrix1.m23 * matrix2.m31 +
      matrix1.m24 * matrix2.m41;
    const m22 =
      matrix1.m21 * matrix2.m12 +
      matrix1.m22 * matrix2.m22 +
      matrix1.m23 * matrix2.m32 +
      matrix1.m24 * matrix2.m42;
    const m23 =
      matrix1.m21 * matrix2.m13 +
      matrix1.m22 * matrix2.m23 +
      matrix1.m23 * matrix2.m33 +
      matrix1.m24 * matrix2.m43;
    const m24 =
      matrix1.m21 * matrix2.m14 +
      matrix1.m22 * matrix2.m24 +
      matrix1.m23 * matrix2.m34 +
      matrix1.m24 * matrix2.m44;
    const m31 =
      matrix1.m31 * matrix2.m11 +
      matrix1.m32 * matrix2.m21 +
      matrix1.m33 * matrix2.m31 +
      matrix1.m34 * matrix2.m41;
    const m32 =
      matrix1.m31 * matrix2.m12 +
      matrix1.m32 * matrix2.m22 +
      matrix1.m33 * matrix2.m32 +
      matrix1.m34 * matrix2.m42;
    const m33 =
      matrix1.m31 * matrix2.m13 +
      matrix1.m32 * matrix2.m23 +
      matrix1.m33 * matrix2.m33 +
      matrix1.m34 * matrix2.m43;
    const m34 =
      matrix1.m31 * matrix2.m14 +
      matrix1.m32 * matrix2.m24 +
      matrix1.m33 * matrix2.m34 +
      matrix1.m34 * matrix2.m44;
    const m41 =
      matrix1.m41 * matrix2.m11 +
      matrix1.m42 * matrix2.m21 +
      matrix1.m43 * matrix2.m31 +
      matrix1.m44 * matrix2.m41;
    const m42 =
      matrix1.m41 * matrix2.m12 +
      matrix1.m42 * matrix2.m22 +
      matrix1.m43 * matrix2.m32 +
      matrix1.m44 * matrix2.m42;
    const m43 =
      matrix1.m41 * matrix2.m13 +
      matrix1.m42 * matrix2.m23 +
      matrix1.m43 * matrix2.m33 +
      matrix1.m44 * matrix2.m43;
    const m44 =
      matrix1.m41 * matrix2.m14 +
      matrix1.m42 * matrix2.m24 +
      matrix1.m43 * matrix2.m34 +
      matrix1.m44 * matrix2.m44;
    result.m11 = m11;
    result.m12 = m12;
    result.m13 = m13;
    result.m14 = m14;
    result.m21 = m21;
    result.m22 = m22;
    result.m23 = m23;
    result.m24 = m24;
    result.m31 = m31;
    result.m32 = m32;
    result.m33 = m33;
    result.m34 = m34;
    result.m41 = m41;
    result.m42 = m42;
    result.m43 = m43;
    result.m44 = m44;
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
   * Copy the current matrix from the given one
   * @param other defines the source matrix
   * @returns the current updated matrix
   */
  public copyFrom(other: Matrix): this {
    // other.copyToArray(this._m);
    // const o = other as Matrix;
    // this.updateFlag = o.updateFlag;
    // this._updateIdentityStatus(
    //   o._isIdentity,
    //   o._isIdentityDirty,
    //   o._isIdentity3x2,
    //   o._isIdentity3x2Dirty
    // );
    this.m11 = other.m11;
    this.m12 = other.m12;
    this.m13 = other.m13;
    this.m14 = other.m14;

    this.m21 = other.m21;
    this.m22 = other.m22;
    this.m23 = other.m23;
    this.m24 = other.m24;

    this.m31 = other.m31;
    this.m32 = other.m32;
    this.m33 = other.m33;
    this.m34 = other.m34;

    this.m41 = other.m41;
    this.m42 = other.m42;
    this.m43 = other.m43;
    this.m44 = other.m44;

    return this;
  }

  /**
   * Sets the given matrix "result" with the multiplication result of the current Matrix and the given one
   * @param this defines the second operand
   * @param other defines the matrix where to store the multiplication
   * @returns result input
   */
  public multiplyToRef(other: Matrix, result: Matrix) {
    if (this.isIdentity()) {
      result.copyFrom(other);
      return result;
    }
    if (other.isIdentity()) {
      result.copyFrom(this);
      return result;
    }
    const m11 =
      this.m11 * other.m11 +
      this.m12 * other.m21 +
      this.m13 * other.m31 +
      this.m14 * other.m41;
    const m12 =
      this.m11 * other.m12 +
      this.m12 * other.m22 +
      this.m13 * other.m32 +
      this.m14 * other.m42;
    const m13 =
      this.m11 * other.m13 +
      this.m12 * other.m23 +
      this.m13 * other.m33 +
      this.m14 * other.m43;
    const m14 =
      this.m11 * other.m14 +
      this.m12 * other.m24 +
      this.m13 * other.m34 +
      this.m14 * other.m44;
    const m21 =
      this.m21 * other.m11 +
      this.m22 * other.m21 +
      this.m23 * other.m31 +
      this.m24 * other.m41;
    const m22 =
      this.m21 * other.m12 +
      this.m22 * other.m22 +
      this.m23 * other.m32 +
      this.m24 * other.m42;
    const m23 =
      this.m21 * other.m13 +
      this.m22 * other.m23 +
      this.m23 * other.m33 +
      this.m24 * other.m43;
    const m24 =
      this.m21 * other.m14 +
      this.m22 * other.m24 +
      this.m23 * other.m34 +
      this.m24 * other.m44;
    const m31 =
      this.m31 * other.m11 +
      this.m32 * other.m21 +
      this.m33 * other.m31 +
      this.m34 * other.m41;
    const m32 =
      this.m31 * other.m12 +
      this.m32 * other.m22 +
      this.m33 * other.m32 +
      this.m34 * other.m42;
    const m33 =
      this.m31 * other.m13 +
      this.m32 * other.m23 +
      this.m33 * other.m33 +
      this.m34 * other.m43;
    const m34 =
      this.m31 * other.m14 +
      this.m32 * other.m24 +
      this.m33 * other.m34 +
      this.m34 * other.m44;
    const m41 =
      this.m41 * other.m11 +
      this.m42 * other.m21 +
      this.m43 * other.m31 +
      this.m44 * other.m41;
    const m42 =
      this.m41 * other.m12 +
      this.m42 * other.m22 +
      this.m43 * other.m32 +
      this.m44 * other.m42;
    const m43 =
      this.m41 * other.m13 +
      this.m42 * other.m23 +
      this.m43 * other.m33 +
      this.m44 * other.m43;
    const m44 =
      this.m41 * other.m14 +
      this.m42 * other.m24 +
      this.m43 * other.m34 +
      this.m44 * other.m44;

    result.m11 = m11;
    result.m12 = m12;
    result.m13 = m13;
    result.m14 = m14;
    result.m21 = m21;
    result.m22 = m22;
    result.m23 = m23;
    result.m24 = m24;
    result.m31 = m31;
    result.m32 = m32;
    result.m33 = m33;
    result.m34 = m34;
    result.m41 = m41;
    result.m42 = m42;
    result.m43 = m43;
    result.m44 = m44;

    return result;
  }

  /**
   * 对矩阵的单个元素求反。
   * @static
   * @param {Matrix} matrix 源矩阵。
   * @returns {Matrix}
   */
  static Negate(matrix: Matrix) {
    const result = new Matrix();
    result.m11 = -matrix.m11;
    result.m12 = -matrix.m12;
    result.m13 = -matrix.m13;
    result.m14 = -matrix.m14;
    result.m21 = -matrix.m21;
    result.m22 = -matrix.m22;
    result.m23 = -matrix.m23;
    result.m24 = -matrix.m24;
    result.m31 = -matrix.m31;
    result.m32 = -matrix.m32;
    result.m33 = -matrix.m33;
    result.m34 = -matrix.m34;
    result.m41 = -matrix.m41;
    result.m42 = -matrix.m42;
    result.m43 = -matrix.m43;
    result.m44 = -matrix.m44;
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
    result.m11 = matrix1.m11 - matrix2.m11;
    result.m12 = matrix1.m12 - matrix2.m12;
    result.m13 = matrix1.m13 - matrix2.m13;
    result.m14 = matrix1.m14 - matrix2.m14;
    result.m21 = matrix1.m21 - matrix2.m21;
    result.m22 = matrix1.m22 - matrix2.m22;
    result.m23 = matrix1.m23 - matrix2.m23;
    result.m24 = matrix1.m24 - matrix2.m24;
    result.m31 = matrix1.m31 - matrix2.m31;
    result.m32 = matrix1.m32 - matrix2.m32;
    result.m33 = matrix1.m33 - matrix2.m33;
    result.m34 = matrix1.m34 - matrix2.m34;
    result.m41 = matrix1.m41 - matrix2.m41;
    result.m42 = matrix1.m42 - matrix2.m42;
    result.m43 = matrix1.m43 - matrix2.m43;
    result.m44 = matrix1.m44 - matrix2.m44;
    return result;
  }

  ToString() {
    return (
      '{M11:' +
      this.m11 +
      ' M12:' +
      this.m12 +
      ' M13:' +
      this.m13 +
      ' M14:' +
      this.m14 +
      '} ' +
      '{M21:' +
      this.m21 +
      ' M22:' +
      this.m22 +
      ' M23:' +
      this.m23 +
      ' M24:' +
      this.m24 +
      '} ' +
      '{M31:' +
      this.m31 +
      ' M32:' +
      this.m32 +
      ' M33:' +
      this.m33 +
      ' M34:' +
      this.m34 +
      '} ' +
      '{M41:' +
      this.m41 +
      ' M42:' +
      this.m42 +
      ' M43:' +
      this.m43 +
      ' M44:' +
      this.m44 +
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
    const x2 = rotation.x + rotation.x;
    const y2 = rotation.y + rotation.y;
    const z2 = rotation.z + rotation.z;

    const wx2 = rotation.w * x2;
    const wy2 = rotation.w * y2;
    const wz2 = rotation.w * z2;
    const xx2 = rotation.x * x2;
    const xy2 = rotation.x * y2;
    const xz2 = rotation.x * z2;
    const yy2 = rotation.y * y2;
    const yz2 = rotation.y * z2;
    const zz2 = rotation.z * z2;

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

    result.m11 = value.m11 * q11 + value.m12 * q21 + value.m13 * q31;
    result.m12 = value.m11 * q12 + value.m12 * q22 + value.m13 * q32;
    result.m13 = value.m11 * q13 + value.m12 * q23 + value.m13 * q33;
    result.m14 = value.m14;
    result.m21 = value.m21 * q11 + value.m22 * q21 + value.m23 * q31;
    result.m22 = value.m21 * q12 + value.m22 * q22 + value.m23 * q32;
    result.m23 = value.m21 * q13 + value.m22 * q23 + value.m23 * q33;
    result.m24 = value.m24;
    result.m31 = value.m31 * q11 + value.m32 * q21 + value.m33 * q31;
    result.m32 = value.m31 * q12 + value.m32 * q22 + value.m33 * q32;
    result.m33 = value.m31 * q13 + value.m32 * q23 + value.m33 * q33;
    result.m34 = value.m34;
    result.m41 = value.m41 * q11 + value.m42 * q21 + value.m43 * q31;
    result.m42 = value.m41 * q12 + value.m42 * q22 + value.m43 * q32;
    result.m43 = value.m41 * q13 + value.m42 * q23 + value.m43 * q33;
    result.m44 = value.m44;
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

    result.m11 = matrix.m11;
    result.m12 = matrix.m21;
    result.m13 = matrix.m31;
    result.m14 = matrix.m41;

    result.m21 = matrix.m12;
    result.m22 = matrix.m22;
    result.m23 = matrix.m32;
    result.m24 = matrix.m42;

    result.m31 = matrix.m13;
    result.m32 = matrix.m23;
    result.m33 = matrix.m33;
    result.m34 = matrix.m43;

    result.m41 = matrix.m14;
    result.m42 = matrix.m24;
    result.m43 = matrix.m34;
    result.m44 = matrix.m44;

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
class MathTmp {
  public static Vector3 = ArrayTools.BuildTuple(11, () => Vector3.Zero);
  public static Matrix = ArrayTools.BuildTuple(2, () => Matrix.Identity);
  public static Quaternion = ArrayTools.BuildTuple(3, () => Quaternion.Zero);
}

const mtxConvertNDCToHalfZRange = Matrix.FromValues(
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0.5,
  0,
  0,
  0,
  0.5,
  1
);
