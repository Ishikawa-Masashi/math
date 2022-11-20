import { describe, expect, it } from 'vitest';

import { EulerAngles, EulerOrder, MathHelper, Matrix } from '../src';
import { getRandomFloat } from './utils';

describe('EulerAngles', () => {
  it('RotationX', () => {
    for (let i = 0; i < EulerOrder.ZYX; ++i) {
      const x = MathHelper.ToRadians(getRandomFloat(-180, 180));
      const y = 0;
      const z = 0;
      const m1 = Matrix.RotationX(x);

      const eulerAngle = new EulerAngles(x, y, z, i);

      const m2 = EulerAngles.toRotationMatrix(eulerAngle);

      expect(m1.equalsWithEpsilon(m2)).toBeTruthy();
    }
  });

  it('RotationY', () => {
    for (let i = 0; i < EulerOrder.ZYX; ++i) {
      const x = 0;
      const y = MathHelper.ToRadians(getRandomFloat(-180, 180));
      const z = 0;
      const m1 = Matrix.RotationY(y);

      const eulerAngle = new EulerAngles(x, y, z, i);

      const m2 = EulerAngles.toRotationMatrix(eulerAngle);

      expect(m1.equalsWithEpsilon(m2)).toBeTruthy();
    }
  });

  it('RltationZ', () => {
    for (let i = 0; i < EulerOrder.ZYX; ++i) {
      const x = 0;
      const y = 0;
      const z = MathHelper.ToRadians(getRandomFloat(-180, 180));
      const m1 = Matrix.RotationZ(z);

      const eulerAngle = new EulerAngles(x, y, z, i);

      const m2 = EulerAngles.toRotationMatrix(eulerAngle);

      expect(m1.equalsWithEpsilon(m2)).toBeTruthy();
    }
  });

  it('EulerOrder:XYZ', () => {
    const x = MathHelper.ToRadians(getRandomFloat(-180, 180));
    const y = MathHelper.ToRadians(getRandomFloat(-180, 180));
    const z = MathHelper.ToRadians(getRandomFloat(-180, 180));

    const eulerAngle = new EulerAngles(x, y, z, EulerOrder.XYZ);

    const m1 = EulerAngles.toRotationMatrix(eulerAngle);

    const m2 = Matrix.Multiply(
      Matrix.Multiply(Matrix.RotationX(x), Matrix.RotationY(y)),
      Matrix.RotationZ(z)
    );

    expect(m1.equalsWithEpsilon(m2)).toBeTruthy();
  });

  it('EulerOrder:XZY', () => {
    const x = MathHelper.ToRadians(getRandomFloat(-180, 180));
    const y = MathHelper.ToRadians(getRandomFloat(-180, 180));
    const z = MathHelper.ToRadians(getRandomFloat(-180, 180));

    const eulerAngle = new EulerAngles(x, y, z, EulerOrder.XZY);

    const m1 = EulerAngles.toRotationMatrix(eulerAngle);

    const m2 = Matrix.Multiply(
      Matrix.Multiply(Matrix.RotationX(x), Matrix.RotationZ(z)),
      Matrix.RotationY(y)
    );

    expect(m1.equalsWithEpsilon(m2)).toBeTruthy();
  });

  it('EulerOrder', () => {
    for (let i = 0; i < EulerOrder.ZYX; ++i) {
      const x = MathHelper.ToRadians(getRandomFloat(-180, 180));
      const y = MathHelper.ToRadians(getRandomFloat(-180, 180));
      const z = MathHelper.ToRadians(getRandomFloat(-180, 180));

      const eulerAngle = new EulerAngles(x, y, z, i);

      const m1 = EulerAngles.toRotationMatrix(eulerAngle);
      const e1 = EulerAngles.toEulerAngle(m1, eulerAngle.order);

      const m2 = EulerAngles.toRotationMatrix(e1);
      const e2 = EulerAngles.toEulerAngle(m2, eulerAngle.order);

      expect(m1.equalsWithEpsilon(m2)).toBeTruthy();
      expect(e1.equalsWithEpsilon(e2)).toBeTruthy();
    }
  });
});
