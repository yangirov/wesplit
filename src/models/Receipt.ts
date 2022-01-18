export interface Receipt {
  user: string,
  totalSum: number,
  date: string,
  retailPlace: string,
  retailPlaceAddress: string,
  items: ReceiptPurchase[]
}

export interface ReceiptPurchase {
  name: string,
  price: number,
  sum: number,
  quantity: number,
  selected: boolean
}
