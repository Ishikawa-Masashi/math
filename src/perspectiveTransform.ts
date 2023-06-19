/*
 The algorithm is coming from:
 Projective Mappings for Image Warping (1989)
 by Paul Heckbert
 in Fundamentals of Texture Mapping and Image Warping (Paul Heckbert,
 Master’s Thesis), U.C.Berkeley

 http://www.cs.utah.edu/classes/cs6964-whitaker/heckbert_projective.pdf 

 The case of parallelograms is not handled.

 You can combine the transformations with matricial product to map one
 quadrilateral to another one via the square.

 Thanks to pseudocode from developpez.net for the forward mapping

 Points must be specified in clockwise order (top-left, top,right, bot-right, bot-left)

*/

export function getPerspectiveTransform(P: { x: number; y: number }[]) {
  const H: number[] = [];
  const adj: number[] = [];

  const sx = P[0].x - P[1].x + (P[2].x - P[3].x);
  const sy = P[0].y - P[1].y + (P[2].y - P[3].y);
  const dx1 = P[1].x - P[2].x;
  const dx2 = P[3].x - P[2].x;
  const dy1 = P[1].y - P[2].y;
  const dy2 = P[3].y - P[2].y;

  const z = dx1 * dy2 - dy1 * dx2;
  const g = (sx * dy2 - sy * dx2) / z;
  const h = (sy * dx1 - sx * dy1) / z;

  // matrice de transformation
  const a = (H[0] = P[1].x - P[0].x + g * P[1].x);
  const b = (H[1] = P[3].x - P[0].x + h * P[3].x);
  const c = (H[2] = P[0].x);
  const d = (H[3] = P[1].y - P[0].y + g * P[1].y);
  const e = (H[4] = P[3].y - P[0].y + h * P[3].y);
  const f = (H[5] = P[0].y);
  H[6] = g;
  H[7] = h;
  H[8] = 1;

  // calcul de transformation inverse (matrice adjointe)
  adj[0] = e - f * h;
  adj[1] = c * h - b;
  adj[2] = b * f - c * e;
  adj[3] = f * g - d;
  adj[4] = a - c * g;
  adj[5] = c * d - a * f;
  adj[6] = d * h - e * g;
  adj[7] = b * g - a * h;
  adj[8] = a * e - b * d;

  //  printf("a %f b %f c %f d %f e %f f %f g %f h %f i 1\n",a,b,c,d,e,f,g,h);
  //  printf("adj: a %f b %f c %f d %f e %f f %f g %f h %f i 1\n",adj[0],adj[1],adj[2],adj[3],adj[4],adj[5],adj[6],adj[7]);
  // return H;

  return { perspectiveTransform: H, inversePerspectiveTransform: adj };
}

export function projective_mapping(u: number[], v: number[], H: number[]) {
  const x =
    (H[0] * u[0] + H[1] * v[0] + H[2]) / (H[6] * u[0] + H[7] * v[0] + 1);
  const y =
    (H[3] * u[0] + H[4] * v[0] + H[5]) / (H[6] * u[0] + H[7] * v[0] + 1);
  u[0] = x;
  v[0] = y;
  return { x, y };
}

export function projectiveMapping(u: number, v: number, H: number[]) {
  const x = (H[0] * u + H[1] * v + H[2]) / (H[6] * u + H[7] * v + 1);
  const y = (H[3] * u + H[4] * v + H[5]) / (H[6] * u + H[7] * v + 1);
  // u = x;
  // v = y;
  return { x, y };
}

export function inverse_projective_mapping(
  u: number[],
  v: number[],
  H: number[]
) {
  const x =
    (H[0] * u[0] + H[1] * v[0] + H[2]) / (H[6] * u[0] + H[7] * v[0] + 1);
  const y =
    (H[3] * u[0] + H[4] * v[0] + H[5]) / (H[6] * u[0] + H[7] * v[0] + 1);
  const z =
    (H[6] * u[0] + H[7] * v[0] + H[8]) / (H[6] * u[0] + H[7] * v[0] + 1);
  u[0] = x / z;
  v[0] = y / z;
}

export function inverseProjectiveMapping(u: number, v: number, H: number[]) {
  const x = (H[0] * u + H[1] * v + H[2]) / (H[6] * u + H[7] * v + 1);
  const y = (H[3] * u + H[4] * v + H[5]) / (H[6] * u + H[7] * v + 1);
  const z = (H[6] * u + H[7] * v + H[8]) / (H[6] * u + H[7] * v + 1);
  // u[0] = x / z;
  // v[0] = y / z;
  return { x: x / z, y: y / z };
}
