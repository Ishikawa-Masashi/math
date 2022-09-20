/* eslint-disable @typescript-eslint/naming-convention */
// import { Scalar } from "./math.scalar";
import { Epsilon } from './constants';
import { ReadonlyVector2Like } from './like';
// import type { Viewport } from "./math.viewport";
import type { DeepImmutable, Nullable, FloatArray, float } from './types';
import { Vector3 } from './vector3';
import { Scalar } from './scalar';
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
 * Class representing a vector containing 2 coordinates
 */
export class Vector2 {
  private static _ZeroReadOnly = Vector2.zero() as DeepImmutable<Vector2>;

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
   * Gets a string with the Vector2 coordinates
   * @returns a string with the Vector2 coordinates
   */
  public toString(): string {
    return `{X: ${this.x} Y: ${this.y}}`;
  }

  /**
   * Gets class name
   * @returns the string "Vector2"
   */
  public getClassName(): string {
    return 'Vector2';
  }

  /**
   * Gets current vector hash code
   * @returns the Vector2 hash code as a number
   */
  public getHashCode(): number {
    const x = _ExtractAsInt(this.x);
    const y = _ExtractAsInt(this.y);
    let hash = x;
    hash = (hash * 397) ^ y;
    return hash;
  }

  // Operators

  /**
   * Sets the Vector2 coordinates in the given array or Float32Array from the given index.
   * @param array defines the source array
   * @param index defines the offset in source array
   * @returns the current Vector2
   */
  public toArray(array: FloatArray, index = 0): Vector2 {
    array[index] = this.x;
    array[index + 1] = this.y;
    return this;
  }

  /**
   * Update the current vector from an array
   * @param array defines the destination array
   * @param index defines the offset in the destination array
   * @returns the current Vector3
   */
  public fromArray(array: FloatArray, index = 0): Vector2 {
    Vector2.FromArrayToRef(array, index, this);
    return this;
  }

  /**
   * Copy the current vector to an array
   * @returns a new array with 2 elements: the Vector2 coordinates.
   */
  public asArray(): number[] {
    const result = new Array<number>();
    this.toArray(result, 0);
    return result;
  }

  /**
   * Sets the Vector2 coordinates with the given Vector2 coordinates
   * @param source defines the source Vector2
   * @returns the current updated Vector2
   */
  public copyFrom(source: DeepImmutable<Vector2>): Vector2 {
    this.x = source.x;
    this.y = source.y;
    return this;
  }

