import { describe, expect, it, test } from 'vitest';

import { EulerAngle, EulerOrder, MathHelper, Matrix } from '../src';
import { getRandomFloat } from './utils';

describe('EulerAngle', () => {
  it('RotationX', () => {
    for (let i = 0; i < EulerOrder.ZYX; ++i) {
      const x = MathHelper.ToRadians(getRandomFloat(-180, 180));
      const y = 0;
      const z = 0;
      const m1 = Matrix.RotationX(x);

      const eulerAngle = new EulerAngle(x, y, z, i);

      const m2 = EulerAngle.toRotationMatrix(eulerAngle);

      expect(m1.equalsWithEpsilon(m2)).toBeTruthy();
    }
  });

  it('RotationY', () => {
    for (let i = 0; i < EulerOrder.ZYX; ++i) {
      const x = 0;
      const y = MathHelper.ToRadians(getRandomFloat(-180, 180));
      const z = 0;
      const m1 = Matrix.RotationY(y);

      const eulerAngle = new EulerAngle(x, y, z, i);

      const m2 = EulerAngle.toRotationMatrix(eulerAngle);

      expect(m1.equalsWithEpsilon(m2)).toBeTruthy();
    }
  });

  it('RltationZ', () => {
    for (let i = 0; i < EulerOrder.ZYX; ++i) {
      const x = 0;
      const y = 0;
      const z = MathHelper.ToRadians(getRandomFloat(-180, 180));
      const m1 = Matrix.RotationZ(z);

      const eulerAngle = new EulerAngle(x, y, z, i);

      const m2 = EulerAngle.toRotationMatrix(eulerAngle);

      expect(m1.equalsWithEpsilon(m2)).toBeTruthy();
    }
  });

  it('EulerOrder', () => {
    for (let i = 0; i < EulerOrder.ZYX; ++i) {
      const x = MathHelper.ToRadians(getRandomFloat(-180, 180));
      const y = MathHelper.ToRadians(getRandomFloat(-180, 180));
      const z = MathHelper.ToRadians(getRandomFloat(-180, 180));

      const eulerAngle = new EulerAngle(x, y, z, i);
      const m1 = EulerAngle.toRotationMatrix(eulerAngle);
      const e1 = EulerAngle.toEulerAngle(m1, eulerAngle.order);

      //   expect(e).toEqual(eulerAngle);

      const m2 = EulerAngle.toRotationMatrix(e1);

      const e2 = EulerAngle.toEulerAngle(m2, eulerAngle.order);
      //   expect(m1).toEqual(m2);
      //   expect(e1).toEqual(e2);
      expect(m1.equalsWithEpsilon(m2)).toBeTruthy();
      expect(e1.equalsWithEpsilon(e2)).toBeTruthy();
    }
  });
});
