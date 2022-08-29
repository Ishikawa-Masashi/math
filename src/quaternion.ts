/* eslint-disable @typescript-eslint/naming-convention */
// import { Scalar } from "./math.scalar";
import { Epsilon } from './constants';
import { withinEpsilon } from './scalar';
// import type { Viewport } from "./math.viewport";
import type { DeepImmutable, Nullable, FloatArray, float } from './types';
// import { ArrayTools } from "../Misc/arrayTools";
// import type { IPlaneLike } from "./math.like";
// import { RegisterClass } from "../Misc/typeStore";
// import type { Plane } from "./math.plane";
// import { PerformanceConfigurator } from "../Engines/performanceConfigurator";
// import { EngineStore } from "../Engines/engineStore";

// type TransformNode = import("../Meshes/transformNode").TransformNode;

// eslint-disable-next-line @typescript-eslint/naming-convention
const _ExtractAsInt = (value: number) => {
  return parseInt(value.toString().replace(/\W/g, ''));
};

/**
 * Class used to store quaternion data
 * @see https://en.wikipedia.org/wiki/Quaternion
 * @see https://doc.babylonjs.com/features/position,_rotation,_scaling
 */
export class Quaternion {
  /** @hidden */
  public _x: number;

  /** @hidden */
  public _y: number;

  /** @hidden */
  public _z: number;

  /** @hidden */
  public _w: number;

  /** @hidden */
  public _isDirty = true;

  /** Gets or sets the x coordinate */
  public get x() {
    return this._x;
  }

  public set x(value: number) {
    this._x = value;
    this._isDirty = true;
  }

  /** Gets or sets the y coordinate */
  public get y() {
    return this._y;
  }

  public set y(value: number) {
    this._y = value;
    this._isDirty = true;
  }

  /** Gets or sets the z coordinate */
  public get z() {
    return this._z;
  }

  public set z(value: number) {
    this._z = value;
    this._isDirty = true;
  }

  /** Gets or sets the w coordinate */
  public get w() {
    return this._w;
  }

  public set w(value: number) {
    this._w = value;
    this._isDirty = true;
  }

  /**
   * Creates a new Quaternion from the given floats
   * @param x defines the first component (0 by default)
   * @param y defines the second component (0 by default)
   * @param z defines the third component (0 by default)
   * @param w defines the fourth component (1.0 by default)
   */
  constructor(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }

  /**
   * Gets a string representation for the current quaternion
   * @returns a string with the Quaternion coordinates
   */
  public toString(): string {
    return `{X: ${this._x} Y: ${this._y} Z: ${this._z} W: ${this._w}}`;
  }

  /**
   * Gets the class name of the quaternion
   * @returns the string "Quaternion"
   */
  public getClassName(): string {
    return 'Quaternion';
  }

  /**
   * Gets a hash code for this quaternion
   * @returns the quaternion hash code
   */
  public getHashCode(): number {
    const x = _ExtractAsInt(this._x);
    const y = _ExtractAsInt(this._y);
    const z = _ExtractAsInt(this._z);
    const w = _ExtractAsInt(this._w);

    let hash = x;
    hash = (hash * 397) ^ y;
    hash = (hash * 397) ^ z;
    hash = (hash * 397) ^ w;
    return hash;
  }

  /**
   * Copy the quaternion to an array
   * @returns a new array populated with 4 elements from the quaternion coordinates
   */
  public asArray(): number[] {
    return [this._x, this._y, this._z, this._w];
  }

  /**
   * Stores from the starting index in the given array the Quaternion successive values
   * @param array defines the array where to store the x,y,z,w components
   * @param index defines an optional index in the target array to define where to start storing values
   * @returns the current Quaternion object
   */
  public toArray(array: FloatArray, index = 0): Quaternion {
    array[index] = this.x;
    array[index + 1] = this.y;
    array[index + 2] = this.z;
    array[index + 3] = this.w;
    return this;
  }

  /**
   * Check if two quaternions are equals
   * @param otherQuaternion defines the second operand
   * @return true if the current quaternion and the given one coordinates are strictly equals
   */
  public equals(otherQuaternion: DeepImmutable<Quaternion>): boolean {
    return (
      otherQuaternion &&
      this._x === otherQuaternion._x &&
      this._y === otherQuaternion._y &&
      this._z === otherQuaternion._z &&
      this._w === otherQuaternion._w
    );
  }

  /**
   * Gets a boolean if two quaternions are equals (using an epsilon value)
   * @param otherQuaternion defines the other quaternion
   * @param epsilon defines the minimal distance to consider equality
   * @returns true if the given quaternion coordinates are close to the current ones by a distance of epsilon.
   */
  public equalsWithEpsilon(
    otherQuaternion: DeepImmutable<Quaternion>,
    epsilon: number = Epsilon
  ): boolean {
    return (
      otherQuaternion &&
      withinEpsilon(this._x, otherQuaternion._x, epsilon) &&
      withinEpsilon(this._y, otherQuaternion._y, epsilon) &&
      withinEpsilon(this._z, otherQuaternion._z, epsilon) &&
      withinEpsilon(this._w, otherQuaternion._w, epsilon)
    );
  }

