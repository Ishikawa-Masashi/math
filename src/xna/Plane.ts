import Overload from '../Core/Overload.js';
import Object from '../Core/Object.js';
import MathHelper from './MathHelper.js';
import Vector3 from './Vector3.js';
import Vector4 from './Vector4.js';
import Matrix from './Matrix.js';
import Quaternion from './Quaternion';
import BoundingSphere from './BoundingSphere';
import BoundingFrustum from './BoundingFrustum';
import BoundingBox from './BoundingBox';
import PlaneIntersectionType from './PlaneIntersectionType';

class Plane extends Object {
  /**
   * 新建 Plane 实例。
   * @constructs
   * @param {Vector3} normal Plane 的法线矢量。
   * @param {Number} d Plane 从原点位置起沿法线方向的距离。
   * @returns {Plane}
   */
  constructor(public Normal: Vector3, public D: number) {
    super();
  }

  Dot(...args) {
    return (Plane.prototype.Dot = Overload.Create().Add(
      [Vector4],
      function (value) {
        return (
          this.Normal.X * value.X +
          this.Normal.Y * value.Y +
          this.Normal.Z * value.Z +
          this.D * value.W
        );
      }
    )).call(this, ...args);
  }

  DotCoordinate(...args) {
    return (Plane.prototype.DotCoordinate = Overload.Create().Add(
      [Vector3],
      function (value) {
        return (
          this.Normal.X * value.X +
          this.Normal.Y * value.Y +
          this.Normal.Z * value.Z +
          this.D
        );
      }
    )).call(this, ...args);
  }

  DotNormal(...args) {
    return (Plane.prototype.DotNormal = Overload.Create().Add(
      [Vector3],
      function (value) {
        return (
          this.Normal.X * value.X +
          this.Normal.Y * value.Y +
          this.Normal.Z * value.Z
        );
      }
    )).call(this, ...args);
  }

  Equals(...args) {
    return (Plane.prototype.Equals = Overload.Create()
      .Add([Plane], function (other) {
        return (
          this.Normal.Equals(other.Normal) && Math.abs(this.D - other.D) < 1e-6
        );
      })
      .Add(['*'], function () {
        return false;
      })).call(this, ...args);
  }

  GetHashCode(...args) {
    return (Plane.prototype.GetHashCode = Overload.Create().Add(
      [Plane],
      function (other) {
        return this.Normal.GetHashCode() ^ this.D;
      }
    )).call(this, ...args);
  }

  Intersects(...args) {
    return (Plane.prototype.Intersects = Overload.Create()
      .Add([BoundingSphere], function (sphere) {
        return sphere.Intersects(this);
      })
      .Add([BoundingFrustum], function (frustum) {
        return frustum.Intersects(this);
      })
      .Add([BoundingBox], function (box) {
        return box.Intersects(this);
      })
      .Add([Vector3], function (point) {
        const distance = this.DotCoordinate(point);

        if (distance > 0) {
          return PlaneIntersectionType.Front;
        }

        if (distance < 0) {
          return PlaneIntersectionType.Back;
        }

        return PlaneIntersectionType.Intersecting;
      })).call(this, ...args);
  }

  static Normalize(...args) {
    return (Plane.Normalize = Overload.Create().Add([Plane], function (value) {
      const result = new Plane();
      let factor;
      result.Normal = Vector3.Normalize(value.Normal);
      factor =
        Math.sqrt(
          result.Normal.X * result.Normal.X +
            result.Normal.Y * result.Normal.Y +
            result.Normal.Z * result.Normal.Z
        ) /
        Math.sqrt(
          value.Normal.X * value.Normal.X +
            value.Normal.Y * value.Normal.Y +
            value.Normal.Z * value.Normal.Z
        );
      result.D = value.D * factor;
      return result;
    })).call(this, ...args);
  }

  Normalize(...args) {
    return (Plane.prototype.Normalize = Overload.Create().Add([], function () {
      let factor;
      const normal = Vector3.Normalize(this.Normal);
      factor =
        Math.sqrt(
          normal.X * normal.X + normal.Y * normal.Y + normal.Z * normal.Z
        ) /
        Math.sqrt(
          this.Normal.X * this.Normal.x +
            this.Normal.y * this.Normal.y +
            this.Normal.z * this.Normal.z
        );
      this.Normal = normal;
      this.D *= factor;
    })).call(this, ...args);
  }

  ToString(...args) {
    return (Plane.prototype.ToString = Overload.Create().Add([], function () {
      return `{Normal:${this.Normal.toString()} D:${this.D}}`;
    })).call(this, ...args);
  }

  static Transform(...args) {
    return (Plane.Transform = Overload.Create()
      .Add([Plane, Quaternion], function (plane, rotation) {
        const result = new Plane();
        result.Normal = Vector3.Transform(plane.Normal, rotation);
        result.D = plane.D;
        return result;
      })
      .Add([Plane, Matrix], function (plane, matrix) {
        const transformedMatrix = Matrix.Transpose(Matrix.Invert(matrix));

        const vector = new Vector4(plane.Normal, plane.D);

        const transformedVector = Vector4.Transform(vector, transformedMatrix);

        return new Plane(transformedVector);
      })).call(this, ...args);
  }

  Serialize(...args) {
    const superSerialize = super.Serialize;
    return (Plane.prototype.Serialize = Overload.Create().Add(
      [String],
      function () {
        return superSerialize.call(this, {
          Normal: this.Normal,
          D: this.D,
        });
      }
    )).call(this, ...args);
  }

  static Deserialize(...args) {
    return (Plane.Deserialize = Overload.Create()
      .Add([String], function (str) {
        return this.Deserialize(JSON.parse(str));
      })
      .Add([window.Object], function (obj) {
        if (obj['Symbol'] !== Plane.name) {
          throw new TypeError('Unrecognized type');
        }
        const normal = Vector3.Deserialize(obj.Normal);
        return new Plane(normal, obj.D);
      })).call(this, ...args);
  }
}

export default Plane;
