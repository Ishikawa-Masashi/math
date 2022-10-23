import MathHelper from './MathHelper';
import { Vector3 } from './Vector3';
import BoundingSphere from './BoundingSphere.js';
import Plane from './Plane';
import BoundingFrustum from './BoundingFrustum.js';
import BoundingBox from './BoundingBox.js';

class Ray {
  /**
   * 新建 Ray 实例。
   * @constructs
   * @param {Vector3} position Ray 的起始点。
   * @param {Vector3} direction 描述 Ray 方向的单位矢量。
   * @returns {Ray}
   */
  constructor(
    public Position = Vector3.Zero,
    public Direction = Vector3.Zero
  ) {}

  /**
   * 确定指定的 Ray 是否等于当前 Ray。
   * @param {Ray} other 用于与当前 Ray 比较的 Ray。
   * @returns {Boolean}
   */
  Equals(other: Ray) {
    return (
      this.Direction.Equals(other.Direction) &&
      this.Position.Equals(other.Position)
    );
  }

  GetHashCode() {
    return this.Position.GetHashCode() ^ this.Direction.GetHashCode();
  }

  Intersects(...args) {
    return (Ray.prototype.Intersects = Overload.Create()
      .Add([BoundingSphere], function (sphere) {
        const difference = Vector3.Subtract(sphere.Center, this.Position);

        const differenceLengthSquared = difference.LengthSquared();
        const sphereRadiusSquared = sphere.Radius * sphere.Radius;

        if (differenceLengthSquared < sphereRadiusSquared) {
          return 0;
        }

        const distanceAlongRay = Vector3.Dot(this.Direction, difference);

        if (distanceAlongRay < 0) {
          return null;
        }

        const dist =
          sphereRadiusSquared +
          distanceAlongRay * distanceAlongRay -
          differenceLengthSquared;

        return dist < 0 ? null : distanceAlongRay - Math.sqrt(dist);
      })
      .Add([BoundingFrustum], function (frustum) {
        if (frustum == null) {
          throw new TypeError('frustum is null');
        }

        return frustum.Intersects(this);
      })
      .Add([BoundingBox], function (box) {
        const Epsilon = 1e-6;

        let tMin = null;
        let tMax = null;
        const positionX = this.Position.X;
        const positionY = this.Position.Y;
        const positionZ = this.Position.Z;
        const directionX = this.Direction.X;
        const directionY = this.Direction.Y;
        const directionZ = this.Direction.Z;

        if (Math.abs(directionX) < Epsilon) {
          if (positionX < box.Min.X || positionX > box.Max.X) {return null;}
        } else {
          tMin = (box.Min.X - positionX) / directionX;
          tMax = (box.Max.X - positionX) / directionX;

          if (tMin > tMax) {
            var temp = tMin;
            tMin = tMax;
            tMax = temp;
          }
        }

        if (Math.abs(directionY) < Epsilon) {
          if (positionY < box.Min.Y || positionY > box.Max.Y) {return null;}
        } else {
          let tMinY = (box.Min.Y - positionY) / directionY;
          let tMaxY = (box.Max.Y - positionY) / directionY;

          if (tMinY > tMaxY) {
            var temp = tMinY;
            tMinY = tMaxY;
            tMaxY = temp;
          }

          if (
            (tMin !== null && tMin > tMaxY) ||
            (tMax !== null && tMinY > tMax)
          )
            {return null;}

          if (tMin === null || tMinY > tMin) {tMin = tMinY;}
          if (tMax === null || tMaxY < tMax) {tMax = tMaxY;}
        }

        if (Math.abs(directionZ) < Epsilon) {
          if (positionZ < box.Min.Z || positionZ > box.Max.Z) {return null;}
        } else {
          let tMinZ = (box.Min.Z - positionZ) / directionZ;
          let tMaxZ = (box.Max.Z - positionZ) / directionZ;

          if (tMinZ > tMaxZ) {
            var temp = tMinZ;
            tMinZ = tMaxZ;
            tMaxZ = temp;
          }

          if (
            (tMin !== null && tMin > tMaxZ) ||
            (tMax !== null && tMinZ > tMax)
          )
            {return null;}

          if (tMin === null || tMinZ > tMin) {tMin = tMinZ;}
          if (tMax === null || tMaxZ < tMax) {tMax = tMaxZ;}
        }

        if (tMin !== null && tMin < 0 && tMax > 0) {return 0;}

        if (tMin < 0) {return null;}

        return tMin;
      })
      .Add([Plane], function (plane) {
        const den = Vector3.Dot(this.Direction, plane.Normal);
        if (Math.abs(den) < 0.00001) {
          return null;
        }

        let result =
          (-plane.D - Vector3.Dot(plane.Normal, this.Position)) / den;

        if (result < 0.0) {
          if (result < -0.00001) {
            return null;
          }

          result = 0.0;
        }
        return result;
      })).call(this, ...args);
  }

  ToString(...args) {
    return (Ray.prototype.ToString = Overload.Create().Add([], function () {
      return `{Position:${this.Position.ToString()} Direction:${this.Direction.ToString()}}`;
    })).call(this, ...args);
  }
}

export default Ray;
