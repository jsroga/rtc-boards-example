export interface ICardsState {
  [id: string] : {
    id: string,
    order: number,
    list: string,
    content: string
  }
}

export default (state: ICardsState | undefined, action: any): ICardsState => {
  if (!state) {
    return {}
  }

  const { payload } = action

  return state
}