  /**
   * Clone the current quaternion
   * @returns a new quaternion copied from the current one
   */
  public clone(): Quaternion {
    return new Quaternion(this._x, this._y, this._z, this._w);
  }

  /**
   * Copy a quaternion to the current one
   * @param other defines the other quaternion
   * @returns the updated current quaternion
   */
  public copyFrom(other: DeepImmutable<Quaternion>): Quaternion {
    this.x = other._x;
    this.y = other._y;
    this.z = other._z;
    this.w = other._w;
    return this;
  }

  /**
   * Updates the current quaternion with the given float coordinates
   * @param x defines the x coordinate
   * @param y defines the y coordinate
   * @param z defines the z coordinate
   * @param w defines the w coordinate
   * @returns the updated current quaternion
   */
  public copyFromFloats(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  //     /**
  //      * Updates the current quaternion from the given float coordinates
  //      * @param x defines the x coordinate
  //      * @param y defines the y coordinate
  //      * @param z defines the z coordinate
  //      * @param w defines the w coordinate
  //      * @returns the updated current quaternion
  //      */
  //     public set(x: number, y: number, z: number, w: number): Quaternion {
  //         return this.copyFromFloats(x, y, z, w);
  //     }

  /**
   * Adds two quaternions
   * @param other defines the second operand
   * @returns a new quaternion as the addition result of the given one and the current quaternion
   */
  public add(other: DeepImmutable<Quaternion>): Quaternion {
    return new Quaternion(
      this._x + other._x,
      this._y + other._y,
      this._z + other._z,
      this._w + other._w
    );
  }

  /**
   * Add a quaternion to the current one
   * @param other defines the quaternion to add
   * @returns the current quaternion
   */
  public addInPlace(other: DeepImmutable<Quaternion>): Quaternion {
    this._x += other._x;
    this._y += other._y;
    this._z += other._z;
    this._w += other._w;
    return this;
  }

  //     /**
  //      * Subtract two quaternions
  //      * @param other defines the second operand
  //      * @returns a new quaternion as the subtraction result of the given one from the current one
  //      */
  //     public subtract(other: Quaternion): Quaternion {
  //         return new Quaternion(this._x - other._x, this._y - other._y, this._z - other._z, this._w - other._w);
  //     }

  //     /**
  //      * Subtract a quaternion to the current one
  //      * @param other defines the quaternion to subtract
  //      * @returns the current quaternion
  //      */
  //     public subtractInPlace(other: DeepImmutable<Quaternion>): Quaternion {
  //         this._x -= other._x;
  //         this._y -= other._y;
  //         this._z -= other._z;
  //         this._w -= other._w;
  //         return this;
  //     }

  //     /**
  //      * Multiplies the current quaternion by a scale factor
  //      * @param value defines the scale factor
  //      * @returns a new quaternion set by multiplying the current quaternion coordinates by the float "scale"
  //      */
  //     public scale(value: number): Quaternion {
  //         return new Quaternion(this._x * value, this._y * value, this._z * value, this._w * value);
  //     }

  //     /**
  //      * Scale the current quaternion values by a factor and stores the result to a given quaternion
  //      * @param scale defines the scale factor
  //      * @param result defines the Quaternion object where to store the result
  //      * @returns the unmodified current quaternion
  //      */
  //     public scaleToRef(scale: number, result: Quaternion): Quaternion {
  //         result.x = this._x * scale;
  //         result.y = this._y * scale;
  //         result.z = this._z * scale;
  //         result.w = this._w * scale;
  //         return this;
  //     }

  //     /**
  //      * Multiplies in place the current quaternion by a scale factor
  //      * @param value defines the scale factor
  //      * @returns the current modified quaternion
  //      */
  //     public scaleInPlace(value: number): Quaternion {
  //         this.x *= value;
  //         this.y *= value;
  //         this.z *= value;
  //         this.w *= value;

  //         return this;
  //     }

  //     /**
  //      * Scale the current quaternion values by a factor and add the result to a given quaternion
  //      * @param scale defines the scale factor
  //      * @param result defines the Quaternion object where to store the result
  //      * @returns the unmodified current quaternion
  //      */
  //     public scaleAndAddToRef(scale: number, result: Quaternion): Quaternion {
  //         result.x += this._x * scale;
  //         result.y += this._y * scale;
  //         result.z += this._z * scale;
  //         result.w += this._w * scale;
  //         return this;
  //     }

  //     /**
  //      * Multiplies two quaternions
  //      * @param q1 defines the second operand
  //      * @returns a new quaternion set as the multiplication result of the current one with the given one "q1"
  //      */
  //     public multiply(q1: DeepImmutable<Quaternion>): Quaternion {
  //         const result = new Quaternion(0, 0, 0, 1.0);
  //         this.multiplyToRef(q1, result);
  //         return result;
  //     }

  //     /**
  //      * Sets the given "result" as the the multiplication result of the current one with the given one "q1"
  //      * @param q1 defines the second operand
  //      * @param result defines the target quaternion
  //      * @returns the current quaternion
  //      */
  //     public multiplyToRef(q1: DeepImmutable<Quaternion>, result: Quaternion): Quaternion {
  //         const x = this._x * q1._w + this._y * q1._z - this._z * q1._y + this._w * q1._x;
  //         const y = -this._x * q1._z + this._y * q1._w + this._z * q1._x + this._w * q1._y;
  //         const z = this._x * q1._y - this._y * q1._x + this._z * q1._w + this._w * q1._z;
  //         const w = -this._x * q1._x - this._y * q1._y - this._z * q1._z + this._w * q1._w;
  //         result.copyFromFloats(x, y, z, w);
  //         return this;
  //     }

  //     /**
  //      * Updates the current quaternion with the multiplication of itself with the given one "q1"
  //      * @param q1 defines the second operand
  //      * @returns the currentupdated quaternion
  //      */
  //     public multiplyInPlace(q1: DeepImmutable<Quaternion>): Quaternion {
  //         this.multiplyToRef(q1, this);
  //         return this;
  //     }

  //     /**
  //      * Conjugates (1-q) the current quaternion and stores the result in the given quaternion
  //      * @param ref defines the target quaternion
  //      * @returns the current quaternion
  //      */
  //     public conjugateToRef(ref: Quaternion): Quaternion {
  //         ref.copyFromFloats(-this._x, -this._y, -this._z, this._w);
  //         return this;
  //     }

  //     /**
  //      * Conjugates in place (1-q) the current quaternion
  //      * @returns the current updated quaternion
  //      */
  //     public conjugateInPlace(): Quaternion {
  //         this.x *= -1;
  //         this.y *= -1;
  //         this.z *= -1;
  //         return this;
  //     }

  //     /**
  //      * Conjugates in place (1-q) the current quaternion
  //      * @returns a new quaternion
  //      */
  //     public conjugate(): Quaternion {
  //         return new Quaternion(-this._x, -this._y, -this._z, this._w);
  //     }

  //     /**
  //      * Returns the inverse of the current quaternion
  //      * @returns a new quaternion
  //      */
  //     public invert(): Quaternion {
  //         const conjugate = this.conjugate();
  //         const lengthSquared = this.lengthSquared();
  //         if (lengthSquared == 0 || lengthSquared == 1) {
  //             return conjugate;
  //         }
  //         conjugate.scaleInPlace(1 / lengthSquared);
  //         return conjugate;
  //     }

  //     /**
  //      * Invert in place the current quaternion
  //      * @returns this quaternion
  //      */
  //     public invertInPlace(): Quaternion {
  //         this.conjugateInPlace();
  //         const lengthSquared = this.lengthSquared();
  //         if (lengthSquared == 0 || lengthSquared == 1) {
  //             return this;
  //         }
  //         this.scaleInPlace(1 / lengthSquared);
  //         return this;
  //     }

  //     /**
  //      * Gets squared length of current quaternion
  //      * @returns the quaternion length (float)
  //      */
  //     public lengthSquared(): number {
  //         return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  //     }

  //     /**
  //      * Gets length of current quaternion
  //      * @returns the quaternion length (float)
  //      */
  //     public length(): number {
  //         return Math.sqrt(this.lengthSquared());
  //     }

  //     /**
  //      * Normalize in place the current quaternion
  //      * @returns the current updated quaternion
  //      */
  //     public normalize(): Quaternion {
  //         const len = this.length();
  //         if (len === 0) {
  //             return this;
  //         }

  //         const inv = 1.0 / len;
  //         this.scaleInPlace(inv);
  //         return this;
  //     }

  //     /**
  //      * Normalize a copy of the current quaternion
  //      * @returns the normalized quaternion
  //      */
  //     public normalizeToNew(): Quaternion {
  //         const len = this.length();
  //         if (len === 0) {
  //             return this.clone();
  //         }

  //         const inv = 1.0 / len;
  //         return this.scale(inv);
  //     }

  //     /**
  //      * Returns a new Vector3 set with the Euler angles translated from the current quaternion
  //      * @returns a new Vector3 containing the Euler angles
  //      * @see https://doc.babylonjs.com/divingDeeper/mesh/transforms/center_origin/rotation_conventions
  //      */
  //     public toEulerAngles(): Vector3 {
  //         const result = Vector3.Zero();
  //         this.toEulerAnglesToRef(result);
  //         return result;
  //     }

  //     /**
  //      * Sets the given vector3 "result" with the Euler angles translated from the current quaternion
  //      * @param result defines the vector which will be filled with the Euler angles
  //      * @returns the current unchanged quaternion
  //      * @see https://doc.babylonjs.com/divingDeeper/mesh/transforms/center_origin/rotation_conventions
  //      */
  //     public toEulerAnglesToRef(result: Vector3): Quaternion {
  //         const qz = this._z;
  //         const qx = this._x;
  //         const qy = this._y;
  //         const qw = this._w;

  //         const zAxisY = qy * qz - qx * qw;
  //         const limit = 0.4999999;

  //         if (zAxisY < -limit) {
  //             result.y = 2 * Math.atan2(qy, qw);
  //             result.x = Math.PI / 2;
  //             result.z = 0;
  //         } else if (zAxisY > limit) {
  //             result.y = 2 * Math.atan2(qy, qw);
  //             result.x = -Math.PI / 2;
  //             result.z = 0;
  //         } else {
  //             const sqw = qw * qw;
  //             const sqz = qz * qz;
  //             const sqx = qx * qx;
  //             const sqy = qy * qy;
  //             result.z = Math.atan2(2.0 * (qx * qy + qz * qw), -sqz - sqx + sqy + sqw);
  //             result.x = Math.asin(-2.0 * zAxisY);
  //             result.y = Math.atan2(2.0 * (qz * qx + qy * qw), sqz - sqx - sqy + sqw);
  //         }

  //         return this;
  //     }

  //     /**
  //      * Updates the given rotation matrix with the current quaternion values
  //      * @param result defines the target matrix
  //      * @returns the current unchanged quaternion
  //      */
  //     public toRotationMatrix(result: Matrix): Quaternion {
  //         Matrix.FromQuaternionToRef(this, result);
  //         return this;
  //     }

  //     /**
  //      * Updates the current quaternion from the given rotation matrix values
  //      * @param matrix defines the source matrix
  //      * @returns the current updated quaternion
  //      */
  //     public fromRotationMatrix(matrix: DeepImmutable<Matrix>): Quaternion {
  //         Quaternion.FromRotationMatrixToRef(matrix, this);
  //         return this;
  //     }

  //     // Statics

  //     /**
  //      * Creates a new quaternion from a rotation matrix
  //      * @param matrix defines the source matrix
  //      * @returns a new quaternion created from the given rotation matrix values
  //      */
  //     public static FromRotationMatrix(matrix: DeepImmutable<Matrix>): Quaternion {
  //         const result = new Quaternion();
  //         Quaternion.FromRotationMatrixToRef(matrix, result);
  //         return result;
  //     }

  //     /**
  //      * Updates the given quaternion with the given rotation matrix values
  //      * @param matrix defines the source matrix
  //      * @param result defines the target quaternion
  //      */
  //     public static FromRotationMatrixToRef(matrix: DeepImmutable<Matrix>, result: Quaternion): void {
  //         const data = matrix.m;
  //         const m11 = data[0],
  //             m12 = data[4],
  //             m13 = data[8];
  //         const m21 = data[1],
  //             m22 = data[5],
  //             m23 = data[9];
  //         const m31 = data[2],
  //             m32 = data[6],
  //             m33 = data[10];
  //         const trace = m11 + m22 + m33;
  //         let s;

  //         if (trace > 0) {
  //             s = 0.5 / Math.sqrt(trace + 1.0);

  //             result.w = 0.25 / s;
  //             result.x = (m32 - m23) * s;
  //             result.y = (m13 - m31) * s;
  //             result.z = (m21 - m12) * s;
  //         } else if (m11 > m22 && m11 > m33) {
  //             s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

  //             result.w = (m32 - m23) / s;
  //             result.x = 0.25 * s;
  //             result.y = (m12 + m21) / s;
  //             result.z = (m13 + m31) / s;
  //         } else if (m22 > m33) {
  //             s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

  //             result.w = (m13 - m31) / s;
  //             result.x = (m12 + m21) / s;
  //             result.y = 0.25 * s;
  //             result.z = (m23 + m32) / s;
  //         } else {
  //             s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

  //             result.w = (m21 - m12) / s;
  //             result.x = (m13 + m31) / s;
  //             result.y = (m23 + m32) / s;
  //             result.z = 0.25 * s;
  //         }
  //     }

  /**
   * Returns the dot product (float) between the quaternions "left" and "right"
   * @param left defines the left operand
   * @param right defines the right operand
   * @returns the dot product
   */
  public static dot(
    left: DeepImmutable<Quaternion>,
    right: DeepImmutable<Quaternion>
  ): number {
    return (
      left._x * right._x +
      left._y * right._y +
      left._z * right._z +
      left._w * right._w
    );
  }

  //     /**
  //      * Checks if the two quaternions are close to each other
  //      * @param quat0 defines the first quaternion to check
  //      * @param quat1 defines the second quaternion to check
  //      * @returns true if the two quaternions are close to each other
  //      */
  //     public static AreClose(quat0: DeepImmutable<Quaternion>, quat1: DeepImmutable<Quaternion>): boolean {
  //         const dot = Quaternion.Dot(quat0, quat1);

  //         return dot >= 0;
  //     }

  //     /**
  //      * Smooth interpolation between two quaternions using Slerp
  //      *
  //      * @param source source quaternion
  //      * @param goal goal quaternion
  //      * @param deltaTime current interpolation frame
  //      * @param lerpTime total interpolation time
  //      * @param result the smoothed quaternion
  //      */
  //     public static SmoothToRef(source: Quaternion, goal: Quaternion, deltaTime: number, lerpTime: number, result: Quaternion) {
  //         let slerp = lerpTime === 0 ? 1 : deltaTime / lerpTime;
  //         slerp = Scalar.Clamp(slerp, 0, 1);

  //         Quaternion.SlerpToRef(source, goal, slerp, result);
  //     }

  //     /**
  //      * Creates an empty quaternion
  //      * @returns a new quaternion set to (0.0, 0.0, 0.0)
  //      */
  //     public static Zero(): Quaternion {
  //         return new Quaternion(0.0, 0.0, 0.0, 0.0);
  //     }

  //     /**
  //      * Inverse a given quaternion
  //      * @param q defines the source quaternion
  //      * @returns a new quaternion as the inverted current quaternion
  //      */
  //     public static Inverse(q: DeepImmutable<Quaternion>): Quaternion {
  //         return new Quaternion(-q._x, -q._y, -q._z, q._w);
  //     }

  //     /**
  //      * Inverse a given quaternion
  //      * @param q defines the source quaternion
  //      * @param result the quaternion the result will be stored in
  //      * @returns the result quaternion
  //      */
  //     public static InverseToRef(q: Quaternion, result: Quaternion): Quaternion {
  //         result.set(-q._x, -q._y, -q._z, q._w);
  //         return result;
  //     }

  //     /**
  //      * Creates an identity quaternion
  //      * @returns the identity quaternion
  //      */
  //     public static Identity(): Quaternion {
  //         return new Quaternion(0.0, 0.0, 0.0, 1.0);
  //     }

  //     /**
  //      * Gets a boolean indicating if the given quaternion is identity
  //      * @param quaternion defines the quaternion to check
  //      * @returns true if the quaternion is identity
  //      */
  //     public static IsIdentity(quaternion: DeepImmutable<Quaternion>): boolean {
  //         return quaternion && quaternion._x === 0 && quaternion._y === 0 && quaternion._z === 0 && quaternion._w === 1;
  //     }

  //     /**
  //      * Creates a quaternion from a rotation around an axis
  //      * @param axis defines the axis to use
  //      * @param angle defines the angle to use
  //      * @returns a new quaternion created from the given axis (Vector3) and angle in radians (float)
  //      */
  //     public static RotationAxis(axis: DeepImmutable<Vector3>, angle: number): Quaternion {
  //         return Quaternion.RotationAxisToRef(axis, angle, new Quaternion());
  //     }

  //     /**
  //      * Creates a rotation around an axis and stores it into the given quaternion
  //      * @param axis defines the axis to use
  //      * @param angle defines the angle to use
  //      * @param result defines the target quaternion
  //      * @returns the target quaternion
  //      */
  //     public static RotationAxisToRef(axis: DeepImmutable<Vector3>, angle: number, result: Quaternion): Quaternion {
  //         const sin = Math.sin(angle / 2);
  //         axis.normalize();
  //         result.w = Math.cos(angle / 2);
  //         result.x = axis._x * sin;
  //         result.y = axis._y * sin;
  //         result.z = axis._z * sin;
  //         return result;
  //     }

  //     /**
  //      * Creates a new quaternion from data stored into an array
  //      * @param array defines the data source
  //      * @param offset defines the offset in the source array where the data starts
  //      * @returns a new quaternion
  //      */
  //     public static FromArray(array: DeepImmutable<ArrayLike<number>>, offset?: number): Quaternion {
  //         if (!offset) {
  //             offset = 0;
  //         }
  //         return new Quaternion(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);
  //     }

  //     /**
  //      * Updates the given quaternion "result" from the starting index of the given array.
  //      * @param array the array to pull values from
  //      * @param offset the offset into the array to start at
  //      * @param result the quaternion to store the result in
  //      */
  //     public static FromArrayToRef(array: DeepImmutable<ArrayLike<number>>, offset: number, result: Quaternion): void {
  //         result.x = array[offset];
  //         result.y = array[offset + 1];
  //         result.z = array[offset + 2];
  //         result.w = array[offset + 3];
  //     }

  //     /**
  //      * Create a quaternion from Euler rotation angles
  //      * @param x Pitch
  //      * @param y Yaw
  //      * @param z Roll
  //      * @returns the new Quaternion
  //      */
  //     public static FromEulerAngles(x: number, y: number, z: number): Quaternion {
  //         const q = new Quaternion();
  //         Quaternion.RotationYawPitchRollToRef(y, x, z, q);
  //         return q;
  //     }

  //     /**
  //      * Updates a quaternion from Euler rotation angles
  //      * @param x Pitch
  //      * @param y Yaw
  //      * @param z Roll
  //      * @param result the quaternion to store the result
  //      * @returns the updated quaternion
  //      */
  //     public static FromEulerAnglesToRef(x: number, y: number, z: number, result: Quaternion): Quaternion {
  //         Quaternion.RotationYawPitchRollToRef(y, x, z, result);
  //         return result;
  //     }

  //     /**
  //      * Create a quaternion from Euler rotation vector
  //      * @param vec the Euler vector (x Pitch, y Yaw, z Roll)
  //      * @returns the new Quaternion
  //      */
  //     public static FromEulerVector(vec: DeepImmutable<Vector3>): Quaternion {
  //         const q = new Quaternion();
  //         Quaternion.RotationYawPitchRollToRef(vec._y, vec._x, vec._z, q);
  //         return q;
  //     }

  //     /**
  //      * Updates a quaternion from Euler rotation vector
  //      * @param vec the Euler vector (x Pitch, y Yaw, z Roll)
  //      * @param result the quaternion to store the result
  //      * @returns the updated quaternion
  //      */
  //     public static FromEulerVectorToRef(vec: DeepImmutable<Vector3>, result: Quaternion): Quaternion {
  //         Quaternion.RotationYawPitchRollToRef(vec._y, vec._x, vec._z, result);
  //         return result;
  //     }

  //     /**
  //      * Updates a quaternion so that it rotates vector vecFrom to vector vecTo
  //      * @param vecFrom defines the direction vector from which to rotate
  //      * @param vecTo defines the direction vector to which to rotate
  //      * @param result the quaternion to store the result
  //      * @returns the updated quaternion
  //      */
  //     public static FromUnitVectorsToRef(vecFrom: DeepImmutable<Vector3>, vecTo: DeepImmutable<Vector3>, result: Quaternion): Quaternion {
  //         const r = Vector3.Dot(vecFrom, vecTo) + 1;

  //         if (r < Epsilon) {
  //             if (Math.abs(vecFrom.x) > Math.abs(vecFrom.z)) {
  //                 result.set(-vecFrom.y, vecFrom.x, 0, 0);
  //             } else {
  //                 result.set(0, -vecFrom.z, vecFrom.y, 0);
  //             }
  //         } else {
  //             Vector3.CrossToRef(vecFrom, vecTo, TmpVectors.Vector3[0]);
  //             result.set(TmpVectors.Vector3[0].x, TmpVectors.Vector3[0].y, TmpVectors.Vector3[0].z, r);
  //         }

  //         return result.normalize();
  //     }

  //     /**
  //      * Creates a new quaternion from the given Euler float angles (y, x, z)
  //      * @param yaw defines the rotation around Y axis
  //      * @param pitch defines the rotation around X axis
  //      * @param roll defines the rotation around Z axis
  //      * @returns the new quaternion
  //      */
  //     public static RotationYawPitchRoll(yaw: number, pitch: number, roll: number): Quaternion {
  //         const q = new Quaternion();
  //         Quaternion.RotationYawPitchRollToRef(yaw, pitch, roll, q);
  //         return q;
  //     }

  //     /**
  //      * Creates a new rotation from the given Euler float angles (y, x, z) and stores it in the target quaternion
  //      * @param yaw defines the rotation around Y axis
  //      * @param pitch defines the rotation around X axis
  //      * @param roll defines the rotation around Z axis
  //      * @param result defines the target quaternion
  //      */
  //     public static RotationYawPitchRollToRef(yaw: number, pitch: number, roll: number, result: Quaternion): void {
  //         // Produces a quaternion from Euler angles in the z-y-x orientation (Tait-Bryan angles)
  //         const halfRoll = roll * 0.5;
  //         const halfPitch = pitch * 0.5;
  //         const halfYaw = yaw * 0.5;

  //         const sinRoll = Math.sin(halfRoll);
  //         const cosRoll = Math.cos(halfRoll);
  //         const sinPitch = Math.sin(halfPitch);
  //         const cosPitch = Math.cos(halfPitch);
  //         const sinYaw = Math.sin(halfYaw);
  //         const cosYaw = Math.cos(halfYaw);

  //         result.x = cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll;
  //         result.y = sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll;
  //         result.z = cosYaw * cosPitch * sinRoll - sinYaw * sinPitch * cosRoll;
  //         result.w = cosYaw * cosPitch * cosRoll + sinYaw * sinPitch * sinRoll;
  //     }

  //     /**
  //      * Creates a new quaternion from the given Euler float angles expressed in z-x-z orientation
  //      * @param alpha defines the rotation around first axis
  //      * @param beta defines the rotation around second axis
  //      * @param gamma defines the rotation around third axis
  //      * @returns the new quaternion
  //      */
  //     public static RotationAlphaBetaGamma(alpha: number, beta: number, gamma: number): Quaternion {
  //         const result = new Quaternion();
  //         Quaternion.RotationAlphaBetaGammaToRef(alpha, beta, gamma, result);
  //         return result;
  //     }

  //     /**
  //      * Creates a new quaternion from the given Euler float angles expressed in z-x-z orientation and stores it in the target quaternion
  //      * @param alpha defines the rotation around first axis
  //      * @param beta defines the rotation around second axis
  //      * @param gamma defines the rotation around third axis
  //      * @param result defines the target quaternion
  //      */
  //     public static RotationAlphaBetaGammaToRef(alpha: number, beta: number, gamma: number, result: Quaternion): void {
  //         // Produces a quaternion from Euler angles in the z-x-z orientation
  //         const halfGammaPlusAlpha = (gamma + alpha) * 0.5;
  //         const halfGammaMinusAlpha = (gamma - alpha) * 0.5;
  //         const halfBeta = beta * 0.5;

  //         result.x = Math.cos(halfGammaMinusAlpha) * Math.sin(halfBeta);
  //         result.y = Math.sin(halfGammaMinusAlpha) * Math.sin(halfBeta);
  //         result.z = Math.sin(halfGammaPlusAlpha) * Math.cos(halfBeta);
  //         result.w = Math.cos(halfGammaPlusAlpha) * Math.cos(halfBeta);
  //     }

  //     /**
  //      * Creates a new quaternion containing the rotation value to reach the target (axis1, axis2, axis3) orientation as a rotated XYZ system (axis1, axis2 and axis3 are normalized during this operation)
  //      * @param axis1 defines the first axis
  //      * @param axis2 defines the second axis
  //      * @param axis3 defines the third axis
  //      * @returns the new quaternion
  //      */
  //     public static RotationQuaternionFromAxis(axis1: DeepImmutable<Vector3>, axis2: DeepImmutable<Vector3>, axis3: DeepImmutable<Vector3>): Quaternion {
  //         const quat = new Quaternion(0.0, 0.0, 0.0, 0.0);
  //         Quaternion.RotationQuaternionFromAxisToRef(axis1, axis2, axis3, quat);
  //         return quat;
  //     }

  //     /**
  //      * Creates a rotation value to reach the target (axis1, axis2, axis3) orientation as a rotated XYZ system (axis1, axis2 and axis3 are normalized during this operation) and stores it in the target quaternion
  //      * @param axis1 defines the first axis
  //      * @param axis2 defines the second axis
  //      * @param axis3 defines the third axis
  //      * @param ref defines the target quaternion
  //      */
  //     public static RotationQuaternionFromAxisToRef(axis1: DeepImmutable<Vector3>, axis2: DeepImmutable<Vector3>, axis3: DeepImmutable<Vector3>, ref: Quaternion): void {
  //         const rotMat = MathTmp.Matrix[0];
  //         Matrix.FromXYZAxesToRef(axis1.normalize(), axis2.normalize(), axis3.normalize(), rotMat);
  //         Quaternion.FromRotationMatrixToRef(rotMat, ref);
  //     }

  //     /**
  //      * Creates a new rotation value to orient an object to look towards the given forward direction, the up direction being oriented like "up".
  //      * This function works in left handed mode
  //      * @param forward defines the forward direction - Must be normalized and orthogonal to up.
  //      * @param up defines the up vector for the entity - Must be normalized and orthogonal to forward.
  //      * @returns A new quaternion oriented toward the specified forward and up.
  //      */
  //     public static FromLookDirectionLH(forward: DeepImmutable<Vector3>, up: DeepImmutable<Vector3>): Quaternion {
  //         const quat = new Quaternion();
  //         Quaternion.FromLookDirectionLHToRef(forward, up, quat);
  //         return quat;
  //     }

  //     /**
  //      * Creates a new rotation value to orient an object to look towards the given forward direction with the up direction being oriented like "up", and stores it in the target quaternion.
  //      * This function works in left handed mode
  //      * @param forward defines the forward direction - Must be normalized and orthogonal to up.
  //      * @param up defines the up vector for the entity - Must be normalized and orthogonal to forward.
  //      * @param ref defines the target quaternion.
  //      */
  //     public static FromLookDirectionLHToRef(forward: DeepImmutable<Vector3>, up: DeepImmutable<Vector3>, ref: Quaternion): void {
  //         const rotMat = MathTmp.Matrix[0];
  //         Matrix.LookDirectionLHToRef(forward, up, rotMat);
  //         Quaternion.FromRotationMatrixToRef(rotMat, ref);
  //     }

  //     /**
  //      * Creates a new rotation value to orient an object to look towards the given forward direction, the up direction being oriented like "up".
  //      * This function works in right handed mode
  //      * @param forward defines the forward direction - Must be normalized and orthogonal to up.
  //      * @param up defines the up vector for the entity - Must be normalized and orthogonal to forward.
  //      * @returns A new quaternion oriented toward the specified forward and up.
  //      */
  //     public static FromLookDirectionRH(forward: DeepImmutable<Vector3>, up: DeepImmutable<Vector3>): Quaternion {
  //         const quat = new Quaternion();
  //         Quaternion.FromLookDirectionRHToRef(forward, up, quat);
  //         return quat;
  //     }

  //     /**
  //      * Creates a new rotation value to orient an object to look towards the given forward direction with the up direction being oriented like "up", and stores it in the target quaternion.
  //      * This function works in right handed mode
  //      * @param forward defines the forward direction - Must be normalized and orthogonal to up.
  //      * @param up defines the up vector for the entity - Must be normalized and orthogonal to forward.
  //      * @param ref defines the target quaternion.
  //      */
  //     public static FromLookDirectionRHToRef(forward: DeepImmutable<Vector3>, up: DeepImmutable<Vector3>, ref: Quaternion): void {
  //         const rotMat = MathTmp.Matrix[0];
  //         Matrix.LookDirectionRHToRef(forward, up, rotMat);
  //         return Quaternion.FromRotationMatrixToRef(rotMat, ref);
  //     }

  //     /**
  //      * Interpolates between two quaternions
  //      * @param left defines first quaternion
  //      * @param right defines second quaternion
  //      * @param amount defines the gradient to use
  //      * @returns the new interpolated quaternion
  //      */
  //     public static Slerp(left: DeepImmutable<Quaternion>, right: DeepImmutable<Quaternion>, amount: number): Quaternion {
  //         const result = Quaternion.Identity();

  //         Quaternion.SlerpToRef(left, right, amount, result);

  //         return result;
  //     }

  //     /**
  //      * Interpolates between two quaternions and stores it into a target quaternion
  //      * @param left defines first quaternion
  //      * @param right defines second quaternion
  //      * @param amount defines the gradient to use
  //      * @param result defines the target quaternion
  //      */
  //     public static SlerpToRef(left: DeepImmutable<Quaternion>, right: DeepImmutable<Quaternion>, amount: number, result: Quaternion): void {
  //         let num2;
  //         let num3;
  //         let num4 = left._x * right._x + left._y * right._y + left._z * right._z + left._w * right._w;
  //         let flag = false;

  //         if (num4 < 0) {
  //             flag = true;
  //             num4 = -num4;
  //         }

  //         if (num4 > 0.999999) {
  //             num3 = 1 - amount;
  //             num2 = flag ? -amount : amount;
  //         } else {
  //             const num5 = Math.acos(num4);
  //             const num6 = 1.0 / Math.sin(num5);
  //             num3 = Math.sin((1.0 - amount) * num5) * num6;
  //             num2 = flag ? -Math.sin(amount * num5) * num6 : Math.sin(amount * num5) * num6;
  //         }

  //         result.x = num3 * left._x + num2 * right._x;
  //         result.y = num3 * left._y + num2 * right._y;
  //         result.z = num3 * left._z + num2 * right._z;
  //         result.w = num3 * left._w + num2 * right._w;
  //     }

  //     /**
  //      * Interpolate between two quaternions using Hermite interpolation
  //      * @param value1 defines first quaternion
  //      * @param tangent1 defines the incoming tangent
  //      * @param value2 defines second quaternion
  //      * @param tangent2 defines the outgoing tangent
  //      * @param amount defines the target quaternion
  //      * @returns the new interpolated quaternion
  //      */
  //     public static Hermite(
  //         value1: DeepImmutable<Quaternion>,
  //         tangent1: DeepImmutable<Quaternion>,
  //         value2: DeepImmutable<Quaternion>,
  //         tangent2: DeepImmutable<Quaternion>,
  //         amount: number
  //     ): Quaternion {
  //         const squared = amount * amount;
  //         const cubed = amount * squared;
  //         const part1 = 2.0 * cubed - 3.0 * squared + 1.0;
  //         const part2 = -2.0 * cubed + 3.0 * squared;
  //         const part3 = cubed - 2.0 * squared + amount;
  //         const part4 = cubed - squared;

  //         const x = value1._x * part1 + value2._x * part2 + tangent1._x * part3 + tangent2._x * part4;
  //         const y = value1._y * part1 + value2._y * part2 + tangent1._y * part3 + tangent2._y * part4;
  //         const z = value1._z * part1 + value2._z * part2 + tangent1._z * part3 + tangent2._z * part4;
  //         const w = value1._w * part1 + value2._w * part2 + tangent1._w * part3 + tangent2._w * part4;
  //         return new Quaternion(x, y, z, w);
  //     }

  //     /**
  //      * Returns a new Quaternion which is the 1st derivative of the Hermite spline defined by the quaternions "value1", "value2", "tangent1", "tangent2".
  //      * @param value1 defines the first control point
  //      * @param tangent1 defines the first tangent
  //      * @param value2 defines the second control point
  //      * @param tangent2 defines the second tangent
  //      * @param time define where the derivative must be done
  //      * @returns 1st derivative
  //      */
  //     public static Hermite1stDerivative(
  //         value1: DeepImmutable<Quaternion>,
  //         tangent1: DeepImmutable<Quaternion>,
  //         value2: DeepImmutable<Quaternion>,
  //         tangent2: DeepImmutable<Quaternion>,
  //         time: number
  //     ): Quaternion {
  //         const result = Quaternion.Zero();

  //         this.Hermite1stDerivativeToRef(value1, tangent1, value2, tangent2, time, result);

  //         return result;
  //     }

  //     /**
  //      * Update a Quaternion with the 1st derivative of the Hermite spline defined by the quaternions "value1", "value2", "tangent1", "tangent2".
  //      * @param value1 defines the first control point
  //      * @param tangent1 defines the first tangent
  //      * @param value2 defines the second control point
  //      * @param tangent2 defines the second tangent
  //      * @param time define where the derivative must be done
  //      * @param result define where to store the derivative
  //      */
  //     public static Hermite1stDerivativeToRef(
  //         value1: DeepImmutable<Quaternion>,
  //         tangent1: DeepImmutable<Quaternion>,
  //         value2: DeepImmutable<Quaternion>,
  //         tangent2: DeepImmutable<Quaternion>,
  //         time: number,
  //         result: Quaternion
  //     ) {
  //         const t2 = time * time;

  //         result.x = (t2 - time) * 6 * value1.x + (3 * t2 - 4 * time + 1) * tangent1.x + (-t2 + time) * 6 * value2.x + (3 * t2 - 2 * time) * tangent2.x;
  //         result.y = (t2 - time) * 6 * value1.y + (3 * t2 - 4 * time + 1) * tangent1.y + (-t2 + time) * 6 * value2.y + (3 * t2 - 2 * time) * tangent2.y;
  //         result.z = (t2 - time) * 6 * value1.z + (3 * t2 - 4 * time + 1) * tangent1.z + (-t2 + time) * 6 * value2.z + (3 * t2 - 2 * time) * tangent2.z;
  //         result.w = (t2 - time) * 6 * value1.w + (3 * t2 - 4 * time + 1) * tangent1.w + (-t2 + time) * 6 * value2.w + (3 * t2 - 2 * time) * tangent2.w;
  //     }
}
