import { Vector3 } from './math.vector';
import { Scalar } from './scalar';

export class Segment {
  constructor(public start: Vector3, public end: Vector3) {}

  /**
   * Determines whether this line is valid.
   * A line is not valid when the start and end points are the same point.
   */
  public get IsValid(): boolean {
    return !this.start.equals(this.end);
  }

  /**
   * Gets the direction of this line segment. The length of the direction vector equals the length of the line segment.
   */
  public get Direction(): Vector3 {
    if (!this.IsValid) {
      throw new Error('Cannot get direction of an invalid line.');
    }
    return this.end.subtract(this.start);
  }

  /**
   * Gets the direction of this line segment. The length of the direction vector is 1.
   */
  public get UnitDirection(): Vector3 {
    return this.Direction.normalize();
  }

  /**
   * Gets the length of this line segment.
   */
  public get Length(): number {
    return Vector3.Distance(this.end, this.start);
  }

  /**
   * Sets the length of this line segment. Note that a negative length will invert the line segment without making the actual length negative. The line From point will remain fixed when a new Length is set.
   */
  public set Length(l: number) {
    const dir = this.UnitDirection;
    if (l < 0) {
      //   dir = dir.Reverse();
      dir.negateInPlace();
    }

    this.end = this.start.add(dir.scale(Math.abs(l)));
  }

  /**
   * Make a copy of this line.
   */
  public Clone() {
    return new Segment(this.start, this.end);
  }

  /**
   * Evaluates the line at the specified parameter.
   * @param param Parameter to evaluate line segment at. Line parameters are normalized parameters.
   * @returns The point at the specified parameter.
   */
  public PointAt(param: number) {
    if (!this.IsValid) {
      throw new Error('Cannot evaluate an invalid line.');
    }
    return this.Direction.scale(param).add(this.start);
  }

  /**
   * Computes a point located at a specific metric distance from the line origin (From). If line start and end coincide, then the start point is always returned.
   * @param distance A positive, 0, or a negative value that will be the distance from From.
   * @returns The newly found point.
   */
  public PointAtLength(distance: number) {
    if (!this.IsValid) {
      throw new Error('Cannot evaluate an invalid line.');
    }
    return this.UnitDirection.scale(distance).add(this.start);
  }

  /**
   * Finds the parameter on the (in)finite line segment that is closest to a test point.
   * @param testPoint Point to project onto the line.
   * @param limitToFiniteSegment If true, the projection is limited to the finite line segment. default: false
   * @returns The parameter on the line that is closest to testPoint.
   */
  public ClosestParameter(testPoint: Vector3, limitToFiniteSegment = false) {
    if (!this.IsValid) {
      throw new Error('Invalid line does not have a closest point.');
    }
    const startToP = testPoint.subtract(this.start);
    const startToEnd = this.end.subtract(this.start);

    const startEnd2 = Vector3.Dot(startToEnd, startToEnd);
    const startEnd_startP = Vector3.Dot(startToEnd, startToP);

    let t = startEnd_startP / startEnd2;

    if (limitToFiniteSegment) {
      t = Scalar.Clamp(t, 0, 1);
    }

    return t;
  }

  /**
   * Finds the point on the (in)finite line segment that is closest to a test point.
   * @param testPoint Point to project onto the line.
   * @param limitToFiniteSegment If true, the projection is limited to the finite line segment. default: false
   * @returns The point on the (in)finite line that is closest to testPoint.
   */
  public ClosestPoint(testPoint: Vector3, limitToFiniteSegment = false) {
    const t = this.ClosestParameter(testPoint, limitToFiniteSegment);

    return this.PointAt(t);
  }

  /**
   * Compute the shortest distance between this line segment and a test point.
   * @param testPoint Point for distance computation.
   * @param limitToFiniteSegment If true, the distance is limited to the finite line segment. default: false
   * @returns The shortest distance between this line segment and testPoint.
   */
  public DistanceTo(testPoint: Vector3, limitToFiniteSegment = false) {
    const closestPt = this.ClosestPoint(testPoint, limitToFiniteSegment);
    return Vector3.Distance(closestPt, testPoint);
  }

  /**
   * Determines whether a line has the same value as this line.
   * @param other A line.
   * @returns true if other has the same coordinates as this; otherwise false.
   */
  public Equals(other: Segment): boolean {
    return this.start.equals(other.start) && this.end.equals(other.end);
  }

  /**
   * Extend the line by custom distances on both sides.
   * @param startLength Distance to extend the line at the start point. Positive distance result in longer lines.
   * @param endLength Distance to extend the line at the end point. Positive distance result in longer lines.
   * @returns The extended line.
   */
  public Extend(startLength: number, endLength: number) {
    if (!this.IsValid) {
      throw new Error('Cannot extend an invalid line.');
    }
    const startPt = this.UnitDirection.scale(-startLength).add(this.start);
    const endPt = this.UnitDirection.scale(endLength).add(this.end);
    return new Segment(startPt, endPt);
  }

  /**
   * Flip the endpoints of the line and return a new line.
   * @returns A new flipped line.
   */
  public Flip() {
    return new Segment(this.end, this.start);
  }

  /**
   * Transform the line using a Transformation matrix.
   * @param transformation Transformation matrix to apply.
   * @returns A new transformed line.
   */
  //   public Transform(transformation: Transform): Line {
  //     const start = this.From.Transform(transformation);
  //     const end = this.To.Transform(transformation);
  //     return new Line(start, end);
  //   }
}
