import { IListState } from '../store/reducers/lists';
import { IAddListOp, IRemoveListOp, IChangeListOrderOp } from './types/lists';

export const shareAddList = (list: IListState): IAddListOp[] => [{
  p: ["lists", list.id],
  oi: list
}]

export const shareRemoveList = (list: IListState): IRemoveListOp[] => [{
  p: ["lists", list.id],
  od: list
}]

export const shareChangeListOrder = (list: IListState, order: number): IChangeListOrderOp[] => [{
    p: ["lists", list.id, "order"],
  od: list.order,
  oi: order
}]