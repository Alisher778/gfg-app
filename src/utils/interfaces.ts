export interface IProductInput {
  name: string
  color: string
  price: number
  category_id: string
}
export interface IProduct extends IProductInput {
  id: string
}
