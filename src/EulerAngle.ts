import { Epsilon } from './constants';
import { Matrix } from './Matrix';

export enum EulerOrder {
  XYZ,
  XZY,
  YXZ,
  YZX,
  ZXY,
  ZYX,
}

export class EulerAngle {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public order: EulerOrder
  ) {}

  public equalsWithEpsilon(
    other: EulerAngle,
    epsilon: number = Epsilon
  ): boolean {
    return (
      Math.abs(this.x - other.x) < epsilon &&
      Math.abs(this.y - other.y) < epsilon &&
      Math.abs(this.z - other.z) < epsilon &&
      this.order === other.order
    );
  }

  static toRotationMatrix(e: EulerAngle) {
    const cx = Math.cos(e.x);
    const sx = Math.sin(e.x);
    const cy = Math.cos(e.y);
    const sy = Math.sin(e.y);
    const cz = Math.cos(e.z);
    const sz = Math.sin(e.z);
    switch (e.order) {
      case EulerOrder.XYZ:
        //https://www.wolframalpha.com/input?key=&i2d=true&i=%7B%7B1%2C0%2C0%2C0%7D%2C%7B0%2Ccosx%2Csinx%2C0%7D%2C%7B0%2C-sinx%2Ccosx%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7Bcosy%2C0%2C-siny%2C0%7D%2C%7B0%2C1%2C0%2C0%7D%2C%7Bsiny%2C0%2Ccosy%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7Bcosz%2Csinz%2C0%2C0%7D%2C%7B-sinz%2Ccosz%2C0%2C0%7D%2C%7B0%2C0%2C1%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D&lang=ja
        return new Matrix(
          cy * cz,
          cy * sz,
          -sy,
          0,
          sx * sy * cz - cx * sz,
          sx * sy * sz + cx * cz,
          sx * cy,
          0,
          cx * sy * cz + sx * sz,
          cx * sy * sz - sx * cz,
          cx * cy,
          0,
          0,
          0,
          0,
          1
        );
      case EulerOrder.XZY:
        // https://www.wolframalpha.com/input?key=&i2d=true&i=%7B%7B1%2C0%2C0%2C0%7D%2C%7B0%2Ccosx%2Csinx%2C0%7D%2C%7B0%2C-sinx%2Ccosx%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7Bcosz%2Csinz%2C0%2C0%7D%2C%7B-sinz%2Ccosz%2C0%2C0%7D%2C%7B0%2C0%2C1%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7Bcosy%2C0%2C-siny%2C0%7D%2C%7B0%2C1%2C0%2C0%7D%2C%7Bsiny%2C0%2Ccosy%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D&lang=ja
        return new Matrix(
          cy * cz,
          sz,
          sy * -cz,
          0,
          sx * sy - cx * cy * sz,
          cx * cz,
          cx * sy * sz + sx * cy,
          0,
          sx * cy * sz + cx * sy,
          sx * -cz,
          cx * cy - sx * sy * sz,
          0,
          0,
          0,
          0,
          1
        );
      case EulerOrder.YXZ:
        // https://www.wolframalpha.com/input?key=&i2d=true&i=%7B%7Bcosy%2C0%2C-siny%2C0%7D%2C%7B0%2C1%2C0%2C0%7D%2C%7Bsiny%2C0%2Ccosy%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7B1%2C0%2C0%2C0%7D%2C%7B0%2Ccosx%2Csinx%2C0%7D%2C%7B0%2C-sinx%2Ccosx%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7Bcosz%2Csinz%2C0%2C0%7D%2C%7B-sinz%2Ccosz%2C0%2C0%7D%2C%7B0%2C0%2C1%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D&lang=ja
        return new Matrix(
          cy * cz - sx * sy * sz,
          sx * sy * cz + cy * sz,
          -cx * sy,
          0,
          -cx * sz,
          cx * cz,
          sx,
          0,
          sx * cy * sz + sy * cz,
          sy * sz - sx * cy * cz,
          cx * cy,
          0,
          0,
          0,
          0,
          1
        );
      case EulerOrder.YZX:
        // https://www.wolframalpha.com/input?key=&i2d=true&i=%7B%7Bcosy%2C0%2C-siny%2C0%7D%2C%7B0%2C1%2C0%2C0%7D%2C%7Bsiny%2C0%2Ccosy%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7Bcosz%2Csinz%2C0%2C0%7D%2C%7B-sinz%2Ccosz%2C0%2C0%7D%2C%7B0%2C0%2C1%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7B1%2C0%2C0%2C0%7D%2C%7B0%2Ccosx%2Csinx%2C0%7D%2C%7B0%2C-sinx%2Ccosx%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D&lang=ja
        return new Matrix(
          cy * cz,
          cx * cy * sz + sx * sy,
          sx * cy * sz - cx * sy,
          0,
          -sz,
          cx * cz,
          sx * cz,
          0,
          sy * cz,
          cx * sy * sz - sx * cy,
          sx * sy * sz + cx * cy,
          0,
          0,
          0,
          0,
          1
        );
      case EulerOrder.ZXY:
        // https://www.wolframalpha.com/input?key=&i2d=true&i=%7B%7Bcosz%2Csinz%2C0%2C0%7D%2C%7B-sinz%2Ccosz%2C0%2C0%7D%2C%7B0%2C0%2C1%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7B1%2C0%2C0%2C0%7D%2C%7B0%2Ccosx%2Csinx%2C0%7D%2C%7B0%2C-sinx%2Ccosx%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7Bcosy%2C0%2C-siny%2C0%7D%2C%7B0%2C1%2C0%2C0%7D%2C%7Bsiny%2C0%2Ccosy%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D&lang=ja
        return new Matrix(
          sx * sy * sz + cy * cz,
          cx * sz,
          sx * cy * sz - sy * cz,
          0,
          sx * sy * cz - cy * sz,
          cx * cz,
          sx * cy * cz + sy * sz,
          0,
          cx * sy,
          -sx,
          cx * cy,
          0,
          0,
          0,
          0,
          1
        );
      case EulerOrder.ZYX:
        //https://www.wolframalpha.com/input?key=&i2d=true&i=%7B%7Bcosz%2Csinz%2C0%2C0%7D%2C%7B-sinz%2Ccosz%2C0%2C0%7D%2C%7B0%2C0%2C1%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7Bcosy%2C0%2C-siny%2C0%7D%2C%7B0%2C1%2C0%2C0%7D%2C%7Bsiny%2C0%2Ccosy%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D%7B%7B1%2C0%2C0%2C0%7D%2C%7B0%2Ccosx%2Csinx%2C0%7D%2C%7B0%2C-sinx%2Ccosx%2C0%7D%2C%7B0%2C0%2C0%2C1%7D%7D&lang=ja
        return new Matrix(
          cy * cz,
          sx * sy * cz + cx * sz,
          sx * sz - cx * sy * cz,
          0,
          -cy * sz,
          cx * cz - sx * sy * sz,
          cx * sy * sz + sx * cz,
          0,
          sy,
          sx * -cy,
          cx * cy,
          0,
          0,
          0,
          0,
          1
        );
    }
    throw 'conversion of euler angle to rotation matrix is failed.';
  }

  static toEulerAngle(m: Matrix, order: EulerOrder) {
    if (order === EulerOrder.XYZ) {
      const sy = -m.m13; //.at(0, 2);
      const unlocked = Math.abs(sy) < 0.99999;
      return new EulerAngle(
        //   unlocked
        //     ? Math.atan2(-m.at(1, 2), m.at(2, 2))
        //     : Math.atan2(m.at(2, 1), m.at(1, 1)),
        unlocked ? Math.atan2(m.m23, m.m33) : Math.atan2(-m.m32, m.m22),
        Math.asin(sy),
        //   unlocked ? Math.atan2(-m.at(0, 1), m.at(0, 0)) : 0,
        unlocked ? Math.atan2(m.m12, m.m11) : 0,
        order
      );
    } else if (order === EulerOrder.XZY) {
      // const sz = -m.at(0, 1);
      const sz = m.m12;
      const unlocked = Math.abs(sz) < 0.99999;
      return new EulerAngle(
        //   unlocked
        //     ? Math.atan2(m.at(2, 1), m.at(1, 1))
        //     : Math.atan2(-m.at(1, 2), m.at(2, 2)),

        unlocked ? Math.atan2(-m.m32, m.m22) : Math.atan2(m.m23, m.m33),
        unlocked ? Math.atan2(-m.m13, m.m11) : 0,
        Math.asin(sz),
        order
      );
    } else if (order === EulerOrder.YXZ) {
      // const sx = -m.at(1, 2);
      const sx = m.m23;
      const unlocked = Math.abs(sx) < 0.99999;
      return new EulerAngle(
        Math.asin(sx),
        //   unlocked
        //     ? Math.atan2(m.at(0, 2), m.at(2, 2))
        //     : Math.atan2(-m.at(2, 0), m.at(0, 0)),
        unlocked ? Math.atan2(-m.m13, m.m33) : Math.atan2(m.m31, m.m11),
        //   unlocked ? Math.atan2(m.at(1, 0), m.at(1, 1)) : 0,
        unlocked ? Math.atan2(-m.m21, m.m22) : 0,
        order
      );
    } else if (order === EulerOrder.YZX) {
      // const sz = m.at(1, 0);
      const sz = -m.m21;
      const unlocked = Math.abs(sz) < 0.99999;
      return new EulerAngle(
        //   unlocked ? Math.atan2(-m.at(1, 2), m.at(1, 1)) : 0,
        unlocked ? Math.atan2(m.m23, m.m22) : 0,
        //   unlocked
        //     ? Math.atan2(-m.at(2, 0), m.at(0, 0))
        //     : Math.atan2(m.at(0, 2), m.at(2, 2)),

        unlocked ? Math.atan2(m.m31, m.m11) : Math.atan2(-m.m13, m.m33),
        Math.asin(sz),
        order
      );
    } else if (order === EulerOrder.ZXY) {
      // const sx = m.at(2, 1);
      const sx = -m.m32;
      const unlocked = Math.abs(sx) < 0.99999;
      return new EulerAngle(
        Math.asin(sx),
        //   unlocked ? Math.atan2(-m.at(2, 0), m.at(2, 2)) : 0,
        unlocked ? Math.atan2(m.m31, m.m33) : 0,
        //   unlocked
        //     ? Math.atan2(-m.at(0, 1), m.at(1, 1))
        //     : Math.atan2(m.at(1, 0), m.at(0, 0)),

        unlocked ? Math.atan2(m.m12, m.m22) : Math.atan2(-m.m21, m.m11),
        order
      );
    } else if (order === EulerOrder.ZYX) {
      // const sy = -m.at(2, 0);
      const sy = m.m31;
      const unlocked = Math.abs(sy) < 0.99999;
      return new EulerAngle(
        //   unlocked ? Math.atan2(m.at(2, 1), m.at(2, 2)) : 0,
        unlocked ? Math.atan2(-m.m32, m.m33) : 0,
        Math.asin(sy),
        //   unlocked
        //     ? Math.atan2(m.at(1, 0), m.at(0, 0))
        //     : Math.atan2(-m.at(0, 1), m.at(1, 1)),
        unlocked ? Math.atan2(-m.m21, m.m11) : Math.atan2(m.m12, m.m22),
        order
      );
    }
    throw 'conversion of rotation matrix to euler angle is failed.';
  }
}
