import { ArrayTools } from './arrayTools';
import { Matrix } from './Matrix';
import { Quaternion } from './Quaternion';
import { Vector3 } from './Vector3';

/**
 * @internal
 * Same as Tmp but not exported to keep it only for math functions to avoid conflicts
 */
export class MathTmp {
  public static Vector3 = ArrayTools.BuildTuple(11, () => Vector3.Zero);
  public static Matrix = ArrayTools.BuildTuple(2, () => Matrix.Identity);
  public static Quaternion = ArrayTools.BuildTuple(3, () => Quaternion.Zero);
}
