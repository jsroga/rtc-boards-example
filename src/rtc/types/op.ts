import {
  ObjectDeleteOp,
  ObjectInsertOp,
  ObjectReplaceOp,
  ListReplaceOp,
  Op,
  ListInsertOp,
  ListDeleteOp
} from '@soundation/sharedb/lib/client'

export const isObjectReplaceOp = (op: Op): op is ObjectReplaceOp => {
  return typeof (op as ObjectReplaceOp).od !== 'undefined' && typeof (op as ObjectReplaceOp).oi !== 'undefined'
}

export const isObjectInsertOp = (op: Op): op is ObjectInsertOp => {
  return typeof (op as ObjectReplaceOp).od === 'undefined' && typeof (op as ObjectReplaceOp).oi !== 'undefined'
}

export const isObjectDeleteOp = (op: Op): op is ObjectDeleteOp => {
  return typeof (op as ObjectReplaceOp).od !== 'undefined' && typeof (op as ObjectReplaceOp).oi === 'undefined'
}

export const isListReplaceOp = (op: Op): op is ListReplaceOp => {
  return typeof (op as ListReplaceOp).ld !== 'undefined' && typeof (op as ListReplaceOp).li !== 'undefined'
}

export const isListAddOp = (op: Op): op is ListInsertOp => {
  return typeof (op as ListInsertOp).li !== 'undefined' && typeof (op as ListDeleteOp).ld === 'undefined'
}

export const isListDeleteOp = (op: Op): op is ListDeleteOp => {
  return typeof (op as ListDeleteOp).ld !== 'undefined' && typeof (op as ListInsertOp).li === 'undefined'
}
