type IOrderedBook = {
    bookId: string
    quantity: number
}

export type ICreateOrderRequest = {
    orderedBooks: IOrderedBook[]
}