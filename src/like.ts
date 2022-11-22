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
export interface ReadonlyMatrixLike {
  m: ReadonlyArray<number>;
}

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
