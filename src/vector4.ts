/* eslint-disable @typescript-eslint/naming-convention */
// import { Scalar } from "./math.scalar";
import { Epsilon } from './constants';
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
 * Vector4 class created for EulerAngle class conversion to Quaternion
 */
export class Vector4 {
  //     private static _ZeroReadOnly = Vector4.Zero() as DeepImmutable<Vector4>;

  /**
   * Creates a Vector4 object from the given floats.
   * @param x x value of the vector
   * @param y y value of the vector
   * @param z z value of the vector
   * @param w w value of the vector
   */
  constructor(
    /** x value of the vector */
    public x: number,
    /** y value of the vector */
    public y: number,
    /** z value of the vector */
    public z: number,
    /** w value of the vector */
    public w: number
  ) {}

  /**
   * Returns the string with the Vector4 coordinates.
   * @returns a string containing all the vector values
   */
  public toString(): string {
    return `{X: ${this.x} Y: ${this.y} Z: ${this.z} W: ${this.w}}`;
  }

  /**
   * Returns the string "Vector4".
   * @returns "Vector4"
   */
  public getClassName(): string {
    return 'Vector4';
  }

  //     /**
  //      * Returns the Vector4 hash code.
  //      * @returns a unique hash code
  //      */
  //     public getHashCode(): number {
  //         const x = _ExtractAsInt(this.x);
  //         const y = _ExtractAsInt(this.y);
  //         const z = _ExtractAsInt(this.z);
  //         const w = _ExtractAsInt(this.w);
  //         let hash = x;
  //         hash = (hash * 397) ^ y;
  //         hash = (hash * 397) ^ z;
  //         hash = (hash * 397) ^ w;
  //         return hash;
  //     }
  //     // Operators
  //     /**
  //      * Returns a new array populated with 4 elements : the Vector4 coordinates.
  //      * @returns the resulting array
  //      */
  //     public asArray(): number[] {
  //         const result = new Array<number>();
  //         this.toArray(result, 0);
  //         return result;
  //     }
  //     /**
  //      * Populates the given array from the given index with the Vector4 coordinates.
  //      * @param array array to populate
  //      * @param index index of the array to start at (default: 0)
  //      * @returns the Vector4.
  //      */
  //     public toArray(array: FloatArray, index?: number): Vector4 {
  //         if (index === undefined) {
  //             index = 0;
  //         }
  //         array[index] = this.x;
  //         array[index + 1] = this.y;
  //         array[index + 2] = this.z;
  //         array[index + 3] = this.w;
  //         return this;
  //     }
  //     /**
  //      * Update the current vector from an array
  //      * @param array defines the destination array
  //      * @param index defines the offset in the destination array
  //      * @returns the current Vector3
  //      */
  //     public fromArray(array: FloatArray, index: number = 0): Vector4 {
  //         Vector4.FromArrayToRef(array, index, this);
  //         return this;
  //     }
  //     /**
  //      * Adds the given vector to the current Vector4.
  //      * @param otherVector the vector to add
  //      * @returns the updated Vector4.
  //      */
  //     public addInPlace(otherVector: DeepImmutable<Vector4>): Vector4 {
  //         this.x += otherVector.x;
  //         this.y += otherVector.y;
  //         this.z += otherVector.z;
  //         this.w += otherVector.w;
  //         return this;
  //     }
  //     /**
  //      * Returns a new Vector4 as the result of the addition of the current Vector4 and the given one.
  //      * @param otherVector the vector to add
  //      * @returns the resulting vector
  //      */
  //     public add(otherVector: DeepImmutable<Vector4>): Vector4 {
  //         return new Vector4(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z, this.w + otherVector.w);
  //     }
  //     /**
  //      * Updates the given vector "result" with the result of the addition of the current Vector4 and the given one.
  //      * @param otherVector the vector to add
  //      * @param result the vector to store the result
  //      * @returns the current Vector4.
  //      */
  //     public addToRef(otherVector: DeepImmutable<Vector4>, result: Vector4): Vector4 {
  //         result.x = this.x + otherVector.x;
  //         result.y = this.y + otherVector.y;
  //         result.z = this.z + otherVector.z;
  //         result.w = this.w + otherVector.w;
  //         return this;
  //     }
  //     /**
  //      * Subtract in place the given vector from the current Vector4.
  //      * @param otherVector the vector to subtract
  //      * @returns the updated Vector4.
  //      */
  //     public subtractInPlace(otherVector: DeepImmutable<Vector4>): Vector4 {
  //         this.x -= otherVector.x;
  //         this.y -= otherVector.y;
  //         this.z -= otherVector.z;
  //         this.w -= otherVector.w;
  //         return this;
  //     }
  //     /**
  //      * Returns a new Vector4 with the result of the subtraction of the given vector from the current Vector4.
  //      * @param otherVector the vector to add
  //      * @returns the new vector with the result
  //      */
  //     public subtract(otherVector: DeepImmutable<Vector4>): Vector4 {
  //         return new Vector4(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z, this.w - otherVector.w);
  //     }
  //     /**
  //      * Sets the given vector "result" with the result of the subtraction of the given vector from the current Vector4.
  //      * @param otherVector the vector to subtract
  //      * @param result the vector to store the result
  //      * @returns the current Vector4.
  //      */
  //     public subtractToRef(otherVector: DeepImmutable<Vector4>, result: Vector4): Vector4 {
  //         result.x = this.x - otherVector.x;
  //         result.y = this.y - otherVector.y;
  //         result.z = this.z - otherVector.z;
  //         result.w = this.w - otherVector.w;
  //         return this;
  //     }
  //     /**
  //      * Returns a new Vector4 set with the result of the subtraction of the given floats from the current Vector4 coordinates.
  //      */
  //     /**
  //      * Returns a new Vector4 set with the result of the subtraction of the given floats from the current Vector4 coordinates.
  //      * @param x value to subtract
  //      * @param y value to subtract
  //      * @param z value to subtract
  //      * @param w value to subtract
  //      * @returns new vector containing the result
  //      */
  //     public subtractFromFloats(x: number, y: number, z: number, w: number): Vector4 {
  //         return new Vector4(this.x - x, this.y - y, this.z - z, this.w - w);
  //     }
  //     /**
  //      * Sets the given vector "result" set with the result of the subtraction of the given floats from the current Vector4 coordinates.
  //      * @param x value to subtract
  //      * @param y value to subtract
  //      * @param z value to subtract
  //      * @param w value to subtract
  //      * @param result the vector to store the result in
  //      * @returns the current Vector4.
  //      */
  //     public subtractFromFloatsToRef(x: number, y: number, z: number, w: number, result: Vector4): Vector4 {
  //         result.x = this.x - x;
  //         result.y = this.y - y;
  //         result.z = this.z - z;
  //         result.w = this.w - w;
  //         return this;
  //     }
  //     /**
  //      * Returns a new Vector4 set with the current Vector4 negated coordinates.
  //      * @returns a new vector with the negated values
  //      */
  //     public negate(): Vector4 {
  //         return new Vector4(-this.x, -this.y, -this.z, -this.w);
  //     }
  //     /**
  //      * Negate this vector in place
  //      * @returns this
  //      */
  //     public negateInPlace(): Vector4 {
  //         this.x *= -1;
  //         this.y *= -1;
  //         this.z *= -1;
  //         this.w *= -1;
  //         return this;
  //     }
  //     /**
  //      * Negate the current Vector4 and stores the result in the given vector "result" coordinates
  //      * @param result defines the Vector3 object where to store the result
  //      * @returns the current Vector4
  //      */
  //     public negateToRef(result: Vector4): Vector4 {
  //         return result.copyFromFloats(this.x * -1, this.y * -1, this.z * -1, this.w * -1);
  //     }
  //     /**
  //      * Multiplies the current Vector4 coordinates by scale (float).
  //      * @param scale the number to scale with
  //      * @returns the updated Vector4.
  //      */
  //     public scaleInPlace(scale: number): Vector4 {
  //         this.x *= scale;
  //         this.y *= scale;
  //         this.z *= scale;
  //         this.w *= scale;
  //         return this;
  //     }
  //     /**
  //      * Returns a new Vector4 set with the current Vector4 coordinates multiplied by scale (float).
  //      * @param scale the number to scale with
  //      * @returns a new vector with the result
  //      */
  //     public scale(scale: number): Vector4 {
  //         return new Vector4(this.x * scale, this.y * scale, this.z * scale, this.w * scale);
  //     }
  //     /**
  //      * Sets the given vector "result" with the current Vector4 coordinates multiplied by scale (float).
  //      * @param scale the number to scale with
  //      * @param result a vector to store the result in
  //      * @returns the current Vector4.
  //      */
  //     public scaleToRef(scale: number, result: Vector4): Vector4 {
  //         result.x = this.x * scale;
  //         result.y = this.y * scale;
  //         result.z = this.z * scale;
  //         result.w = this.w * scale;
  //         return this;
  //     }
  //     /**
  //      * Scale the current Vector4 values by a factor and add the result to a given Vector4
  //      * @param scale defines the scale factor
  //      * @param result defines the Vector4 object where to store the result
  //      * @returns the unmodified current Vector4
  //      */
  //     public scaleAndAddToRef(scale: number, result: Vector4): Vector4 {
  //         result.x += this.x * scale;
  //         result.y += this.y * scale;
  //         result.z += this.z * scale;
  //         result.w += this.w * scale;
  //         return this;
  //     }
  //     /**
  //      * Boolean : True if the current Vector4 coordinates are stricly equal to the given ones.
  //      * @param otherVector the vector to compare against
  //      * @returns true if they are equal
  //      */
  //     public equals(otherVector: DeepImmutable<Vector4>): boolean {
  //         return otherVector && this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z && this.w === otherVector.w;
  //     }
  //     /**
  //      * Boolean : True if the current Vector4 coordinates are each beneath the distance "epsilon" from the given vector ones.
  //      * @param otherVector vector to compare against
  //      * @param epsilon (Default: very small number)
  //      * @returns true if they are equal
  //      */
  //     public equalsWithEpsilon(otherVector: DeepImmutable<Vector4>, epsilon: number = Epsilon): boolean {
  //         return (
  //             otherVector &&
  //             Scalar.WithinEpsilon(this.x, otherVector.x, epsilon) &&
  //             Scalar.WithinEpsilon(this.y, otherVector.y, epsilon) &&
  //             Scalar.WithinEpsilon(this.z, otherVector.z, epsilon) &&
  //             Scalar.WithinEpsilon(this.w, otherVector.w, epsilon)
  //         );
  //     }
  //     /**
  //      * Boolean : True if the given floats are strictly equal to the current Vector4 coordinates.
  //      * @param x x value to compare against
  //      * @param y y value to compare against
  //      * @param z z value to compare against
  //      * @param w w value to compare against
  //      * @returns true if equal
  //      */
  //     public equalsToFloats(x: number, y: number, z: number, w: number): boolean {
  //         return this.x === x && this.y === y && this.z === z && this.w === w;
  //     }
  //     /**
  //      * Multiplies in place the current Vector4 by the given one.
  //      * @param otherVector vector to multiple with
  //      * @returns the updated Vector4.
  //      */
  //     public multiplyInPlace(otherVector: Vector4): Vector4 {
  //         this.x *= otherVector.x;
  //         this.y *= otherVector.y;
  //         this.z *= otherVector.z;
  //         this.w *= otherVector.w;
  //         return this;
  //     }
  //     /**
  //      * Returns a new Vector4 set with the multiplication result of the current Vector4 and the given one.
  //      * @param otherVector vector to multiple with
  //      * @returns resulting new vector
  //      */
  //     public multiply(otherVector: DeepImmutable<Vector4>): Vector4 {
  //         return new Vector4(this.x * otherVector.x, this.y * otherVector.y, this.z * otherVector.z, this.w * otherVector.w);
  //     }
  //     /**
  //      * Updates the given vector "result" with the multiplication result of the current Vector4 and the given one.
  //      * @param otherVector vector to multiple with
  //      * @param result vector to store the result
  //      * @returns the current Vector4.
  //      */
  //     public multiplyToRef(otherVector: DeepImmutable<Vector4>, result: Vector4): Vector4 {
  //         result.x = this.x * otherVector.x;
  //         result.y = this.y * otherVector.y;
  //         result.z = this.z * otherVector.z;
  //         result.w = this.w * otherVector.w;
  //         return this;
  //     }
  //     /**
  //      * Returns a new Vector4 set with the multiplication result of the given floats and the current Vector4 coordinates.
  //      * @param x x value multiply with
  //      * @param y y value multiply with
  //      * @param z z value multiply with
  //      * @param w w value multiply with
  //      * @returns resulting new vector
  //      */
  //     public multiplyByFloats(x: number, y: number, z: number, w: number): Vector4 {
  //         return new Vector4(this.x * x, this.y * y, this.z * z, this.w * w);
  //     }
  //     /**
  //      * Returns a new Vector4 set with the division result of the current Vector4 by the given one.
  //      * @param otherVector vector to devide with
  //      * @returns resulting new vector
  //      */
  //     public divide(otherVector: DeepImmutable<Vector4>): Vector4 {
  //         return new Vector4(this.x / otherVector.x, this.y / otherVector.y, this.z / otherVector.z, this.w / otherVector.w);
  //     }
  //     /**
  //      * Updates the given vector "result" with the division result of the current Vector4 by the given one.
  //      * @param otherVector vector to devide with
  //      * @param result vector to store the result
  //      * @returns the current Vector4.
  //      */
  //     public divideToRef(otherVector: DeepImmutable<Vector4>, result: Vector4): Vector4 {
  //         result.x = this.x / otherVector.x;
  //         result.y = this.y / otherVector.y;
  //         result.z = this.z / otherVector.z;
  //         result.w = this.w / otherVector.w;
  //         return this;
  //     }
  //     /**
  //      * Divides the current Vector3 coordinates by the given ones.
  //      * @param otherVector vector to devide with
  //      * @returns the updated Vector3.
  //      */
  //     public divideInPlace(otherVector: DeepImmutable<Vector4>): Vector4 {
  //         return this.divideToRef(otherVector, this);
  //     }
  //     /**
  //      * Updates the Vector4 coordinates with the minimum values between its own and the given vector ones
  //      * @param other defines the second operand
  //      * @returns the current updated Vector4
  //      */
  //     public minimizeInPlace(other: DeepImmutable<Vector4>): Vector4 {
  //         if (other.x < this.x) {
  //             this.x = other.x;
  //         }
  //         if (other.y < this.y) {
  //             this.y = other.y;
  //         }
  //         if (other.z < this.z) {
  //             this.z = other.z;
  //         }
  //         if (other.w < this.w) {
  //             this.w = other.w;
  //         }
  //         return this;
  //     }
  //     /**
  //      * Updates the Vector4 coordinates with the maximum values between its own and the given vector ones
  //      * @param other defines the second operand
  //      * @returns the current updated Vector4
  //      */
  //     public maximizeInPlace(other: DeepImmutable<Vector4>): Vector4 {
  //         if (other.x > this.x) {
  //             this.x = other.x;
  //         }
  //         if (other.y > this.y) {
  //             this.y = other.y;
  //         }
  //         if (other.z > this.z) {
  //             this.z = other.z;
  //         }
  //         if (other.w > this.w) {
  //             this.w = other.w;
  //         }
  //         return this;
  //     }
  //     /**
  //      * Gets a new Vector4 from current Vector4 floored values
  //      * @returns a new Vector4
  //      */
  //     public floor(): Vector4 {
  //         return new Vector4(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z), Math.floor(this.w));
  //     }
  //     /**
  //      * Gets a new Vector4 from current Vector4 fractional values
  //      * @returns a new Vector4
  //      */
  //     public fract(): Vector4 {
  //         return new Vector4(this.x - Math.floor(this.x), this.y - Math.floor(this.y), this.z - Math.floor(this.z), this.w - Math.floor(this.w));
  //     }
  //     // Properties
  //     /**
  //      * Returns the Vector4 length (float).
  //      * @returns the length
  //      */
  //     public length(): number {
  //         return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  //     }
  //     /**
  //      * Returns the Vector4 squared length (float).
  //      * @returns the length squared
  //      */
  //     public lengthSquared(): number {
  //         return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  //     }
  //     // Methods
  //     /**
  //      * Normalizes in place the Vector4.
  //      * @returns the updated Vector4.
  //      */
  //     public normalize(): Vector4 {
  //         const len = this.length();
  //         if (len === 0) {
  //             return this;
  //         }
  //         return this.scaleInPlace(1.0 / len);
  //     }
  //     /**
  //      * Returns a new Vector3 from the Vector4 (x, y, z) coordinates.
  //      * @returns this converted to a new vector3
  //      */
  //     public toVector3(): Vector3 {
  //         return new Vector3(this.x, this.y, this.z);
  //     }
  //     /**
  //      * Returns a new Vector4 copied from the current one.
  //      * @returns the new cloned vector
  //      */
  //     public clone(): Vector4 {
  //         return new Vector4(this.x, this.y, this.z, this.w);
  //     }
  //     /**
  //      * Updates the current Vector4 with the given one coordinates.
  //      * @param source the source vector to copy from
  //      * @returns the updated Vector4.
  //      */
  //     public copyFrom(source: DeepImmutable<Vector4>): Vector4 {
  //         this.x = source.x;
  //         this.y = source.y;
  //         this.z = source.z;
  //         this.w = source.w;
  //         return this;
  //     }
  //     /**
  //      * Updates the current Vector4 coordinates with the given floats.
  //      * @param x float to copy from
  //      * @param y float to copy from
  //      * @param z float to copy from
  //      * @param w float to copy from
  //      * @returns the updated Vector4.
  //      */
  //     public copyFromFloats(x: number, y: number, z: number, w: number): Vector4 {
  //         this.x = x;
  //         this.y = y;
  //         this.z = z;
  //         this.w = w;
  //         return this;
  //     }
  //     /**
  //      * Updates the current Vector4 coordinates with the given floats.
  //      * @param x float to set from
  //      * @param y float to set from
  //      * @param z float to set from
  //      * @param w float to set from
  //      * @returns the updated Vector4.
  //      */
  //     public set(x: number, y: number, z: number, w: number): Vector4 {
  //         return this.copyFromFloats(x, y, z, w);
  //     }
  //     /**
  //      * Copies the given float to the current Vector3 coordinates
  //      * @param v defines the x, y, z and w coordinates of the operand
  //      * @returns the current updated Vector3
  //      */
  //     public setAll(v: number): Vector4 {
  //         this.x = this.y = this.z = this.w = v;
  //         return this;
  //     }
  //     // Statics
  //     /**
  //      * Returns a new Vector4 set from the starting index of the given array.
  //      * @param array the array to pull values from
  //      * @param offset the offset into the array to start at
  //      * @returns the new vector
  //      */
  //     public static FromArray(array: DeepImmutable<ArrayLike<number>>, offset?: number): Vector4 {
  //         if (!offset) {
  //             offset = 0;
  //         }
  //         return new Vector4(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);
  //     }
  //     /**
  //      * Updates the given vector "result" from the starting index of the given array.
  //      * @param array the array to pull values from
  //      * @param offset the offset into the array to start at
  //      * @param result the vector to store the result in
  //      */
  //     public static FromArrayToRef(array: DeepImmutable<ArrayLike<number>>, offset: number, result: Vector4): void {
  //         result.x = array[offset];
  //         result.y = array[offset + 1];
  //         result.z = array[offset + 2];
  //         result.w = array[offset + 3];
  //     }
  //     /**
  //      * Updates the given vector "result" from the starting index of the given Float32Array.
  //      * @param array the array to pull values from
  //      * @param offset the offset into the array to start at
  //      * @param result the vector to store the result in
  //      */
  //     public static FromFloatArrayToRef(array: DeepImmutable<Float32Array>, offset: number, result: Vector4): void {
  //         Vector4.FromArrayToRef(array, offset, result);
  //     }
  //     /**
  //      * Updates the given vector "result" coordinates from the given floats.
  //      * @param x float to set from
  //      * @param y float to set from
  //      * @param z float to set from
  //      * @param w float to set from
  //      * @param result the vector to the floats in
  //      */
  //     public static FromFloatsToRef(x: number, y: number, z: number, w: number, result: Vector4): void {
  //         result.x = x;
  //         result.y = y;
  //         result.z = z;
  //         result.w = w;
  //     }
  //     /**
  //      * Returns a new Vector4 set to (0.0, 0.0, 0.0, 0.0)
  //      * @returns the new vector
  //      */
  //     public static Zero(): Vector4 {
  //         return new Vector4(0.0, 0.0, 0.0, 0.0);
  //     }
  //     /**
  //      * Returns a new Vector4 set to (1.0, 1.0, 1.0, 1.0)
  //      * @returns the new vector
  //      */
  //     public static One(): Vector4 {
  //         return new Vector4(1.0, 1.0, 1.0, 1.0);
  //     }
  //     /**
  //      * Gets a zero Vector4 that must not be updated
  //      */
  //     public static get ZeroReadOnly(): DeepImmutable<Vector4> {
  //         return Vector4._ZeroReadOnly;
  //     }
  //     /**
  //      * Returns a new normalized Vector4 from the given one.
  //      * @param vector the vector to normalize
  //      * @returns the vector
  //      */
  //     public static Normalize(vector: DeepImmutable<Vector4>): Vector4 {
  //         const result = Vector4.Zero();
  //         Vector4.NormalizeToRef(vector, result);
  //         return result;
  //     }
  //     /**
  //      * Updates the given vector "result" from the normalization of the given one.
  //      * @param vector the vector to normalize
  //      * @param result the vector to store the result in
  //      */
  //     public static NormalizeToRef(vector: DeepImmutable<Vector4>, result: Vector4): void {
  //         result.copyFrom(vector);
  //         result.normalize();
  //     }
  //     /**
  //      * Returns a vector with the minimum values from the left and right vectors
  //      * @param left left vector to minimize
  //      * @param right right vector to minimize
  //      * @returns a new vector with the minimum of the left and right vector values
  //      */
  //     public static Minimize(left: DeepImmutable<Vector4>, right: DeepImmutable<Vector4>): Vector4 {
  //         const min = left.clone();
  //         min.minimizeInPlace(right);
  //         return min;
  //     }
  //     /**
  //      * Returns a vector with the maximum values from the left and right vectors
  //      * @param left left vector to maximize
  //      * @param right right vector to maximize
  //      * @returns a new vector with the maximum of the left and right vector values
  //      */
  //     public static Maximize(left: DeepImmutable<Vector4>, right: DeepImmutable<Vector4>): Vector4 {
  //         const max = left.clone();
  //         max.maximizeInPlace(right);
  //         return max;
  //     }
  //     /**
  //      * Returns the distance (float) between the vectors "value1" and "value2".
  //      * @param value1 value to calulate the distance between
  //      * @param value2 value to calulate the distance between
  //      * @return the distance between the two vectors
  //      */
  //     public static Distance(value1: DeepImmutable<Vector4>, value2: DeepImmutable<Vector4>): number {
  //         return Math.sqrt(Vector4.DistanceSquared(value1, value2));
  //     }
  //     /**
  //      * Returns the squared distance (float) between the vectors "value1" and "value2".
  //      * @param value1 value to calulate the distance between
  //      * @param value2 value to calulate the distance between
  //      * @return the distance between the two vectors squared
  //      */
  //     public static DistanceSquared(value1: DeepImmutable<Vector4>, value2: DeepImmutable<Vector4>): number {
  //         const x = value1.x - value2.x;
  //         const y = value1.y - value2.y;
  //         const z = value1.z - value2.z;
  //         const w = value1.w - value2.w;
  //         return x * x + y * y + z * z + w * w;
  //     }
  //     /**
  //      * Returns a new Vector4 located at the center between the vectors "value1" and "value2".
  //      * @param value1 value to calulate the center between
  //      * @param value2 value to calulate the center between
  //      * @return the center between the two vectors
  //      */
  //     public static Center(value1: DeepImmutable<Vector4>, value2: DeepImmutable<Vector4>): Vector4 {
  //         return Vector4.CenterToRef(value1, value2, Vector4.Zero());
  //     }
  //     /**
  //      * Gets the center of the vectors "value1" and "value2" and stores the result in the vector "ref"
  //      * @param value1 defines first vector
  //      * @param value2 defines second vector
  //      * @param ref defines third vector
  //      * @returns ref
  //      */
  //     public static CenterToRef(value1: DeepImmutable<Vector4>, value2: DeepImmutable<Vector4>, ref: DeepImmutable<Vector4>): Vector4 {
  //         return ref.copyFromFloats((value1.x + value2.x) / 2, (value1.y + value2.y) / 2, (value1.z + value2.z) / 2, (value1.w + value2.w) / 2);
  //     }
  //     /**
  //      * Returns a new Vector4 set with the result of the transformation by the given matrix of the given vector.
  //      * This method computes tranformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
  //      * The difference with Vector3.TransformCoordinates is that the w component is not used to divide the other coordinates but is returned in the w coordinate instead
  //      * @param vector defines the Vector3 to transform
  //      * @param transformation defines the transformation matrix
  //      * @returns the transformed Vector4
  //      */
  //     public static TransformCoordinates(vector: DeepImmutable<Vector3>, transformation: DeepImmutable<Matrix>): Vector4 {
  //         const result = Vector4.Zero();
  //         Vector4.TransformCoordinatesToRef(vector, transformation, result);
  //         return result;
  //     }
  //     /**
  //      * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given vector
  //      * This method computes tranformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
  //      * The difference with Vector3.TransformCoordinatesToRef is that the w component is not used to divide the other coordinates but is returned in the w coordinate instead
  //      * @param vector defines the Vector3 to transform
  //      * @param transformation defines the transformation matrix
  //      * @param result defines the Vector4 where to store the result
  //      */
  //     public static TransformCoordinatesToRef(vector: DeepImmutable<Vector3>, transformation: DeepImmutable<Matrix>, result: Vector4): void {
  //         Vector4.TransformCoordinatesFromFloatsToRef(vector._x, vector._y, vector._z, transformation, result);
  //     }
  //     /**
  //      * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given floats (x, y, z)
  //      * This method computes tranformed coordinates only, not transformed direction vectors
  //      * The difference with Vector3.TransformCoordinatesFromFloatsToRef is that the w component is not used to divide the other coordinates but is returned in the w coordinate instead
  //      * @param x define the x coordinate of the source vector
  //      * @param y define the y coordinate of the source vector
  //      * @param z define the z coordinate of the source vector
  //      * @param transformation defines the transformation matrix
  //      * @param result defines the Vector4 where to store the result
  //      */
  //     public static TransformCoordinatesFromFloatsToRef(x: number, y: number, z: number, transformation: DeepImmutable<Matrix>, result: Vector4): void {
  //         const m = transformation.m;
  //         const rx = x * m[0] + y * m[4] + z * m[8] + m[12];
  //         const ry = x * m[1] + y * m[5] + z * m[9] + m[13];
  //         const rz = x * m[2] + y * m[6] + z * m[10] + m[14];
  //         const rw = x * m[3] + y * m[7] + z * m[11] + m[15];
  //         result.x = rx;
  //         result.y = ry;
  //         result.z = rz;
  //         result.w = rw;
  //     }
  //     /**
  //      * Returns a new Vector4 set with the result of the normal transformation by the given matrix of the given vector.
  //      * This methods computes transformed normalized direction vectors only.
  //      * @param vector the vector to transform
  //      * @param transformation the transformation matrix to apply
  //      * @returns the new vector
  //      */
  //     public static TransformNormal(vector: DeepImmutable<Vector4>, transformation: DeepImmutable<Matrix>): Vector4 {
  //         const result = Vector4.Zero();
  //         Vector4.TransformNormalToRef(vector, transformation, result);
  //         return result;
  //     }
  //     /**
  //      * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given vector.
  //      * This methods computes transformed normalized direction vectors only.
  //      * @param vector the vector to transform
  //      * @param transformation the transformation matrix to apply
  //      * @param result the vector to store the result in
  //      */
  //     public static TransformNormalToRef(vector: DeepImmutable<Vector4>, transformation: DeepImmutable<Matrix>, result: Vector4): void {
  //         const m = transformation.m;
  //         const x = vector.x * m[0] + vector.y * m[4] + vector.z * m[8];
  //         const y = vector.x * m[1] + vector.y * m[5] + vector.z * m[9];
  //         const z = vector.x * m[2] + vector.y * m[6] + vector.z * m[10];
  //         result.x = x;
  //         result.y = y;
  //         result.z = z;
  //         result.w = vector.w;
  //     }
  //     /**
  //      * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given floats (x, y, z, w).
  //      * This methods computes transformed normalized direction vectors only.
  //      * @param x value to transform
  //      * @param y value to transform
  //      * @param z value to transform
  //      * @param w value to transform
  //      * @param transformation the transformation matrix to apply
  //      * @param result the vector to store the results in
  //      */
  //     public static TransformNormalFromFloatsToRef(x: number, y: number, z: number, w: number, transformation: DeepImmutable<Matrix>, result: Vector4): void {
  //         const m = transformation.m;
  //         result.x = x * m[0] + y * m[4] + z * m[8];
  //         result.y = x * m[1] + y * m[5] + z * m[9];
  //         result.z = x * m[2] + y * m[6] + z * m[10];
  //         result.w = w;
  //     }
  //     /**
  //      * Creates a new Vector4 from a Vector3
  //      * @param source defines the source data
  //      * @param w defines the 4th component (default is 0)
  //      * @returns a new Vector4
  //      */
  //     public static FromVector3(source: Vector3, w: number = 0) {
  //         return new Vector4(source._x, source._y, source._z, w);
  //     }
}

// /**
//  * @hidden
//  * Same as Tmp but not exported to keep it only for math functions to avoid conflicts
//  */
// class MathTmp {
//     public static Vector3 = ArrayTools.BuildTuple(11, Vector3.Zero);
//     public static Matrix = ArrayTools.BuildTuple(2, Matrix.Identity);
//     public static Quaternion = ArrayTools.BuildTuple(3, Quaternion.Zero);
// }

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
