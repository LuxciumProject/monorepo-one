import { IUnbox } from '.';

/** IUnboxList extends IUnbox */
export interface IUnboxList<T> extends IUnbox<T[]> {
  /**
   * The `unbox` _methode_ lift out the value contained inside this functor.  \
   * By default the type `R` is of the same as the type `T` of the elements in the list.  \
   * But if changed to a diferent or unrelated type it will not be validated
   * therefor you should be carefull when changing `R`'s type the resulting
   * type lifted out will be of `R[]` _(or `T[]` by default)_.
   */
  unbox(): T[];
}
