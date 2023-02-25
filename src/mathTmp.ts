import { ArrayTools } from './arrayTools';
import { Vector2, Vector3, Matrix } from './math.vector';

export class MathTmp {
  private static vector2Index = 0;
  private static vector2 = ArrayTools.BuildArray(10, Vector2.Zero);

  public static Vector2(x = 0, y = 0) {
    const result = this.vector2[this.vector2Index];
    result.set(x, y);
    this.vector2Index = (this.vector2Index + 1) % this.vector2.length;

    // if (this.vector2Index === this.vector2.length - 1) {
    //   console.log('max');
    // }

    return result;
  }

  private static vector3Index = 0;
  private static vector3 = ArrayTools.BuildArray(100, Vector3.Zero);

  public static Vector3(x = 0, y = 0, z = 0) {
    const result = this.vector3[this.vector3Index];
    result.set(x, y, z);
    this.vector3Index = (this.vector3Index + 1) % this.vector3.length;

    // if (this.vector3Index === this.vector3.length - 1) {
    //   console.log('max');
    // }

    return result;
  }

  private static matrixIndex = 0;
  private static matrix = ArrayTools.BuildArray(10, Matrix.Identity);

  public static Matrix() {
    const result = this.matrix[this.matrixIndex];
    result.reset();
    this.matrixIndex = (this.matrixIndex + 1) % this.matrix.length;
    return result;
  }
}