  /**
   * Sets the Vector2 coordinates with the given floats
   * @param x defines the first coordinate
   * @param y defines the second coordinate
   * @returns the current updated Vector2
   */
  public copyFromFloats(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Sets the Vector2 coordinates with the given floats
   * @param x defines the first coordinate
   * @param y defines the second coordinate
   * @returns the current updated Vector2
   */
  public set(x: number, y: number): Vector2 {
    return this.copyFromFloats(x, y);
  }

  /**
   * Add another vector with the current one
   * @param otherVector defines the other vector
   * @returns a new Vector2 set with the addition of the current Vector2 and the given one coordinates
   */
  public add(otherVector: DeepImmutable<Vector2>): Vector2 {
    return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
  }

  /**
   * Sets the "result" coordinates with the addition of the current Vector2 and the given one coordinates
   * @param otherVector defines the other vector
   * @param result defines the target vector
   * @returns the unmodified current Vector2
   */
  public addToRef(
    otherVector: DeepImmutable<Vector2>,
    result: Vector2
  ): Vector2 {
    result.x = this.x + otherVector.x;
    result.y = this.y + otherVector.y;
    return this;
  }

  /**
   * Set the Vector2 coordinates by adding the given Vector2 coordinates
   * @param otherVector defines the other vector
   * @returns the current updated Vector2
   */
  public addInPlace(otherVector: DeepImmutable<Vector2>): Vector2 {
    this.x += otherVector.x;
    this.y += otherVector.y;
    return this;
  }

  /**
   * Gets a new Vector2 by adding the current Vector2 coordinates to the given Vector3 x, y coordinates
   * @param otherVector defines the other vector
   * @returns a new Vector2
   */
  public addVector3(otherVector: Vector3): Vector2 {
    return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
  }

  /**
   * Gets a new Vector2 set with the subtracted coordinates of the given one from the current Vector2
   * @param otherVector defines the other vector
   * @returns a new Vector2
   */
  public subtract(otherVector: Vector2): Vector2 {
    return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
  }

  /**
   * Sets the "result" coordinates with the subtraction of the given one from the current Vector2 coordinates.
   * @param otherVector defines the other vector
   * @param result defines the target vector
   * @returns the unmodified current Vector2
   */
  public subtractToRef(
    otherVector: DeepImmutable<Vector2>,
    result: Vector2
  ): Vector2 {
    result.x = this.x - otherVector.x;
    result.y = this.y - otherVector.y;
    return this;
  }

  /**
   * Sets the current Vector2 coordinates by subtracting from it the given one coordinates
   * @param otherVector defines the other vector
   * @returns the current updated Vector2
   */
  public subtractInPlace(otherVector: DeepImmutable<Vector2>): Vector2 {
    this.x -= otherVector.x;
    this.y -= otherVector.y;
    return this;
  }

  /**
   * Multiplies in place the current Vector2 coordinates by the given ones
   * @param otherVector defines the other vector
   * @returns the current updated Vector2
   */
  public multiplyInPlace(otherVector: DeepImmutable<Vector2>): Vector2 {
    this.x *= otherVector.x;
    this.y *= otherVector.y;
    return this;
  }

  /**
   * Returns a new Vector2 set with the multiplication of the current Vector2 and the given one coordinates
   * @param otherVector defines the other vector
   * @returns a new Vector2
   */
  public multiply(otherVector: DeepImmutable<Vector2>): Vector2 {
    return new Vector2(this.x * otherVector.x, this.y * otherVector.y);
  }

  /**
   * Sets "result" coordinates with the multiplication of the current Vector2 and the given one coordinates
   * @param otherVector defines the other vector
   * @param result defines the target vector
   * @returns the unmodified current Vector2
   */
  public multiplyToRef(
    otherVector: DeepImmutable<Vector2>,
    result: Vector2
  ): Vector2 {
    result.x = this.x * otherVector.x;
    result.y = this.y * otherVector.y;
    return this;
  }

  /**
   * Gets a new Vector2 set with the Vector2 coordinates multiplied by the given floats
   * @param x defines the first coordinate
   * @param y defines the second coordinate
   * @returns a new Vector2
   */
  public multiplyByFloats(x: number, y: number): Vector2 {
    return new Vector2(this.x * x, this.y * y);
  }

  /**
   * Returns a new Vector2 set with the Vector2 coordinates divided by the given one coordinates
   * @param otherVector defines the other vector
   * @returns a new Vector2
   */
  public divide(otherVector: Vector2): Vector2 {
    return new Vector2(this.x / otherVector.x, this.y / otherVector.y);
  }

  /**
   * Sets the "result" coordinates with the Vector2 divided by the given one coordinates
   * @param otherVector defines the other vector
   * @param result defines the target vector
   * @returns the unmodified current Vector2
   */
  public divideToRef(
    otherVector: DeepImmutable<Vector2>,
    result: Vector2
  ): Vector2 {
    result.x = this.x / otherVector.x;
    result.y = this.y / otherVector.y;
    return this;
  }

  /**
   * Divides the current Vector2 coordinates by the given ones
   * @param otherVector defines the other vector
   * @returns the current updated Vector2
   */
  public divideInPlace(otherVector: DeepImmutable<Vector2>): Vector2 {
    return this.divideToRef(otherVector, this);
  }

  /**
   * Gets a new Vector2 with current Vector2 negated coordinates
   * @returns a new Vector2
   */
  public negate(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

  /**
   * Negate this vector in place
   * @returns this
   */
  public negateInPlace(): Vector2 {
    this.x *= -1;
    this.y *= -1;
    return this;
  }

  /**
   * Negate the current Vector2 and stores the result in the given vector "result" coordinates
   * @param result defines the Vector3 object where to store the result
   * @returns the current Vector2
   */
  public negateToRef(result: Vector2): Vector2 {
    return result.copyFromFloats(this.x * -1, this.y * -1);
  }

  /**
   * Multiply the Vector2 coordinates by scale
   * @param scale defines the scaling factor
   * @returns the current updated Vector2
   */
  public scaleInPlace(scale: number): Vector2 {
    this.x *= scale;
    this.y *= scale;
    return this;
  }

  /**
   * Returns a new Vector2 scaled by "scale" from the current Vector2
   * @param scale defines the scaling factor
   * @returns a new Vector2
   */
  public scale(scale: number): Vector2 {
    const result = new Vector2(0, 0);
    this.scaleToRef(scale, result);
    return result;
  }

  /**
   * Scale the current Vector2 values by a factor to a given Vector2
   * @param scale defines the scale factor
   * @param result defines the Vector2 object where to store the result
   * @returns the unmodified current Vector2
   */
  public scaleToRef(scale: number, result: Vector2): Vector2 {
    result.x = this.x * scale;
    result.y = this.y * scale;
    return this;
  }

  /**
   * Scale the current Vector2 values by a factor and add the result to a given Vector2
   * @param scale defines the scale factor
   * @param result defines the Vector2 object where to store the result
   * @returns the unmodified current Vector2
   */
  public scaleAndAddToRef(scale: number, result: Vector2): Vector2 {
    result.x += this.x * scale;
    result.y += this.y * scale;
    return this;
  }

  /**
   * Gets a boolean if two vectors are equals
   * @param otherVector defines the other vector
   * @returns true if the given vector coordinates strictly equal the current Vector2 ones
   */
  public equals(otherVector: DeepImmutable<Vector2>): boolean {
    return otherVector && this.x === otherVector.x && this.y === otherVector.y;
  }

  /**
   * Gets a boolean if two vectors are equals (using an epsilon value)
   * @param otherVector defines the other vector
   * @param epsilon defines the minimal distance to consider equality
   * @returns true if the given vector coordinates are close to the current ones by a distance of epsilon.
   */
  public equalsWithEpsilon(
    otherVector: DeepImmutable<Vector2>,
    epsilon: number = Epsilon
  ): boolean {
    return (
      otherVector &&
      Scalar.WithinEpsilon(this.x, otherVector.x, epsilon) &&
      Scalar.WithinEpsilon(this.y, otherVector.y, epsilon)
    );
  }

  //     /**
  //      * Gets a new Vector2 from current Vector2 floored values
  //      * eg (1.2, 2.31) returns (1, 2)
  //      * @returns a new Vector2
  //      */
  //     public floor(): Vector2 {
  //         return new Vector2(Math.floor(this.x), Math.floor(this.y));
  //     }
  //     /**
  //      * Gets a new Vector2 from current Vector2 fractional values
  //      * eg (1.2, 2.31) returns (0.2, 0.31)
  //      * @returns a new Vector2
  //      */
  //     public fract(): Vector2 {
  //         return new Vector2(this.x - Math.floor(this.x), this.y - Math.floor(this.y));
  //     }

  /**
   * Rotate the current vector into a given result vector
   * @param angle defines the rotation angle
   * @param result defines the result vector where to store the rotated vector
   * @returns the current vector
   */
  public rotateToRef(angle: number, result: Vector2) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    result.x = cos * this.x - sin * this.y;
    result.y = sin * this.x + cos * this.y;
    return this;
  }

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

  //     // Methods
  //     /**
  //      * Normalize the vector
  //      * @returns the current updated Vector2
  //      */
  //     public normalize(): Vector2 {
  //         Vector2.NormalizeToRef(this, this);
  //         return this;
  //     }

  /**
   * Gets a new Vector2 copied from the Vector2
   * @returns a new Vector2
   */
  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  // Statics

  /**
   * Gets a new Vector2(0, 0)
   * @returns a new Vector2
   */
  public static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  /**
   * Gets a new Vector2(1, 1)
   * @returns a new Vector2
   */
  public static one(): Vector2 {
    return new Vector2(1, 1);
  }

  //     /**
  //      * Gets a zero Vector2 that must not be updated
  //      */
  //     public static get ZeroReadOnly(): DeepImmutable<Vector2> {
  //         return Vector2._ZeroReadOnly;
  //     }
  //     /**
  //      * Gets a new Vector2 set from the given index element of the given array
  //      * @param array defines the data source
  //      * @param offset defines the offset in the data source
  //      * @returns a new Vector2
  //      */
  //     public static FromArray(array: DeepImmutable<ArrayLike<number>>, offset: number = 0): Vector2 {
  //         return new Vector2(array[offset], array[offset + 1]);
  //     }

  /**
   * Sets "result" from the given index element of the given array
   * @param array defines the data source
   * @param offset defines the offset in the data source
   * @param result defines the target vector
   */
  public static FromArrayToRef(
    array: DeepImmutable<ArrayLike<number>>,
    offset: number,
    result: Vector2
  ): void {
    result.x = array[offset];
    result.y = array[offset + 1];
  }

  //     /**
  //      * Gets a new Vector2 located for "amount" (float) on the CatmullRom spline defined by the given four Vector2
  //      * @param value1 defines 1st point of control
  //      * @param value2 defines 2nd point of control
  //      * @param value3 defines 3rd point of control
  //      * @param value4 defines 4th point of control
  //      * @param amount defines the interpolation factor
  //      * @returns a new Vector2
  //      */
  //     public static CatmullRom(
  //         value1: DeepImmutable<Vector2>,
  //         value2: DeepImmutable<Vector2>,
  //         value3: DeepImmutable<Vector2>,
  //         value4: DeepImmutable<Vector2>,
  //         amount: number
  //     ): Vector2 {
  //         const squared = amount * amount;
  //         const cubed = amount * squared;
  //         const x =
  //             0.5 *
  //             (2.0 * value2.x +
  //                 (-value1.x + value3.x) * amount +
  //                 (2.0 * value1.x - 5.0 * value2.x + 4.0 * value3.x - value4.x) * squared +
  //                 (-value1.x + 3.0 * value2.x - 3.0 * value3.x + value4.x) * cubed);
  //         const y =
  //             0.5 *
  //             (2.0 * value2.y +
  //                 (-value1.y + value3.y) * amount +
  //                 (2.0 * value1.y - 5.0 * value2.y + 4.0 * value3.y - value4.y) * squared +
  //                 (-value1.y + 3.0 * value2.y - 3.0 * value3.y + value4.y) * cubed);
  //         return new Vector2(x, y);
  //     }
  //     /**
  //      * Returns a new Vector2 set with same the coordinates than "value" ones if the vector "value" is in the square defined by "min" and "max".
  //      * If a coordinate of "value" is lower than "min" coordinates, the returned Vector2 is given this "min" coordinate.
  //      * If a coordinate of "value" is greater than "max" coordinates, the returned Vector2 is given this "max" coordinate
  //      * @param value defines the value to clamp
  //      * @param min defines the lower limit
  //      * @param max defines the upper limit
  //      * @returns a new Vector2
  //      */
  //     public static Clamp(value: DeepImmutable<Vector2>, min: DeepImmutable<Vector2>, max: DeepImmutable<Vector2>): Vector2 {
  //         let x = value.x;
  //         x = x > max.x ? max.x : x;
  //         x = x < min.x ? min.x : x;
  //         let y = value.y;
  //         y = y > max.y ? max.y : y;
  //         y = y < min.y ? min.y : y;
  //         return new Vector2(x, y);
  //     }
  //     /**
  //      * Returns a new Vector2 located for "amount" (float) on the Hermite spline defined by the vectors "value1", "value2", "tangent1", "tangent2"
  //      * @param value1 defines the 1st control point
  //      * @param tangent1 defines the outgoing tangent
  //      * @param value2 defines the 2nd control point
  //      * @param tangent2 defines the incoming tangent
  //      * @param amount defines the interpolation factor
  //      * @returns a new Vector2
  //      */
  //     public static Hermite(
  //         value1: DeepImmutable<Vector2>,
  //         tangent1: DeepImmutable<Vector2>,
  //         value2: DeepImmutable<Vector2>,
  //         tangent2: DeepImmutable<Vector2>,
  //         amount: number
  //     ): Vector2 {
  //         const squared = amount * amount;
  //         const cubed = amount * squared;
  //         const part1 = 2.0 * cubed - 3.0 * squared + 1.0;
  //         const part2 = -2.0 * cubed + 3.0 * squared;
  //         const part3 = cubed - 2.0 * squared + amount;
  //         const part4 = cubed - squared;
  //         const x = value1.x * part1 + value2.x * part2 + tangent1.x * part3 + tangent2.x * part4;
  //         const y = value1.y * part1 + value2.y * part2 + tangent1.y * part3 + tangent2.y * part4;
  //         return new Vector2(x, y);
  //     }
  //     /**
  //      * Returns a new Vector2 which is the 1st derivative of the Hermite spline defined by the vectors "value1", "value2", "tangent1", "tangent2".
  //      * @param value1 defines the first control point
  //      * @param tangent1 defines the first tangent
  //      * @param value2 defines the second control point
  //      * @param tangent2 defines the second tangent
  //      * @param time define where the derivative must be done
  //      * @returns 1st derivative
  //      */
  //     public static Hermite1stDerivative(
  //         value1: DeepImmutable<Vector2>,
  //         tangent1: DeepImmutable<Vector2>,
  //         value2: DeepImmutable<Vector2>,
  //         tangent2: DeepImmutable<Vector2>,
  //         time: number
  //     ): Vector2 {
  //         const result = Vector2.Zero();
  //         this.Hermite1stDerivativeToRef(value1, tangent1, value2, tangent2, time, result);
  //         return result;
  //     }
  //     /**
  //      * Returns a new Vector2 which is the 1st derivative of the Hermite spline defined by the vectors "value1", "value2", "tangent1", "tangent2".
  //      * @param value1 defines the first control point
  //      * @param tangent1 defines the first tangent
  //      * @param value2 defines the second control point
  //      * @param tangent2 defines the second tangent
  //      * @param time define where the derivative must be done
  //      * @param result define where the derivative will be stored
  //      */
  //     public static Hermite1stDerivativeToRef(
  //         value1: DeepImmutable<Vector2>,
  //         tangent1: DeepImmutable<Vector2>,
  //         value2: DeepImmutable<Vector2>,
  //         tangent2: DeepImmutable<Vector2>,
  //         time: number,
  //         result: Vector2
  //     ) {
  //         const t2 = time * time;
  //         result.x = (t2 - time) * 6 * value1.x + (3 * t2 - 4 * time + 1) * tangent1.x + (-t2 + time) * 6 * value2.x + (3 * t2 - 2 * time) * tangent2.x;
  //         result.y = (t2 - time) * 6 * value1.y + (3 * t2 - 4 * time + 1) * tangent1.y + (-t2 + time) * 6 * value2.y + (3 * t2 - 2 * time) * tangent2.y;
  //     }
  //     /**
  //      * Returns a new Vector2 located for "amount" (float) on the linear interpolation between the vector "start" adn the vector "end".
  //      * @param start defines the start vector
  //      * @param end defines the end vector
  //      * @param amount defines the interpolation factor
  //      * @returns a new Vector2
  //      */
  //     public static Lerp(start: DeepImmutable<Vector2>, end: DeepImmutable<Vector2>, amount: number): Vector2 {
  //         const x = start.x + (end.x - start.x) * amount;
  //         const y = start.y + (end.y - start.y) * amount;
  //         return new Vector2(x, y);
  //     }

  /**
   * Gets the dot product of the vector "left" and the vector "right"
   * @param left defines first vector
   * @param right defines second vector
   * @returns the dot product (float)
   */
  public static dot(
    left: ReadonlyVector2Like,
    right: ReadonlyVector2Like
  ): number {
    return left.x * right.x + left.y * right.y;
  }

  /**
   * Gets the dot product of the vector "left" and the vector "right"
   * @param left defines first vector
   * @param right defines second vector
   * @returns the dot product (float)
   */
  public static Dot(
    left: DeepImmutable<Vector2>,
    right: DeepImmutable<Vector2>
  ): number {
    return left.x * right.x + left.y * right.y;
  }

  //     /**
  //      * Returns a new Vector2 equal to the normalized given vector
  //      * @param vector defines the vector to normalize
  //      * @returns a new Vector2
  //      */
  //     public static Normalize(vector: DeepImmutable<Vector2>): Vector2 {
  //         const newVector = Vector2.Zero();
  //         this.NormalizeToRef(vector, newVector);
  //         return newVector;
  //     }

  /**
   * Normalize a given vector into a second one
   * @param vector defines the vector to normalize
   * @param result defines the vector where to store the result
   */
  public static normalizeToRef(
    vector: DeepImmutable<Vector2>,
    result: Vector2
  ) {
    const len = vector.length();
    if (len === 0) {
      return;
    }
    result.x = vector.x / len;
    result.y = vector.y / len;
  }

  //     /**
  //      * Gets a new Vector2 set with the minimal coordinate values from the "left" and "right" vectors
  //      * @param left defines 1st vector
  //      * @param right defines 2nd vector
  //      * @returns a new Vector2
  //      */
  //     public static Minimize(left: DeepImmutable<Vector2>, right: DeepImmutable<Vector2>): Vector2 {
  //         const x = left.x < right.x ? left.x : right.x;
  //         const y = left.y < right.y ? left.y : right.y;
  //         return new Vector2(x, y);
  //     }
  //     /**
  //      * Gets a new Vector2 set with the maximal coordinate values from the "left" and "right" vectors
  //      * @param left defines 1st vector
  //      * @param right defines 2nd vector
  //      * @returns a new Vector2
  //      */
  //     public static Maximize(left: DeepImmutable<Vector2>, right: DeepImmutable<Vector2>): Vector2 {
  //         const x = left.x > right.x ? left.x : right.x;
  //         const y = left.y > right.y ? left.y : right.y;
  //         return new Vector2(x, y);
  //     }
  //     /**
  //      * Gets a new Vector2 set with the transformed coordinates of the given vector by the given transformation matrix
  //      * @param vector defines the vector to transform
  //      * @param transformation defines the matrix to apply
  //      * @returns a new Vector2
  //      */
  //     public static Transform(vector: DeepImmutable<Vector2>, transformation: DeepImmutable<Matrix>): Vector2 {
  //         const r = Vector2.Zero();
  //         Vector2.TransformToRef(vector, transformation, r);
  //         return r;
  //     }
  //     /**
  //      * Transforms the given vector coordinates by the given transformation matrix and stores the result in the vector "result" coordinates
  //      * @param vector defines the vector to transform
  //      * @param transformation defines the matrix to apply
  //      * @param result defines the target vector
  //      */
  //     public static TransformToRef(vector: DeepImmutable<Vector2>, transformation: DeepImmutable<Matrix>, result: Vector2) {
  //         const m = transformation.m;
  //         const x = vector.x * m[0] + vector.y * m[4] + m[12];
  //         const y = vector.x * m[1] + vector.y * m[5] + m[13];
  //         result.x = x;
  //         result.y = y;
  //     }
  //     /**
  //      * Determines if a given vector is included in a triangle
  //      * @param p defines the vector to test
  //      * @param p0 defines 1st triangle point
  //      * @param p1 defines 2nd triangle point
  //      * @param p2 defines 3rd triangle point
  //      * @returns true if the point "p" is in the triangle defined by the vectors "p0", "p1", "p2"
  //      */
  //     public static PointInTriangle(p: DeepImmutable<Vector2>, p0: DeepImmutable<Vector2>, p1: DeepImmutable<Vector2>, p2: DeepImmutable<Vector2>) {
  //         const a = (1 / 2) * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
  //         const sign = a < 0 ? -1 : 1;
  //         const s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
  //         const t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;
  //         return s > 0 && t > 0 && s + t < 2 * a * sign;
  //     }

  /**
   * Gets the distance between the vectors "value1" and "value2"
   * @param value1 defines first vector
   * @param value2 defines second vector
   * @returns the distance between vectors
   */
  public static Distance(
    value1: DeepImmutable<Vector2>,
    value2: DeepImmutable<Vector2>
  ): number {
    return Math.sqrt(Vector2.distanceSquared(value1, value2));
  }

  /**
   * Gets the distance between the vectors "value1" and "value2"
   * @param value1 defines first vector
   * @param value2 defines second vector
   * @returns the distance between vectors
   */
  public static distance(
    value1: ReadonlyVector2Like,
    value2: ReadonlyVector2Like
  ): number {
    return Math.sqrt(Vector2.distanceSquared(value1, value2));
  }

  /**
   * Returns the squared distance between the vectors "value1" and "value2"
   * @param value1 defines first vector
   * @param value2 defines second vector
   * @returns the squared distance between vectors
   */
  public static DistanceSquared(
    value1: DeepImmutable<Vector2>,
    value2: DeepImmutable<Vector2>
  ): number {
    const x = value1.x - value2.x;
    const y = value1.y - value2.y;
    return x * x + y * y;
  }

  /**
   * Returns the squared distance between the vectors "value1" and "value2"
   * @param value1 defines first vector
   * @param value2 defines second vector
   * @returns the squared distance between vectors
   */
  public static distanceSquared(
    value1: ReadonlyVector2Like,
    value2: ReadonlyVector2Like
  ): number {
    const x = value1.x - value2.x;
    const y = value1.y - value2.y;
    return x * x + y * y;
  }

  //     /**
  //      * Gets a new Vector2 located at the center of the vectors "value1" and "value2"
  //      * @param value1 defines first vector
  //      * @param value2 defines second vector
  //      * @returns a new Vector2
  //      */
  //     public static Center(value1: DeepImmutable<Vector2>, value2: DeepImmutable<Vector2>): Vector2 {
  //         return Vector2.CenterToRef(value1, value2, Vector2.Zero());
  //     }
  //     /**
  //      * Gets the center of the vectors "value1" and "value2" and stores the result in the vector "ref"
  //      * @param value1 defines first vector
  //      * @param value2 defines second vector
  //      * @param ref defines third vector
  //      * @returns ref
  //      */
  //     public static CenterToRef(value1: DeepImmutable<Vector2>, value2: DeepImmutable<Vector2>, ref: DeepImmutable<Vector2>): Vector2 {
  //         return ref.copyFromFloats((value1.x + value2.x) / 2, (value1.y + value2.y) / 2);
  //     }
  //     /**
  //      * Gets the shortest distance (float) between the point "p" and the segment defined by the two points "segA" and "segB".
  //      * @param p defines the middle point
  //      * @param segA defines one point of the segment
  //      * @param segB defines the other point of the segment
  //      * @returns the shortest distance
  //      */
  //     public static DistanceOfPointFromSegment(p: DeepImmutable<Vector2>, segA: DeepImmutable<Vector2>, segB: DeepImmutable<Vector2>): number {
  //         const l2 = Vector2.DistanceSquared(segA, segB);
  //         if (l2 === 0.0) {
  //             return Vector2.Distance(p, segA);
  //         }
  //         const v = segB.subtract(segA);
  //         const t = Math.max(0, Math.min(1, Vector2.Dot(p.subtract(segA), v) / l2));
  //         const proj = segA.add(v.multiplyByFloats(t, t));
  //         return Vector2.Distance(p, proj);
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
