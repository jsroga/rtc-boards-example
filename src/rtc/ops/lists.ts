import {
 ObjectReplaceOp,
 Op,
 ObjectInsertOp,
 ObjectDeleteOp
} from "@soundation/sharedb/lib/client";
import { isObjectReplaceOp, isObjectInsertOp, isObjectDeleteOp } from "./op";
import { IListState } from "../../store/reducers/lists";

export interface IAddListOp extends ObjectInsertOp {
 p: ["lists", string];
 oi: IListState;
}

export const isAddListOp = (op: Op): op is IAddListOp =>
 isObjectInsertOp(op) && op.p.length === 2 && op.p[0] === "lists";

export interface IRemoveListOp extends ObjectDeleteOp {
 p: ["lists", string];
 od: IListState;
}

export const isRemoveListOp = (op: Op): op is IRemoveListOp =>
 isObjectDeleteOp(op) && op.p.length === 1 && op.p[0] === "lists";

export interface IChangeListOrderOp extends ObjectReplaceOp {
 p: ["lists", string, "order"];
 oi: number;
 od: number;
}

export const isChangeListOrderOp = (op: Op): op is IChangeListOrderOp =>
 isObjectReplaceOp(op) && op.p.length === 3 && op.p[2] === "order";
