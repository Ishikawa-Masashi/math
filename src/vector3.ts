/* eslint-disable @typescript-eslint/naming-convention */
// import { Scalar } from "./math.scalar";
import { ArrayTools } from './arrayTools';
import { Epsilon } from './constants';
import { Matrix } from './matrix';
import { Scalar } from './scalar';
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
 * Class used to store (x,y,z) vector representation
 * A Vector3 is the main object used in 3D geometry
 * It can represent either the coordinates of a point the space, either a direction
 * Reminder: js uses a left handed forward facing system
 * Example Playground - Overview - https://playground.babylonjs.com/#R1F8YU
 */
export class Vector3 {
  //     private static _UpReadOnly = Vector3.Up() as DeepImmutable<Vector3>;
  //     private static _DownReadOnly = Vector3.Down() as DeepImmutable<Vector3>;
  //     private static _LeftHandedForwardReadOnly = Vector3.Forward(false) as DeepImmutable<Vector3>;
  //     private static _RightHandedForwardReadOnly = Vector3.Forward(true) as DeepImmutable<Vector3>;
  //     private static _RightReadOnly = Vector3.Right() as DeepImmutable<Vector3>;
  //     private static _LeftReadOnly = Vector3.Left() as DeepImmutable<Vector3>;
  //     private static _ZeroReadOnly = Vector3.Zero() as DeepImmutable<Vector3>;
  /** @hidden */
  public _x: number;
  /** @hidden */
  public _y: number;
  /** @hidden */
  public _z: number;
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

