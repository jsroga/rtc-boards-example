export interface IListsState {
  [id: string] : {
    id: string,
    order: number,
  }
}

export default (state: IListsState | undefined, action: any): IListsState => {
  if (!state) {
    return {}
  }

  const { payload } = action

  return state
}
