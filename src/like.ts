import type { float } from './types';

/**
 * @hidden
 */
export interface IColor4Like {
  r: float;
  g: float;
  b: float;
  a: float;
}

/**
 * @hidden
 */
export interface IColor3Like {
  r: float;
  g: float;
  b: float;
}

export type Color3Like = {
  r: float;
  g: float;
  b: float;
};

export interface IQuaternionLike {
  x: float;
  y: float;
  z: float;
  w: float;
}

export type QuaternionLike = {
  x: float;
  y: float;
  z: float;
  w: float;
};

export type ReadonlyQuaternionLike = {
  readonly x: float;
  readonly y: float;
  readonly z: float;
  readonly w: float;
};

/**
 * @hidden
 */
export interface IVector4Like {
  x: float;
  y: float;
  z: float;
  w: float;
}

export type Vector4Like = {
  x: float;
  y: float;
  z: float;
  w: float;
};

/**
 * @hidden
 */
export interface IVector3Like {
  x: float;
  y: float;
  z: float;
}

export type Vector3Like = {
  x: number;
  y: number;
  z: number;
};

export type ReadonlyVector3Like = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

/**
 * @hidden
 */
export interface IVector2Like {
  x: float;
  y: float;
}

export type Vector2Like = {
  x: number;
  y: number;
};

export type ReadonlyVector2Like = {
  readonly x: number;
  readonly y: number;
};

/**
 * @hidden
 */

export type ReadonlyMatrixLike = {
  readonly m11: number;
  readonly m12: number;
  readonly m13: number;
  readonly m14: number;

  readonly m21: number;
  readonly m22: number;
  readonly m23: number;
  readonly m24: number;

  readonly m31: number;
  readonly m32: number;
  readonly m33: number;
  readonly m34: number;

  readonly m41: number;
  readonly m42: number;
  readonly m43: number;
  readonly m44: number;
};

/**
 * @hidden
 */
export interface IViewportLike {
  x: float;
  y: float;
  width: float;
  height: float;
}

/**
 * @hidden
 */
export interface IPlaneLike {
  normal: IVector3Like;
  d: float;
  normalize(): void;
}
