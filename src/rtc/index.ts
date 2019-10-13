import { Connection, Op } from '@soundation/sharedb/lib/client'
import { handleOps } from './processor'
import { IState } from '../store/types/state';

class FakeSocket {
  get readyState() {
    if (!this.didInit) {
      this.fakeInit()
    }
    return 0
  }
  //@ts-ignore
  public onmessage: (msg: any) => any
  private didInit = false
  public static create() {
    return (new FakeSocket() as any) as WebSocket
  }

  public send(msg: any) {
    this.emitFakeMsg(this.fakeResponse(msg))
  }

  public emitFakeMsg(msg: any) {
    setTimeout(() => {
      if (this.onmessage) {
        this.onmessage({ data: JSON.stringify(msg) })
      }
    }, 0)
  }

  public close() {}

  private fakeResponse(msg: any) {
    const data = JSON.parse(msg)

    if (data.a === 's') {
      // subscribe
      return { ...data }
    } else if (data.a === 'op') {
      // operation
      return { a: data.a, c: data.c, d: data.d, seq: data.seq, v: data.v, src: 'abc' }
    }

    console.error('Unhandled fake message', msg)
    throw new Error('Unhandled fake message')
  }

  private fakeInit() {
    this.didInit = true
    this.emitFakeMsg({ a: 'init', id: 'abc', protocol: 1, type: 'http://sharejs.org/types/JSONv0' })
  }
}

const socket = FakeSocket.create()
const connection = new Connection(socket)

const doc = connection.get('project', '0')

doc.subscribe(() => {})

doc.on(
  'op',
  (ops: Op[], source: boolean): void => {
    handleOps(ops, source)
  }
)

export const undoManager = connection.createUndoManager({
  source: true,
  limit: 30,
  composeInterval: 100
})

export const pushOps = (ops: Op[], undoable = true) => {
  doc.submitOp(ops, {
    source: true,
    undoable
  })
}

export const createDoc = (content: IState): void => {
  try {
    // @ts-ignore
    doc.del()
  } catch (e) {}
  doc.create(content)
}