  /**
   * Creates a new Vector3 object from the given x, y, z (floats) coordinates.
   * @param x defines the first coordinates (on X axis)
   * @param y defines the second coordinates (on Y axis)
   * @param z defines the third coordinates (on Z axis)
   */
  constructor(x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  /**
   * Creates a string representation of the Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#67
   * @returns a string with the Vector3 coordinates.
   */
  public toString(): string {
    return `{X: ${this._x} Y: ${this._y} Z: ${this._z}}`;
  }

  /**
   * Gets the class name
   * @returns the string "Vector3"
   */
  public getClassName(): string {
    return 'Vector3';
  }

  /**
   * Creates the Vector3 hash code
   * @returns a number which tends to be unique between Vector3 instances
   */
  public getHashCode(): number {
    const x = _ExtractAsInt(this._x);
    const y = _ExtractAsInt(this._y);
    const z = _ExtractAsInt(this._z);
    let hash = x;
    hash = (hash * 397) ^ y;
    hash = (hash * 397) ^ z;
    return hash;
  }

  // Operators

  /**
   * Creates an array containing three elements : the coordinates of the Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#10
   * @returns a new array of numbers
   */
  public asArray(): number[] {
    const result: number[] = [];
    this.toArray(result, 0);
    return result;
  }

  /**
   * Populates the given array or Float32Array from the given index with the successive coordinates of the Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#65
   * @param array defines the destination array
   * @param index defines the offset in the destination array
   * @returns the current Vector3
   */
  public toArray(array: FloatArray, index = 0): Vector3 {
    array[index] = this._x;
    array[index + 1] = this._y;
    array[index + 2] = this._z;
    return this;
  }

  //     /**
  //      * Update the current vector from an array
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#24
  //      * @param array defines the destination array
  //      * @param index defines the offset in the destination array
  //      * @returns the current Vector3
  //      */
  //     public fromArray(array: FloatArray, index: number = 0): Vector3 {
  //         Vector3.FromArrayToRef(array, index, this);
  //         return this;
  //     }
  //     /**
  //      * Converts the current Vector3 into a quaternion (considering that the Vector3 contains Euler angles representation of a rotation)
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#66
  //      * @returns a new Quaternion object, computed from the Vector3 coordinates
  //      */
  //     public toQuaternion(): Quaternion {
  //         return Quaternion.RotationYawPitchRoll(this._y, this._x, this._z);
  //     }

  /**
   * Adds the given vector to the current Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#4
   * @param otherVector defines the second operand
   * @returns the current updated Vector3
   */
  public addInPlace(otherVector: DeepImmutable<Vector3>): Vector3 {
    return this.addInPlaceFromFloats(
      otherVector._x,
      otherVector._y,
      otherVector._z
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
  public addInPlaceFromFloats(x: number, y: number, z: number): Vector3 {
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
  public add(otherVector: DeepImmutable<Vector3>): Vector3 {
    return new Vector3(
      this._x + otherVector._x,
      this._y + otherVector._y,
      this._z + otherVector._z
    );
  }

  /**
   * Adds the current Vector3 to the given one and stores the result in the vector "result"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#6
   * @param otherVector defines the second operand
   * @param result defines the Vector3 object where to store the result
   * @returns the current Vector3
   */
  public addToRef(
    otherVector: DeepImmutable<Vector3>,
    result: Vector3
  ): Vector3 {
    return result.copyFromFloats(
      this._x + otherVector._x,
      this._y + otherVector._y,
      this._z + otherVector._z
    );
  }

  /**
   * Subtract the given vector from the current Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#61
   * @param otherVector defines the second operand
   * @returns the current updated Vector3
   */
  public subtractInPlace(otherVector: DeepImmutable<Vector3>): Vector3 {
    this.x -= otherVector._x;
    this.y -= otherVector._y;
    this.z -= otherVector._z;
    return this;
  }

  //     /**
  //      * Returns a new Vector3, result of the subtraction of the given vector from the current Vector3
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#60
  //      * @param otherVector defines the second operand
  //      * @returns the resulting Vector3
  //      */
  //     public subtract(otherVector: DeepImmutable<Vector3>): Vector3 {
  //         return new Vector3(this._x - otherVector._x, this._y - otherVector._y, this._z - otherVector._z);
  //     }
  /**
   * Subtracts the given vector from the current Vector3 and stores the result in the vector "result".
   * Example Playground https://playground.babylonjs.com/#R1F8YU#63
   * @param otherVector defines the second operand
   * @param result defines the Vector3 object where to store the result
   * @returns the current Vector3
   */
  public subtractToRef(
    otherVector: DeepImmutable<Vector3>,
    result: Vector3
  ): Vector3 {
    return this.subtractFromFloatsToRef(
      otherVector._x,
      otherVector._y,
      otherVector._z,
      result
    );
  }
  //     /**
  //      * Returns a new Vector3 set with the subtraction of the given floats from the current Vector3 coordinates
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#62
  //      * @param x defines the x coordinate of the operand
  //      * @param y defines the y coordinate of the operand
  //      * @param z defines the z coordinate of the operand
  //      * @returns the resulting Vector3
  //      */
  //     public subtractFromFloats(x: number, y: number, z: number): Vector3 {
  //         return new Vector3(this._x - x, this._y - y, this._z - z);
  //     }

  /**
   * Subtracts the given floats from the current Vector3 coordinates and set the given vector "result" with this result
   * Example Playground https://playground.babylonjs.com/#R1F8YU#64
   * @param x defines the x coordinate of the operand
   * @param y defines the y coordinate of the operand
   * @param z defines the z coordinate of the operand
   * @param result defines the Vector3 object where to store the result
   * @returns the current Vector3
   */
  public subtractFromFloatsToRef(
    x: number,
    y: number,
    z: number,
    result: Vector3
  ): Vector3 {
    return result.copyFromFloats(this._x - x, this._y - y, this._z - z);
  }

  //     /**
  //      * Gets a new Vector3 set with the current Vector3 negated coordinates
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#35
  //      * @returns a new Vector3
  //      */
  //     public negate(): Vector3 {
  //         return new Vector3(-this._x, -this._y, -this._z);
  //     }
  //     /**
  //      * Negate this vector in place
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#36
  //      * @returns this
  //      */
  //     public negateInPlace(): Vector3 {
  //         this.x *= -1;
  //         this.y *= -1;
  //         this.z *= -1;
  //         return this;
  //     }
  //     /**
  //      * Negate the current Vector3 and stores the result in the given vector "result" coordinates
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#37
  //      * @param result defines the Vector3 object where to store the result
  //      * @returns the current Vector3
  //      */
  //     public negateToRef(result: Vector3): Vector3 {
  //         return result.copyFromFloats(this._x * -1, this._y * -1, this._z * -1);
  //     }

  /**
   * Multiplies the Vector3 coordinates by the float "scale"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#56
   * @param scale defines the multiplier factor
   * @returns the current updated Vector3
   */
  public scaleInPlace(scale: number): Vector3 {
    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
    return this;
  }

  //     /**
  //      * Returns a new Vector3 set with the current Vector3 coordinates multiplied by the float "scale"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#53
  //      * @param scale defines the multiplier factor
  //      * @returns a new Vector3
  //      */
  //     public scale(scale: number): Vector3 {
  //         return new Vector3(this._x * scale, this._y * scale, this._z * scale);
  //     }
  //     /**
  //      * Multiplies the current Vector3 coordinates by the float "scale" and stores the result in the given vector "result" coordinates
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#57
  //      * @param scale defines the multiplier factor
  //      * @param result defines the Vector3 object where to store the result
  //      * @returns the current Vector3
  //      */
  //     public scaleToRef(scale: number, result: Vector3): Vector3 {
  //         return result.copyFromFloats(this._x * scale, this._y * scale, this._z * scale);
  //     }
  //     /**
  //      * Rotates the vector using the given unit quaternion and stores the new vector in result
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#9
  //      * @param q the unit quaternion representing the rotation
  //      * @param result the output vector
  //      * @returns the current Vector3
  //      */
  //     public applyRotationQuaternionToRef(q: Quaternion, result: Vector3): Vector3 {
  //         const ix = q.w * this.x + q.y * this.z - q.z * this.y;
  //         const iy = q.w * this.y + q.z * this.x - q.x * this.z;
  //         const iz = q.w * this.z + q.x * this.y - q.y * this.x;
  //         const iw = -q.x * this.x - q.y * this.y - q.z * this.z;
  //         result.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;
  //         result.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;
  //         result.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;
  //         return result;
  //     }
  //     /**
  //      * Rotates the vector in place using the given unit quaternion
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#8
  //      * @param q the unit quaternion representing the rotation
  //      * @returns the current updated Vector3
  //      */
  //     public applyRotationQuaternionInPlace(q: Quaternion): Vector3 {
  //         return this.applyRotationQuaternionToRef(q, this);
  //     }
  //     /**
  //      * Rotates the vector using the given unit quaternion and returns the new vector
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#7
  //      * @param q the unit quaternion representing the rotation
  //      * @returns a new Vector3
  //      */
  //     public applyRotationQuaternion(q: Quaternion): Vector3 {
  //         return this.applyRotationQuaternionToRef(q, Vector3.Zero());
  //     }
  //     /**
  //      * Scale the current Vector3 values by a factor and add the result to a given Vector3
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#55
  //      * @param scale defines the scale factor
  //      * @param result defines the Vector3 object where to store the result
  //      * @returns the unmodified current Vector3
  //      */
  //     public scaleAndAddToRef(scale: number, result: Vector3): Vector3 {
  //         return result.addInPlaceFromFloats(this._x * scale, this._y * scale, this._z * scale);
  //     }
  //     /**
  //      * Projects the current point Vector3 to a plane along a ray starting from a specified origin and passing through the current point Vector3.
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#48
  //      * @param plane defines the plane to project to
  //      * @param origin defines the origin of the projection ray
  //      * @returns the projected vector3
  //      */
  //     public projectOnPlane(plane: Plane, origin: Vector3): Vector3 {
  //         const result = Vector3.Zero();
  //         this.projectOnPlaneToRef(plane, origin, result);
  //         return result;
  //     }
  //     /**
  //      * Projects the current point Vector3 to a plane along a ray starting from a specified origin and passing through the current point Vector3.
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#49
  //      * @param plane defines the plane to project to
  //      * @param origin defines the origin of the projection ray
  //      * @param result defines the Vector3 where to store the result
  //      */
  //     public projectOnPlaneToRef(plane: Plane, origin: Vector3, result: Vector3): void {
  //         const n = plane.normal;
  //         const d = plane.d;
  //         const V = MathTmp.Vector3[0];
  //         // ray direction
  //         this.subtractToRef(origin, V);
  //         V.normalize();
  //         const denom = Vector3.Dot(V, n);
  //         //When the ray is close to parallel to the plane return infinity vector
  //         if (Math.abs(denom) < Math.pow(10, -10)) {
  //             result.setAll(Infinity);
  //         } else {
  //             const t = -(Vector3.Dot(origin, n) + d) / denom;
  //             // P = P0 + t*V
  //             const scaledV = V.scaleInPlace(t);
  //             origin.addToRef(scaledV, result);
  //         }
  //     }

  /**
   * Returns true if the current Vector3 and the given vector coordinates are strictly equal
   * Example Playground https://playground.babylonjs.com/#R1F8YU#19
   * @param otherVector defines the second operand
   * @returns true if both vectors are equals
   */
  public equals(otherVector: DeepImmutable<Vector3>): boolean {
    return (
      otherVector &&
      this._x === otherVector._x &&
      this._y === otherVector._y &&
      this._z === otherVector._z
    );
  }

  //     /**
  //      * Returns true if the current Vector3 and the given vector coordinates are distant less than epsilon
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#21
  //      * @param otherVector defines the second operand
  //      * @param epsilon defines the minimal distance to define values as equals
  //      * @returns true if both vectors are distant less than epsilon
  //      */
  //     public equalsWithEpsilon(otherVector: DeepImmutable<Vector3>, epsilon: number = Epsilon): boolean {
  //         return (
  //             otherVector &&
  //             Scalar.WithinEpsilon(this._x, otherVector._x, epsilon) &&
  //             Scalar.WithinEpsilon(this._y, otherVector._y, epsilon) &&
  //             Scalar.WithinEpsilon(this._z, otherVector._z, epsilon)
  //         );
  //     }
  //     /**
  //      * Returns true if the current Vector3 coordinates equals the given floats
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#20
  //      * @param x defines the x coordinate of the operand
  //      * @param y defines the y coordinate of the operand
  //      * @param z defines the z coordinate of the operand
  //      * @returns true if both vectors are equal
  //      */
  //     public equalsToFloats(x: number, y: number, z: number): boolean {
  //         return this._x === x && this._y === y && this._z === z;
  //     }
  //     /**
  //      * Multiplies the current Vector3 coordinates by the given ones
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#32
  //      * @param otherVector defines the second operand
  //      * @returns the current updated Vector3
  //      */
  //     public multiplyInPlace(otherVector: DeepImmutable<Vector3>): Vector3 {
  //         this.x *= otherVector._x;
  //         this.y *= otherVector._y;
  //         this.z *= otherVector._z;
  //         return this;
  //     }
  //     /**
  //      * Returns a new Vector3, result of the multiplication of the current Vector3 by the given vector
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#31
  //      * @param otherVector defines the second operand
  //      * @returns the new Vector3
  //      */
  //     public multiply(otherVector: DeepImmutable<Vector3>): Vector3 {
  //         return this.multiplyByFloats(otherVector._x, otherVector._y, otherVector._z);
  //     }
  //     /**
  //      * Multiplies the current Vector3 by the given one and stores the result in the given vector "result"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#33
  //      * @param otherVector defines the second operand
  //      * @param result defines the Vector3 object where to store the result
  //      * @returns the current Vector3
  //      */
  //     public multiplyToRef(otherVector: DeepImmutable<Vector3>, result: Vector3): Vector3 {
  //         return result.copyFromFloats(this._x * otherVector._x, this._y * otherVector._y, this._z * otherVector._z);
  //     }
  //     /**
  //      * Returns a new Vector3 set with the result of the multiplication of the current Vector3 coordinates by the given floats
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#34
  //      * @param x defines the x coordinate of the operand
  //      * @param y defines the y coordinate of the operand
  //      * @param z defines the z coordinate of the operand
  //      * @returns the new Vector3
  //      */
  //     public multiplyByFloats(x: number, y: number, z: number): Vector3 {
  //         return new Vector3(this._x * x, this._y * y, this._z * z);
  //     }
  //     /**
  //      * Returns a new Vector3 set with the result of the division of the current Vector3 coordinates by the given ones
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#16
  //      * @param otherVector defines the second operand
  //      * @returns the new Vector3
  //      */
  //     public divide(otherVector: DeepImmutable<Vector3>): Vector3 {
  //         return new Vector3(this._x / otherVector._x, this._y / otherVector._y, this._z / otherVector._z);
  //     }
  //     /**
  //      * Divides the current Vector3 coordinates by the given ones and stores the result in the given vector "result"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#18
  //      * @param otherVector defines the second operand
  //      * @param result defines the Vector3 object where to store the result
  //      * @returns the current Vector3
  //      */
  //     public divideToRef(otherVector: DeepImmutable<Vector3>, result: Vector3): Vector3 {
  //         return result.copyFromFloats(this._x / otherVector._x, this._y / otherVector._y, this._z / otherVector._z);
  //     }
  //     /**
  //      * Divides the current Vector3 coordinates by the given ones.
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#17
  //      * @param otherVector defines the second operand
  //      * @returns the current updated Vector3
  //      */
  //     public divideInPlace(otherVector: Vector3): Vector3 {
  //         return this.divideToRef(otherVector, this);
  //     }
  //     /**
  //      * Updates the current Vector3 with the minimal coordinate values between its and the given vector ones
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#29
  //      * @param other defines the second operand
  //      * @returns the current updated Vector3
  //      */
  //     public minimizeInPlace(other: DeepImmutable<Vector3>): Vector3 {
  //         return this.minimizeInPlaceFromFloats(other._x, other._y, other._z);
  //     }
  //     /**
  //      * Updates the current Vector3 with the maximal coordinate values between its and the given vector ones.
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#27
  //      * @param other defines the second operand
  //      * @returns the current updated Vector3
  //      */
  //     public maximizeInPlace(other: DeepImmutable<Vector3>): Vector3 {
  //         return this.maximizeInPlaceFromFloats(other._x, other._y, other._z);
  //     }
  //     /**
  //      * Updates the current Vector3 with the minimal coordinate values between its and the given coordinates
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#30
  //      * @param x defines the x coordinate of the operand
  //      * @param y defines the y coordinate of the operand
  //      * @param z defines the z coordinate of the operand
  //      * @returns the current updated Vector3
  //      */
  //     public minimizeInPlaceFromFloats(x: number, y: number, z: number): Vector3 {
  //         if (x < this._x) {
  //             this.x = x;
  //         }
  //         if (y < this._y) {
  //             this.y = y;
  //         }
  //         if (z < this._z) {
  //             this.z = z;
  //         }
  //         return this;
  //     }
  //     /**
  //      * Updates the current Vector3 with the maximal coordinate values between its and the given coordinates.
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#28
  //      * @param x defines the x coordinate of the operand
  //      * @param y defines the y coordinate of the operand
  //      * @param z defines the z coordinate of the operand
  //      * @returns the current updated Vector3
  //      */
  //     public maximizeInPlaceFromFloats(x: number, y: number, z: number): Vector3 {
  //         if (x > this._x) {
  //             this.x = x;
  //         }
  //         if (y > this._y) {
  //             this.y = y;
  //         }
  //         if (z > this._z) {
  //             this.z = z;
  //         }
  //         return this;
  //     }
  //     /**
  //      * Due to float precision, scale of a mesh could be uniform but float values are off by a small fraction
  //      * Check if is non uniform within a certain amount of decimal places to account for this
  //      * @param epsilon the amount the values can differ
  //      * @returns if the the vector is non uniform to a certain number of decimal places
  //      */
  //     public isNonUniformWithinEpsilon(epsilon: number) {
  //         const absX = Math.abs(this._x);
  //         const absY = Math.abs(this._y);
  //         if (!Scalar.WithinEpsilon(absX, absY, epsilon)) {
  //             return true;
  //         }
  //         const absZ = Math.abs(this._z);
  //         if (!Scalar.WithinEpsilon(absX, absZ, epsilon)) {
  //             return true;
  //         }
  //         if (!Scalar.WithinEpsilon(absY, absZ, epsilon)) {
  //             return true;
  //         }
  //         return false;
  //     }
  //     /**
  //      * Gets a boolean indicating that the vector is non uniform meaning x, y or z are not all the same
  //      */
  //     public get isNonUniform(): boolean {
  //         const absX = Math.abs(this._x);
  //         const absY = Math.abs(this._y);
  //         if (absX !== absY) {
  //             return true;
  //         }
  //         const absZ = Math.abs(this._z);
  //         if (absX !== absZ) {
  //             return true;
  //         }
  //         return false;
  //     }
  //     /**
  //      * Gets a new Vector3 from current Vector3 floored values
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#22
  //      * @returns a new Vector3
  //      */
  //     public floor(): Vector3 {
  //         return new Vector3(Math.floor(this._x), Math.floor(this._y), Math.floor(this._z));
  //     }
  //     /**
  //      * Gets a new Vector3 from current Vector3 fractional values
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#23
  //      * @returns a new Vector3
  //      */
  //     public fract(): Vector3 {
  //         return new Vector3(this._x - Math.floor(this._x), this._y - Math.floor(this._y), this._z - Math.floor(this._z));
  //     }

  // Properties

  /**
   * Gets the length of the Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#25
   * @returns the length of the Vector3
   */
  public length(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
  }

  /**
   * Gets the squared length of the Vector3
   * Example Playground https://playground.babylonjs.com/#R1F8YU#26
   * @returns squared length of the Vector3
   */
  public lengthSquared(): number {
    return this._x * this._x + this._y * this._y + this._z * this._z;
  }

  //     /**
  //      * Gets a boolean indicating if the vector contains a zero in one of its components
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#1
  //      */
  //     public get hasAZeroComponent(): boolean {
  //         return this._x * this._y * this._z === 0;
  //     }

  /**
   * Normalize the current Vector3.
   * Please note that this is an in place operation.
   * Example Playground https://playground.babylonjs.com/#R1F8YU#122
   * @returns the current updated Vector3
   */
  public normalize(): Vector3 {
    return this.normalizeFromLength(this.length());
  }

  //     /**
  //      * Reorders the x y z properties of the vector in place
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#44
  //      * @param order new ordering of the properties (eg. for vector 1,2,3 with "ZYX" will produce 3,2,1)
  //      * @returns the current updated vector
  //      */
  //     public reorderInPlace(order: string) {
  //         order = order.toLowerCase();
  //         if (order === "xyz") {
  //             return this;
  //         }
  //         MathTmp.Vector3[0].copyFrom(this);
  //         ["x", "y", "z"].forEach((val, i) => {
  //             (<any>this)[val] = (<any>MathTmp.Vector3[0])[order[i]];
  //         });
  //         return this;
  //     }
  //     /**
  //      * Rotates the vector around 0,0,0 by a quaternion
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#47
  //      * @param quaternion the rotation quaternion
  //      * @param result vector to store the result
  //      * @returns the resulting vector
  //      */
  //     public rotateByQuaternionToRef(quaternion: Quaternion, result: Vector3) {
  //         quaternion.toRotationMatrix(MathTmp.Matrix[0]);
  //         Vector3.TransformCoordinatesToRef(this, MathTmp.Matrix[0], result);
  //         return result;
  //     }
  //     /**
  //      * Rotates a vector around a given point
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#46
  //      * @param quaternion the rotation quaternion
  //      * @param point the point to rotate around
  //      * @param result vector to store the result
  //      * @returns the resulting vector
  //      */
  //     public rotateByQuaternionAroundPointToRef(quaternion: Quaternion, point: Vector3, result: Vector3) {
  //         this.subtractToRef(point, MathTmp.Vector3[0]);
  //         MathTmp.Vector3[0].rotateByQuaternionToRef(quaternion, MathTmp.Vector3[0]);
  //         point.addToRef(MathTmp.Vector3[0], result);
  //         return result;
  //     }
  //     /**
  //      * Returns a new Vector3 as the cross product of the current vector and the "other" one
  //      * The cross product is then orthogonal to both current and "other"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#14
  //      * @param other defines the right operand
  //      * @returns the cross product
  //      */
  //     public cross(other: Vector3) {
  //         return Vector3.Cross(this, other);
  //     }
  /**
   * Normalize the current Vector3 with the given input length.
   * Please note that this is an in place operation.
   * Example Playground https://playground.babylonjs.com/#R1F8YU#123
   * @param len the length of the vector
   * @returns the current updated Vector3
   */
  public normalizeFromLength(len: number): Vector3 {
    if (len === 0 || len === 1.0) {
      return this;
    }
    return this.scaleInPlace(1.0 / len);
  }
  //     /**
  //      * Normalize the current Vector3 to a new vector
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#124
  //      * @returns the new Vector3
  //      */
  //     public normalizeToNew(): Vector3 {
  //         const normalized = new Vector3(0, 0, 0);
  //         this.normalizeToRef(normalized);
  //         return normalized;
  //     }
  //     /**
  //      * Normalize the current Vector3 to the reference
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#125
  //      * @param reference define the Vector3 to update
  //      * @returns the updated Vector3
  //      */
  //     public normalizeToRef(reference: Vector3): Vector3 {
  //         const len = this.length();
  //         if (len === 0 || len === 1.0) {
  //             return reference.copyFromFloats(this._x, this._y, this._z);
  //         }
  //         return this.scaleToRef(1.0 / len, reference);
  //     }
  //     /**
  //      * Creates a new Vector3 copied from the current Vector3
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#11
  //      * @returns the new Vector3
  //      */
  //     public clone(): Vector3 {
  //         return new Vector3(this._x, this._y, this._z);
  //     }

  /**
   * Copies the given vector coordinates to the current Vector3 ones
   * Example Playground https://playground.babylonjs.com/#R1F8YU#12
   * @param source defines the source Vector3
   * @returns the current updated Vector3
   */
  public copyFrom(source: DeepImmutable<Vector3>): Vector3 {
    return this.copyFromFloats(source._x, source._y, source._z);
  }

  /**
   * Copies the given floats to the current Vector3 coordinates
   * Example Playground https://playground.babylonjs.com/#R1F8YU#13
   * @param x defines the x coordinate of the operand
   * @param y defines the y coordinate of the operand
   * @param z defines the z coordinate of the operand
   * @returns the current updated Vector3
   */
  public copyFromFloats(x: number, y: number, z: number): Vector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  //     /**
  //      * Copies the given floats to the current Vector3 coordinates
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#58
  //      * @param x defines the x coordinate of the operand
  //      * @param y defines the y coordinate of the operand
  //      * @param z defines the z coordinate of the operand
  //      * @returns the current updated Vector3
  //      */
  //     public set(x: number, y: number, z: number): Vector3 {
  //         return this.copyFromFloats(x, y, z);
  //     }
  //     /**
  //      * Copies the given float to the current Vector3 coordinates
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#59
  //      * @param v defines the x, y and z coordinates of the operand
  //      * @returns the current updated Vector3
  //      */
  //     public setAll(v: number): Vector3 {
  //         this.x = this.y = this.z = v;
  //         return this;
  //     }
  //     // Statics
  //     /**
  //      * Get the clip factor between two vectors
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#126
  //      * @param vector0 defines the first operand
  //      * @param vector1 defines the second operand
  //      * @param axis defines the axis to use
  //      * @param size defines the size along the axis
  //      * @returns the clip factor
  //      */
  //     public static GetClipFactor(vector0: DeepImmutable<Vector3>, vector1: DeepImmutable<Vector3>, axis: DeepImmutable<Vector3>, size: number) {
  //         const d0 = Vector3.Dot(vector0, axis) - size;
  //         const d1 = Vector3.Dot(vector1, axis) - size;
  //         const s = d0 / (d0 - d1);
  //         return s;
  //     }
  //     /**
  //      * Get angle between two vectors
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#86
  //      * @param vector0 angle between vector0 and vector1
  //      * @param vector1 angle between vector0 and vector1
  //      * @param normal direction of the normal
  //      * @return the angle between vector0 and vector1
  //      */
  //     public static GetAngleBetweenVectors(vector0: DeepImmutable<Vector3>, vector1: DeepImmutable<Vector3>, normal: DeepImmutable<Vector3>): number {
  //         const v0: Vector3 = vector0.normalizeToRef(MathTmp.Vector3[1]);
  //         const v1: Vector3 = vector1.normalizeToRef(MathTmp.Vector3[2]);
  //         let dot: number = Vector3.Dot(v0, v1);
  //         // Vectors are normalized so dot will be in [-1, 1] (aside precision issues enough to break the result which explains the below clamp)
  //         dot = Scalar.Clamp(dot, -1, 1);
  //         const angle = Math.acos(dot);
  //         const n = MathTmp.Vector3[3];
  //         Vector3.CrossToRef(v0, v1, n);
  //         if (Vector3.Dot(n, normal) > 0) {
  //             return isNaN(angle) ? 0 : angle;
  //         }
  //         return isNaN(angle) ? -Math.PI : -Math.acos(dot);
  //     }
  //     /**
  //      * Get angle between two vectors projected on a plane
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#87
  //      * @param vector0 angle between vector0 and vector1
  //      * @param vector1 angle between vector0 and vector1
  //      * @param normal Normal of the projection plane
  //      * @returns the angle between vector0 and vector1 projected on the plane with the specified normal
  //      */
  //     public static GetAngleBetweenVectorsOnPlane(vector0: Vector3, vector1: Vector3, normal: Vector3) {
  //         MathTmp.Vector3[0].copyFrom(vector0);
  //         const v0 = MathTmp.Vector3[0];
  //         MathTmp.Vector3[1].copyFrom(vector1);
  //         const v1 = MathTmp.Vector3[1];
  //         MathTmp.Vector3[2].copyFrom(normal);
  //         const vNormal = MathTmp.Vector3[2];
  //         const right = MathTmp.Vector3[3];
  //         const forward = MathTmp.Vector3[4];
  //         v0.normalize();
  //         v1.normalize();
  //         vNormal.normalize();
  //         Vector3.CrossToRef(vNormal, v0, right);
  //         Vector3.CrossToRef(right, vNormal, forward);
  //         const angle = Math.atan2(Vector3.Dot(v1, right), Vector3.Dot(v1, forward));
  //         return Scalar.NormalizeRadians(angle);
  //     }
  //     /**
  //      * Slerp between two vectors. See also `SmoothToRef`
  //      * Slerp is a spherical linear interpolation
  //      * giving a slow in and out effect
  //      * Example Playground 1 https://playground.babylonjs.com/#R1F8YU#108
  //      * Example Playground 2 https://playground.babylonjs.com/#R1F8YU#109
  //      * @param vector0 Start vector
  //      * @param vector1 End vector
  //      * @param slerp amount (will be clamped between 0 and 1)
  //      * @param result The slerped vector
  //      */
  //     public static SlerpToRef(vector0: Vector3, vector1: Vector3, slerp: number, result: Vector3) {
  //         slerp = Scalar.Clamp(slerp, 0, 1);
  //         const vector0Dir = MathTmp.Vector3[0];
  //         const vector1Dir = MathTmp.Vector3[1];
  //         vector0Dir.copyFrom(vector0);
  //         const vector0Length = vector0Dir.length();
  //         vector0Dir.normalizeFromLength(vector0Length);
  //         vector1Dir.copyFrom(vector1);
  //         const vector1Length = vector1Dir.length();
  //         vector1Dir.normalizeFromLength(vector1Length);
  //         const dot = Vector3.Dot(vector0Dir, vector1Dir);
  //         let scale0;
  //         let scale1;
  //         if (dot < 1 - Epsilon) {
  //             const omega = Math.acos(dot);
  //             const invSin = 1 / Math.sin(omega);
  //             scale0 = Math.sin((1 - slerp) * omega) * invSin;
  //             scale1 = Math.sin(slerp * omega) * invSin;
  //         } else {
  //             // Use linear interpolation
  //             scale0 = 1 - slerp;
  //             scale1 = slerp;
  //         }
  //         vector0Dir.scaleInPlace(scale0);
  //         vector1Dir.scaleInPlace(scale1);
  //         result.copyFrom(vector0Dir).addInPlace(vector1Dir);
  //         result.scaleInPlace(Scalar.Lerp(vector0Length, vector1Length, slerp));
  //     }
  //     /**
  //      * Smooth interpolation between two vectors using Slerp
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#110
  //      * @param source source vector
  //      * @param goal goal vector
  //      * @param deltaTime current interpolation frame
  //      * @param lerpTime total interpolation time
  //      * @param result the smoothed vector
  //      */
  //     public static SmoothToRef(source: Vector3, goal: Vector3, deltaTime: number, lerpTime: number, result: Vector3) {
  //         Vector3.SlerpToRef(source, goal, lerpTime === 0 ? 1 : deltaTime / lerpTime, result);
  //     }

  /**
   * Returns a new Vector3 set from the index "offset" of the given array
   * Example Playground https://playground.babylonjs.com/#R1F8YU#83
   * @param array defines the source array
   * @param offset defines the offset in the source array
   * @returns the new Vector3
   */
  public static FromArray(
    array: DeepImmutable<ArrayLike<number>>,
    offset = 0
  ): Vector3 {
    return new Vector3(array[offset], array[offset + 1], array[offset + 2]);
  }

  /**
   * Returns a new Vector3 set from the index "offset" of the given Float32Array
   * @param array defines the source array
   * @param offset defines the offset in the source array
   * @returns the new Vector3
   * @deprecated Please use FromArray instead.
   */
  public static FromFloatArray(
    array: DeepImmutable<Float32Array>,
    offset?: number
  ): Vector3 {
    return Vector3.FromArray(array, offset);
  }

  //     /**
  //      * Sets the given vector "result" with the element values from the index "offset" of the given array
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#84
  //      * @param array defines the source array
  //      * @param offset defines the offset in the source array
  //      * @param result defines the Vector3 where to store the result
  //      */
  //     public static FromArrayToRef(array: DeepImmutable<ArrayLike<number>>, offset: number, result: Vector3): void {
  //         result.x = array[offset];
  //         result.y = array[offset + 1];
  //         result.z = array[offset + 2];
  //     }
  //     /**
  //      * Sets the given vector "result" with the element values from the index "offset" of the given Float32Array
  //      * @param array defines the source array
  //      * @param offset defines the offset in the source array
  //      * @param result defines the Vector3 where to store the result
  //      * @deprecated Please use FromArrayToRef instead.
  //      */
  //     public static FromFloatArrayToRef(array: DeepImmutable<Float32Array>, offset: number, result: Vector3): void {
  //         return Vector3.FromArrayToRef(array, offset, result);
  //     }
  //     /**
  //      * Sets the given vector "result" with the given floats.
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#85
  //      * @param x defines the x coordinate of the source
  //      * @param y defines the y coordinate of the source
  //      * @param z defines the z coordinate of the source
  //      * @param result defines the Vector3 where to store the result
  //      */
  //     public static FromFloatsToRef(x: number, y: number, z: number, result: Vector3): void {
  //         result.copyFromFloats(x, y, z);
  //     }

  /**
   * Returns a new Vector3 set to (0.0, 0.0, 0.0)
   * @returns a new empty Vector3
   */
  public static Zero(): Vector3 {
    return new Vector3(0.0, 0.0, 0.0);
  }

  //     /**
  //      * Returns a new Vector3 set to (1.0, 1.0, 1.0)
  //      * @returns a new Vector3
  //      */
  //     public static One(): Vector3 {
  //         return new Vector3(1.0, 1.0, 1.0);
  //     }
  //     /**
  //      * Returns a new Vector3 set to (0.0, 1.0, 0.0)
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#71
  //      * @returns a new up Vector3
  //      */
  //     public static Up(): Vector3 {
  //         return new Vector3(0.0, 1.0, 0.0);
  //     }
  //     /**
  //      * Gets an up Vector3 that must not be updated
  //      */
  //     public static get UpReadOnly(): DeepImmutable<Vector3> {
  //         return Vector3._UpReadOnly;
  //     }
  //     /**
  //      * Gets a down Vector3 that must not be updated
  //      */
  //     public static get DownReadOnly(): DeepImmutable<Vector3> {
  //         return Vector3._DownReadOnly;
  //     }
  //     /**
  //      * Gets a right Vector3 that must not be updated
  //      */
  //     public static get RightReadOnly(): DeepImmutable<Vector3> {
  //         return Vector3._RightReadOnly;
  //     }
  //     /**
  //      * Gets a left Vector3 that must not be updated
  //      */
  //     public static get LeftReadOnly(): DeepImmutable<Vector3> {
  //         return Vector3._LeftReadOnly;
  //     }
  //     /**
  //      * Gets a forward Vector3 that must not be updated
  //      */
  //     public static get LeftHandedForwardReadOnly(): DeepImmutable<Vector3> {
  //         return Vector3._LeftHandedForwardReadOnly;
  //     }
  //     /**
  //      * Gets a forward Vector3 that must not be updated
  //      */
  //     public static get RightHandedForwardReadOnly(): DeepImmutable<Vector3> {
  //         return Vector3._RightHandedForwardReadOnly;
  //     }
  //     /**
  //      * Gets a zero Vector3 that must not be updated
  //      */
  //     public static get ZeroReadOnly(): DeepImmutable<Vector3> {
  //         return Vector3._ZeroReadOnly;
  //     }
  //     /**
  //      * Returns a new Vector3 set to (0.0, -1.0, 0.0)
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#71
  //      * @returns a new down Vector3
  //      */
  //     public static Down(): Vector3 {
  //         return new Vector3(0.0, -1.0, 0.0);
  //     }
  //     /**
  //      * Returns a new Vector3 set to (0.0, 0.0, 1.0)
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#71
  //      * @param rightHandedSystem is the scene right-handed (negative z)
  //      * @returns a new forward Vector3
  //      */
  //     public static Forward(rightHandedSystem: boolean = false): Vector3 {
  //         return new Vector3(0.0, 0.0, rightHandedSystem ? -1.0 : 1.0);
  //     }
  //     /**
  //      * Returns a new Vector3 set to (0.0, 0.0, -1.0)
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#71
  //      * @param rightHandedSystem is the scene right-handed (negative-z)
  //      * @returns a new Backward Vector3
  //      */
  //     public static Backward(rightHandedSystem: boolean = false): Vector3 {
  //         return new Vector3(0.0, 0.0, rightHandedSystem ? 1.0 : -1.0);
  //     }
  //     /**
  //      * Returns a new Vector3 set to (1.0, 0.0, 0.0)
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#71
  //      * @returns a new right Vector3
  //      */
  //     public static Right(): Vector3 {
  //         return new Vector3(1.0, 0.0, 0.0);
  //     }
  //     /**
  //      * Returns a new Vector3 set to (-1.0, 0.0, 0.0)
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#71
  //      * @returns a new left Vector3
  //      */
  //     public static Left(): Vector3 {
  //         return new Vector3(-1.0, 0.0, 0.0);
  //     }
  //     /**
  //      * Returns a new Vector3 set with the result of the transformation by the given matrix of the given vector.
  //      * This method computes transformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#111
  //      * @param vector defines the Vector3 to transform
  //      * @param transformation defines the transformation matrix
  //      * @returns the transformed Vector3
  //      */
  //     public static TransformCoordinates(vector: DeepImmutable<Vector3>, transformation: DeepImmutable<Matrix>): Vector3 {
  //         const result = Vector3.Zero();
  //         Vector3.TransformCoordinatesToRef(vector, transformation, result);
  //         return result;
  //     }
  //     /**
  //      * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given vector
  //      * This method computes transformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#113
  //      * @param vector defines the Vector3 to transform
  //      * @param transformation defines the transformation matrix
  //      * @param result defines the Vector3 where to store the result
  //      */
  //     public static TransformCoordinatesToRef(vector: DeepImmutable<Vector3>, transformation: DeepImmutable<Matrix>, result: Vector3): void {
  //         Vector3.TransformCoordinatesFromFloatsToRef(vector._x, vector._y, vector._z, transformation, result);
  //     }
  //     /**
  //      * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given floats (x, y, z)
  //      * This method computes transformed coordinates only, not transformed direction vectors
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#115
  //      * @param x define the x coordinate of the source vector
  //      * @param y define the y coordinate of the source vector
  //      * @param z define the z coordinate of the source vector
  //      * @param transformation defines the transformation matrix
  //      * @param result defines the Vector3 where to store the result
  //      */
  //     public static TransformCoordinatesFromFloatsToRef(x: number, y: number, z: number, transformation: DeepImmutable<Matrix>, result: Vector3): void {
  //         const m = transformation.m;
  //         const rx = x * m[0] + y * m[4] + z * m[8] + m[12];
  //         const ry = x * m[1] + y * m[5] + z * m[9] + m[13];
  //         const rz = x * m[2] + y * m[6] + z * m[10] + m[14];
  //         const rw = 1 / (x * m[3] + y * m[7] + z * m[11] + m[15]);
  //         result.x = rx * rw;
  //         result.y = ry * rw;
  //         result.z = rz * rw;
  //     }

      /**
       * Returns a new Vector3 set with the result of the normal transformation by the given matrix of the given vector
       * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
       * Example Playground https://playground.babylonjs.com/#R1F8YU#112
       * @param vector defines the Vector3 to transform
       * @param transformation defines the transformation matrix
       * @returns the new Vector3
       */
      public static TransformNormal(vector: DeepImmutable<Vector3>, transformation: DeepImmutable<Matrix>): Vector3 {
          const result = Vector3.Zero();
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
   */
  public static TransformNormalToRef(
    vector: DeepImmutable<Vector3>,
    transformation: DeepImmutable<Matrix>,
    result: Vector3
  ): void {
    this.TransformNormalFromFloatsToRef(
      vector._x,
      vector._y,
      vector._z,
      transformation,
      result
    );
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
   */
  public static TransformNormalFromFloatsToRef(
    x: number,
    y: number,
    z: number,
    transformation: DeepImmutable<Matrix>,
    result: Vector3
  ): void {
    const m = transformation.m;
    result.x = x * m[0] + y * m[4] + z * m[8];
    result.y = x * m[1] + y * m[5] + z * m[9];
    result.z = x * m[2] + y * m[6] + z * m[10];
  }

  //     /**
  //      * Returns a new Vector3 located for "amount" on the CatmullRom interpolation spline defined by the vectors "value1", "value2", "value3", "value4"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#69
  //      * @param value1 defines the first control point
  //      * @param value2 defines the second control point
  //      * @param value3 defines the third control point
  //      * @param value4 defines the fourth control point
  //      * @param amount defines the amount on the spline to use
  //      * @returns the new Vector3
  //      */
  //     public static CatmullRom(
  //         value1: DeepImmutable<Vector3>,
  //         value2: DeepImmutable<Vector3>,
  //         value3: DeepImmutable<Vector3>,
  //         value4: DeepImmutable<Vector3>,
  //         amount: number
  //     ): Vector3 {
  //         const squared = amount * amount;
  //         const cubed = amount * squared;
  //         const x =
  //             0.5 *
  //             (2.0 * value2._x +
  //                 (-value1._x + value3._x) * amount +
  //                 (2.0 * value1._x - 5.0 * value2._x + 4.0 * value3._x - value4._x) * squared +
  //                 (-value1._x + 3.0 * value2._x - 3.0 * value3._x + value4._x) * cubed);
  //         const y =
  //             0.5 *
  //             (2.0 * value2._y +
  //                 (-value1._y + value3._y) * amount +
  //                 (2.0 * value1._y - 5.0 * value2._y + 4.0 * value3._y - value4._y) * squared +
  //                 (-value1._y + 3.0 * value2._y - 3.0 * value3._y + value4._y) * cubed);
  //         const z =
  //             0.5 *
  //             (2.0 * value2._z +
  //                 (-value1._z + value3._z) * amount +
  //                 (2.0 * value1._z - 5.0 * value2._z + 4.0 * value3._z - value4._z) * squared +
  //                 (-value1._z + 3.0 * value2._z - 3.0 * value3._z + value4._z) * cubed);
  //         return new Vector3(x, y, z);
  //     }
  //     /**
  //      * Returns a new Vector3 set with the coordinates of "value", if the vector "value" is in the cube defined by the vectors "min" and "max"
  //      * If a coordinate value of "value" is lower than one of the "min" coordinate, then this "value" coordinate is set with the "min" one
  //      * If a coordinate value of "value" is greater than one of the "max" coordinate, then this "value" coordinate is set with the "max" one
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#76
  //      * @param value defines the current value
  //      * @param min defines the lower range value
  //      * @param max defines the upper range value
  //      * @returns the new Vector3
  //      */
  //     public static Clamp(value: DeepImmutable<Vector3>, min: DeepImmutable<Vector3>, max: DeepImmutable<Vector3>): Vector3 {
  //         const v = new Vector3();
  //         Vector3.ClampToRef(value, min, max, v);
  //         return v;
  //     }
  //     /**
  //      * Sets the given vector "result" with the coordinates of "value", if the vector "value" is in the cube defined by the vectors "min" and "max"
  //      * If a coordinate value of "value" is lower than one of the "min" coordinate, then this "value" coordinate is set with the "min" one
  //      * If a coordinate value of "value" is greater than one of the "max" coordinate, then this "value" coordinate is set with the "max" one
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#77
  //      * @param value defines the current value
  //      * @param min defines the lower range value
  //      * @param max defines the upper range value
  //      * @param result defines the Vector3 where to store the result
  //      */
  //     public static ClampToRef(value: DeepImmutable<Vector3>, min: DeepImmutable<Vector3>, max: DeepImmutable<Vector3>, result: Vector3): void {
  //         let x = value._x;
  //         x = x > max._x ? max._x : x;
  //         x = x < min._x ? min._x : x;
  //         let y = value._y;
  //         y = y > max._y ? max._y : y;
  //         y = y < min._y ? min._y : y;
  //         let z = value._z;
  //         z = z > max._z ? max._z : z;
  //         z = z < min._z ? min._z : z;
  //         result.copyFromFloats(x, y, z);
  //     }
  //     /**
  //      * Checks if a given vector is inside a specific range
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#75
  //      * @param v defines the vector to test
  //      * @param min defines the minimum range
  //      * @param max defines the maximum range
  //      */
  //     public static CheckExtends(v: Vector3, min: Vector3, max: Vector3): void {
  //         min.minimizeInPlace(v);
  //         max.maximizeInPlace(v);
  //     }
  //     /**
  //      * Returns a new Vector3 located for "amount" (float) on the Hermite interpolation spline defined by the vectors "value1", "tangent1", "value2", "tangent2"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#89
  //      * @param value1 defines the first control point
  //      * @param tangent1 defines the first tangent vector
  //      * @param value2 defines the second control point
  //      * @param tangent2 defines the second tangent vector
  //      * @param amount defines the amount on the interpolation spline (between 0 and 1)
  //      * @returns the new Vector3
  //      */
  //     public static Hermite(
  //         value1: DeepImmutable<Vector3>,
  //         tangent1: DeepImmutable<Vector3>,
  //         value2: DeepImmutable<Vector3>,
  //         tangent2: DeepImmutable<Vector3>,
  //         amount: number
  //     ): Vector3 {
  //         const squared = amount * amount;
  //         const cubed = amount * squared;
  //         const part1 = 2.0 * cubed - 3.0 * squared + 1.0;
  //         const part2 = -2.0 * cubed + 3.0 * squared;
  //         const part3 = cubed - 2.0 * squared + amount;
  //         const part4 = cubed - squared;
  //         const x = value1._x * part1 + value2._x * part2 + tangent1._x * part3 + tangent2._x * part4;
  //         const y = value1._y * part1 + value2._y * part2 + tangent1._y * part3 + tangent2._y * part4;
  //         const z = value1._z * part1 + value2._z * part2 + tangent1._z * part3 + tangent2._z * part4;
  //         return new Vector3(x, y, z);
  //     }
  //     /**
  //      * Returns a new Vector3 which is the 1st derivative of the Hermite spline defined by the vectors "value1", "value2", "tangent1", "tangent2".
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#90
  //      * @param value1 defines the first control point
  //      * @param tangent1 defines the first tangent
  //      * @param value2 defines the second control point
  //      * @param tangent2 defines the second tangent
  //      * @param time define where the derivative must be done
  //      * @returns 1st derivative
  //      */
  //     public static Hermite1stDerivative(
  //         value1: DeepImmutable<Vector3>,
  //         tangent1: DeepImmutable<Vector3>,
  //         value2: DeepImmutable<Vector3>,
  //         tangent2: DeepImmutable<Vector3>,
  //         time: number
  //     ): Vector3 {
  //         const result = Vector3.Zero();
  //         this.Hermite1stDerivativeToRef(value1, tangent1, value2, tangent2, time, result);
  //         return result;
  //     }
  //     /**
  //      * Update a Vector3 with the 1st derivative of the Hermite spline defined by the vectors "value1", "value2", "tangent1", "tangent2".
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#91
  //      * @param value1 defines the first control point
  //      * @param tangent1 defines the first tangent
  //      * @param value2 defines the second control point
  //      * @param tangent2 defines the second tangent
  //      * @param time define where the derivative must be done
  //      * @param result define where to store the derivative
  //      */
  //     public static Hermite1stDerivativeToRef(
  //         value1: DeepImmutable<Vector3>,
  //         tangent1: DeepImmutable<Vector3>,
  //         value2: DeepImmutable<Vector3>,
  //         tangent2: DeepImmutable<Vector3>,
  //         time: number,
  //         result: Vector3
  //     ) {
  //         const t2 = time * time;
  //         result.x = (t2 - time) * 6 * value1.x + (3 * t2 - 4 * time + 1) * tangent1.x + (-t2 + time) * 6 * value2.x + (3 * t2 - 2 * time) * tangent2.x;
  //         result.y = (t2 - time) * 6 * value1.y + (3 * t2 - 4 * time + 1) * tangent1.y + (-t2 + time) * 6 * value2.y + (3 * t2 - 2 * time) * tangent2.y;
  //         result.z = (t2 - time) * 6 * value1.z + (3 * t2 - 4 * time + 1) * tangent1.z + (-t2 + time) * 6 * value2.z + (3 * t2 - 2 * time) * tangent2.z;
  //     }
  //     /**
  //      * Returns a new Vector3 located for "amount" (float) on the linear interpolation between the vectors "start" and "end"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#95
  //      * @param start defines the start value
  //      * @param end defines the end value
  //      * @param amount max defines amount between both (between 0 and 1)
  //      * @returns the new Vector3
  //      */
  //     public static Lerp(start: DeepImmutable<Vector3>, end: DeepImmutable<Vector3>, amount: number): Vector3 {
  //         const result = new Vector3(0, 0, 0);
  //         Vector3.LerpToRef(start, end, amount, result);
  //         return result;
  //     }
  //     /**
  //      * Sets the given vector "result" with the result of the linear interpolation from the vector "start" for "amount" to the vector "end"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#93
  //      * @param start defines the start value
  //      * @param end defines the end value
  //      * @param amount max defines amount between both (between 0 and 1)
  //      * @param result defines the Vector3 where to store the result
  //      */
  //     public static LerpToRef(start: DeepImmutable<Vector3>, end: DeepImmutable<Vector3>, amount: number, result: Vector3): void {
  //         result.x = start._x + (end._x - start._x) * amount;
  //         result.y = start._y + (end._y - start._y) * amount;
  //         result.z = start._z + (end._z - start._z) * amount;
  //     }

  /**
   * Returns the dot product (float) between the vectors "left" and "right"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#82
   * @param left defines the left operand
   * @param right defines the right operand
   * @returns the dot product
   */
  public static Dot(
    left: DeepImmutable<Vector3>,
    right: DeepImmutable<Vector3>
  ): number {
    return left._x * right._x + left._y * right._y + left._z * right._z;
  }

  /**
   * Returns the dot product (float) between the vectors "left" and "right"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#82
   * @param left defines the left operand
   * @param right defines the right operand
   * @returns the dot product
   */
  public static dot(
    left: DeepImmutable<Vector3>,
    right: DeepImmutable<Vector3>
  ): number {
    return left._x * right._x + left._y * right._y + left._z * right._z;
  }

  //     /**
  //      * Returns a new Vector3 as the cross product of the vectors "left" and "right"
  //      * The cross product is then orthogonal to both "left" and "right"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#15
  //      * @param left defines the left operand
  //      * @param right defines the right operand
  //      * @returns the cross product
  //      */
  //     public static Cross(left: DeepImmutable<Vector3>, right: DeepImmutable<Vector3>): Vector3 {
  //         const result = Vector3.Zero();
  //         Vector3.CrossToRef(left, right, result);
  //         return result;
  //     }

  /**
   * Sets the given vector "result" with the cross product of "left" and "right"
   * The cross product is then orthogonal to both "left" and "right"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#78
   * @param left defines the left operand
   * @param right defines the right operand
   * @param result defines the Vector3 where to store the result
   */
  public static CrossToRef(
    left: DeepImmutable<Vector3>,
    right: DeepImmutable<Vector3>,
    result: Vector3
  ): void {
    const x = left._y * right._z - left._z * right._y;
    const y = left._z * right._x - left._x * right._z;
    const z = left._x * right._y - left._y * right._x;
    result.copyFromFloats(x, y, z);
  }

  //     /**
  //      * Returns a new Vector3 as the normalization of the given vector
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#98
  //      * @param vector defines the Vector3 to normalize
  //      * @returns the new Vector3
  //      */
  //     public static Normalize(vector: DeepImmutable<Vector3>): Vector3 {
  //         const result = Vector3.Zero();
  //         Vector3.NormalizeToRef(vector, result);
  //         return result;
  //     }
  //     /**
  //      * Sets the given vector "result" with the normalization of the given first vector
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#98
  //      * @param vector defines the Vector3 to normalize
  //      * @param result defines the Vector3 where to store the result
  //      */
  //     public static NormalizeToRef(vector: DeepImmutable<Vector3>, result: Vector3): void {
  //         vector.normalizeToRef(result);
  //     }
  //     /**
  //      * Project a Vector3 onto screen space
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#101
  //      * @param vector defines the Vector3 to project
  //      * @param world defines the world matrix to use
  //      * @param transform defines the transform (view x projection) matrix to use
  //      * @param viewport defines the screen viewport to use
  //      * @returns the new Vector3
  //      */
  //     public static Project(vector: DeepImmutable<Vector3>, world: DeepImmutable<Matrix>, transform: DeepImmutable<Matrix>, viewport: DeepImmutable<Viewport>): Vector3 {
  //         const result = new Vector3();
  //         Vector3.ProjectToRef(vector, world, transform, viewport, result);
  //         return result;
  //     }
  //     /**
  //      * Project a Vector3 onto screen space to reference
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#102
  //      * @param vector defines the Vector3 to project
  //      * @param world defines the world matrix to use
  //      * @param transform defines the transform (view x projection) matrix to use
  //      * @param viewport defines the screen viewport to use
  //      * @param result the vector in which the screen space will be stored
  //      * @returns the new Vector3
  //      */
  //     public static ProjectToRef(
  //         vector: DeepImmutable<Vector3>,
  //         world: DeepImmutable<Matrix>,
  //         transform: DeepImmutable<Matrix>,
  //         viewport: DeepImmutable<Viewport>,
  //         result: DeepImmutable<Vector3>
  //     ): Vector3 {
  //         const cw = viewport.width;
  //         const ch = viewport.height;
  //         const cx = viewport.x;
  //         const cy = viewport.y;
  //         const viewportMatrix = MathTmp.Matrix[1];
  //         Matrix.FromValuesToRef(cw / 2.0, 0, 0, 0, 0, -ch / 2.0, 0, 0, 0, 0, 0.5, 0, cx + cw / 2.0, ch / 2.0 + cy, 0.5, 1, viewportMatrix);
  //         const matrix = MathTmp.Matrix[0];
  //         world.multiplyToRef(transform, matrix);
  //         matrix.multiplyToRef(viewportMatrix, matrix);
  //         Vector3.TransformCoordinatesToRef(vector, matrix, result);
  //         return result;
  //     }
  //     /**
  //      * @param source
  //      * @param matrix
  //      * @param result
  //      * @hidden
  //      */
  //     public static _UnprojectFromInvertedMatrixToRef(source: DeepImmutable<Vector3>, matrix: DeepImmutable<Matrix>, result: Vector3) {
  //         Vector3.TransformCoordinatesToRef(source, matrix, result);
  //         const m = matrix.m;
  //         const num = source._x * m[3] + source._y * m[7] + source._z * m[11] + m[15];
  //         if (Scalar.WithinEpsilon(num, 1.0)) {
  //             result.scaleInPlace(1.0 / num);
  //         }
  //     }
  //     /**
  //      * Unproject from screen space to object space
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#121
  //      * @param source defines the screen space Vector3 to use
  //      * @param viewportWidth defines the current width of the viewport
  //      * @param viewportHeight defines the current height of the viewport
  //      * @param world defines the world matrix to use (can be set to Identity to go to world space)
  //      * @param transform defines the transform (view x projection) matrix to use
  //      * @returns the new Vector3
  //      */
  //     public static UnprojectFromTransform(source: Vector3, viewportWidth: number, viewportHeight: number, world: DeepImmutable<Matrix>, transform: DeepImmutable<Matrix>): Vector3 {
  //         return this.Unproject(source, viewportWidth, viewportHeight, world, transform, Matrix.IdentityReadOnly);
  //     }
  //     /**
  //      * Unproject from screen space to object space
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#117
  //      * @param source defines the screen space Vector3 to use
  //      * @param viewportWidth defines the current width of the viewport
  //      * @param viewportHeight defines the current height of the viewport
  //      * @param world defines the world matrix to use (can be set to Identity to go to world space)
  //      * @param view defines the view matrix to use
  //      * @param projection defines the projection matrix to use
  //      * @returns the new Vector3
  //      */
  //     public static Unproject(
  //         source: DeepImmutable<Vector3>,
  //         viewportWidth: number,
  //         viewportHeight: number,
  //         world: DeepImmutable<Matrix>,
  //         view: DeepImmutable<Matrix>,
  //         projection: DeepImmutable<Matrix>
  //     ): Vector3 {
  //         const result = Vector3.Zero();
  //         Vector3.UnprojectToRef(source, viewportWidth, viewportHeight, world, view, projection, result);
  //         return result;
  //     }
  //     /**
  //      * Unproject from screen space to object space
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#119
  //      * @param source defines the screen space Vector3 to use
  //      * @param viewportWidth defines the current width of the viewport
  //      * @param viewportHeight defines the current height of the viewport
  //      * @param world defines the world matrix to use (can be set to Identity to go to world space)
  //      * @param view defines the view matrix to use
  //      * @param projection defines the projection matrix to use
  //      * @param result defines the Vector3 where to store the result
  //      */
  //     public static UnprojectToRef(
  //         source: DeepImmutable<Vector3>,
  //         viewportWidth: number,
  //         viewportHeight: number,
  //         world: DeepImmutable<Matrix>,
  //         view: DeepImmutable<Matrix>,
  //         projection: DeepImmutable<Matrix>,
  //         result: Vector3
  //     ): void {
  //         Vector3.UnprojectFloatsToRef(source._x, source._y, source._z, viewportWidth, viewportHeight, world, view, projection, result);
  //     }
  //     /**
  //      * Unproject from screen space to object space
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#120
  //      * @param sourceX defines the screen space x coordinate to use
  //      * @param sourceY defines the screen space y coordinate to use
  //      * @param sourceZ defines the screen space z coordinate to use
  //      * @param viewportWidth defines the current width of the viewport
  //      * @param viewportHeight defines the current height of the viewport
  //      * @param world defines the world matrix to use (can be set to Identity to go to world space)
  //      * @param view defines the view matrix to use
  //      * @param projection defines the projection matrix to use
  //      * @param result defines the Vector3 where to store the result
  //      */
  //     public static UnprojectFloatsToRef(
  //         sourceX: float,
  //         sourceY: float,
  //         sourceZ: float,
  //         viewportWidth: number,
  //         viewportHeight: number,
  //         world: DeepImmutable<Matrix>,
  //         view: DeepImmutable<Matrix>,
  //         projection: DeepImmutable<Matrix>,
  //         result: Vector3
  //     ): void {
  //         const matrix = MathTmp.Matrix[0];
  //         world.multiplyToRef(view, matrix);
  //         matrix.multiplyToRef(projection, matrix);
  //         matrix.invert();
  //         const screenSource = MathTmp.Vector3[0];
  //         screenSource.x = (sourceX / viewportWidth) * 2 - 1;
  //         screenSource.y = -((sourceY / viewportHeight) * 2 - 1);
  //         if (EngineStore.LastCreatedEngine?.isNDCHalfZRange) {
  //             screenSource.z = sourceZ;
  //         } else {
  //             screenSource.z = 2 * sourceZ - 1.0;
  //         }
  //         Vector3._UnprojectFromInvertedMatrixToRef(screenSource, matrix, result);
  //     }
  //     /**
  //      * Gets the minimal coordinate values between two Vector3
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#97
  //      * @param left defines the first operand
  //      * @param right defines the second operand
  //      * @returns the new Vector3
  //      */
  //     public static Minimize(left: DeepImmutable<Vector3>, right: DeepImmutable<Vector3>): Vector3 {
  //         const min = left.clone();
  //         min.minimizeInPlace(right);
  //         return min;
  //     }
  //     /**
  //      * Gets the maximal coordinate values between two Vector3
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#96
  //      * @param left defines the first operand
  //      * @param right defines the second operand
  //      * @returns the new Vector3
  //      */
  //     public static Maximize(left: DeepImmutable<Vector3>, right: DeepImmutable<Vector3>): Vector3 {
  //         const max = left.clone();
  //         max.maximizeInPlace(right);
  //         return max;
  //     }

  /**
   * Returns the distance between the vectors "value1" and "value2"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#81
   * @param value1 defines the first operand
   * @param value2 defines the second operand
   * @returns the distance
   */
  public static Distance(
    value1: DeepImmutable<Vector3>,
    value2: DeepImmutable<Vector3>
  ): number {
    return Math.sqrt(Vector3.DistanceSquared(value1, value2));
  }

  /**
   * Returns the squared distance between the vectors "value1" and "value2"
   * Example Playground https://playground.babylonjs.com/#R1F8YU#80
   * @param value1 defines the first operand
   * @param value2 defines the second operand
   * @returns the squared distance
   */
  public static DistanceSquared(
    value1: DeepImmutable<Vector3>,
    value2: DeepImmutable<Vector3>
  ): number {
    const x = value1._x - value2._x;
    const y = value1._y - value2._y;
    const z = value1._z - value2._z;
    return x * x + y * y + z * z;
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
    vector: DeepImmutable<Vector3>,
    p0: DeepImmutable<Vector3>,
    p1: DeepImmutable<Vector3>,
    p2: DeepImmutable<Vector3>,
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

  //     /**
  //      * Returns a new Vector3 located at the center between "value1" and "value2"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#72
  //      * @param value1 defines the first operand
  //      * @param value2 defines the second operand
  //      * @returns the new Vector3
  //      */
  //     public static Center(value1: DeepImmutable<Vector3>, value2: DeepImmutable<Vector3>): Vector3 {
  //         return Vector3.CenterToRef(value1, value2, Vector3.Zero());
  //     }
  //     /**
  //      * Gets the center of the vectors "value1" and "value2" and stores the result in the vector "ref"
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#73
  //      * @param value1 defines first vector
  //      * @param value2 defines second vector
  //      * @param ref defines third vector
  //      * @returns ref
  //      */
  //     public static CenterToRef(value1: DeepImmutable<Vector3>, value2: DeepImmutable<Vector3>, ref: DeepImmutable<Vector3>): Vector3 {
  //         return ref.copyFromFloats((value1._x + value2._x) / 2, (value1._y + value2._y) / 2, (value1._z + value2._z) / 2);
  //     }
  //     /**
  //      * Given three orthogonal normalized left-handed oriented Vector3 axis in space (target system),
  //      * RotationFromAxis() returns the rotation Euler angles (ex : rotation.x, rotation.y, rotation.z) to apply
  //      * to something in order to rotate it from its local system to the given target system
  //      * Note: axis1, axis2 and axis3 are normalized during this operation
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#106
  //      * @param axis1 defines the first axis
  //      * @param axis2 defines the second axis
  //      * @param axis3 defines the third axis
  //      * @returns a new Vector3
  //      * @see https://doc.babylonjs.com/divingDeeper/mesh/transforms/center_origin/target_align
  //      */
  //     public static RotationFromAxis(axis1: DeepImmutable<Vector3>, axis2: DeepImmutable<Vector3>, axis3: DeepImmutable<Vector3>): Vector3 {
  //         const rotation = Vector3.Zero();
  //         Vector3.RotationFromAxisToRef(axis1, axis2, axis3, rotation);
  //         return rotation;
  //     }
  //     /**
  //      * The same than RotationFromAxis but updates the given ref Vector3 parameter instead of returning a new Vector3
  //      * Example Playground https://playground.babylonjs.com/#R1F8YU#107
  //      * @param axis1 defines the first axis
  //      * @param axis2 defines the second axis
  //      * @param axis3 defines the third axis
  //      * @param ref defines the Vector3 where to store the result
  //      */
  //     public static RotationFromAxisToRef(axis1: DeepImmutable<Vector3>, axis2: DeepImmutable<Vector3>, axis3: DeepImmutable<Vector3>, ref: Vector3): void {
  //         const quat = MathTmp.Quaternion[0];
  //         Quaternion.RotationQuaternionFromAxisToRef(axis1, axis2, axis3, quat);
  //         quat.toEulerAnglesToRef(ref);
  //     }
}

/**
 * @hidden
 * Same as Tmp but not exported to keep it only for math functions to avoid conflicts
 */
class MathTmp {
  public static Vector3 = ArrayTools.BuildTuple(11, Vector3.Zero);
  // public static Matrix = ArrayTools.BuildTuple(2, Matrix.Identity);
  // public static Quaternion = ArrayTools.BuildTuple(3, Quaternion.Zero);
}

// /**
//  * @hidden
//  */
// export class TmpVectors {
//     public static Vector2 = ArrayTools.BuildTuple(3, Vector2.Zero); // 3 temp Vector2 at once should be enough
//     public static Vector3 = ArrayTools.BuildTuple(13, Vector3.Zero); // 13 temp Vector3 at once should be enough
//     public static Vector4 = ArrayTools.BuildTuple(3, Vector4.Zero); // 3 temp Vector4 at once should be enough
//     public static Quaternion = ArrayTools.BuildTuple(2, Quaternion.Zero); // 2 temp Quaternion at once should be enough
//     public static Matrix = ArrayTools.BuildTuple(8, Matrix.Identity); // 8 temp Matrices at once should be enough
// }

// RegisterClass("BABYLON.Vector2", Vector2);
// RegisterClass("BABYLON.Vector3", Vector3);
// RegisterClass("BABYLON.Vector4", Vector4);
// RegisterClass("BABYLON.Matrix", Matrix);

// const mtxConvertNDCToHalfZRange = Matrix.FromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.5, 0, 0, 0, 0.5, 1);
