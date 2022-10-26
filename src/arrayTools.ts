/* eslint-disable @typescript-eslint/naming-convention */
/** @hidden */
interface TupleTypes<T> {
  2: [T, T];
  3: [T, T, T];
  4: [T, T, T, T];
  5: [T, T, T, T, T];
  6: [T, T, T, T, T, T];
  7: [T, T, T, T, T, T, T];
  8: [T, T, T, T, T, T, T, T];
  9: [T, T, T, T, T, T, T, T, T];
  10: [T, T, T, T, T, T, T, T, T, T];
  11: [T, T, T, T, T, T, T, T, T, T, T];
  12: [T, T, T, T, T, T, T, T, T, T, T, T];
  13: [T, T, T, T, T, T, T, T, T, T, T, T, T];
  14: [T, T, T, T, T, T, T, T, T, T, T, T, T, T];
  15: [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T];
}

/**
 * Class containing a set of static utilities functions for arrays.
 */
export class ArrayTools {
  /**
   * Returns an array of the given size filled with elements built from the given constructor and the parameters.
   * @param size the number of element to construct and put in the array.
   * @param itemBuilder a callback responsible for creating new instance of item. Called once per array entry.
   * @returns a new array filled with new objects.
   */
  public static BuildArray<T>(size: number, itemBuilder: () => T): Array<T> {
    const a: T[] = [];
    for (let i = 0; i < size; ++i) {
      a.push(itemBuilder());
    }
    return a;
  }

  /**
   * Returns a tuple of the given size filled with elements built from the given constructor and the parameters.
   * @param size he number of element to construct and put in the tuple.
   * @param itemBuilder a callback responsible for creating new instance of item. Called once per tuple entry.
   * @returns a new tuple filled with new objects.
   */
  public static BuildTuple<T, N extends keyof TupleTypes<unknown>>(
    size: N,
    itemBuilder: () => T
  ): TupleTypes<T>[N] {
    return ArrayTools.BuildArray(size, itemBuilder) as TupleTypes<T>[N];
  }
}

// type Append<Elm, T extends unknown[]> = ((
//   arg: Elm,
//   ...rest: T
// ) => void) extends (...args: infer T2) => void
//   ? T2
//   : never;

// type Vector<N extends number, T> = VectorRec<N, T, [], []>;

// type VectorRec<Num, Elm, T extends unknown[], C extends unknown[]> = {
//   0: T;
//   1: VectorRec<Num, Elm, Append<Elm, T>, Append<unknown, C>>;
// }[C extends { length: Num } ? 0 : 1];

// export type Vector3 = Vector<3, number>;
