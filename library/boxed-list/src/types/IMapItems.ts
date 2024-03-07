import { IUnbox } from './IUnbox';
import { IUnboxList } from './IUnboxList';

/** IMapItems extends IUnboxList, IUnbox */
export interface IMapItems<S> extends IUnboxList<S>, IUnbox<S[]> {
  mapItems<Q>(fn: (value: S) => Q): IMapItems<Q> & IUnboxList<Q> & IUnbox<Q[]>;
}
