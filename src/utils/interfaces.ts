export interface IProductInput {
  name: string;
  color: string;
  price: number;
  category_id: string;
}
export interface IProduct extends IProductInput {
  id: string;
}

export interface IOrderInput {
  status: EOrderStatus;
  items: string[];
}

export interface IOrder {
  id: string;
  status: EOrderStatus;
  items: string[] | IProduct[];
}

export interface IChangeOrderStatusInput {
  order_id: string;
  status: EOrderStatus;
}

export interface IOrdersInput {
  orderIds: string[];
}
export interface ICreateOrderInput {
  items: string[];
}

export enum EOrderStatus {
  CREATED = 'CREATED',
  READY_TO_SHIP = 'READY_TO_SHIP',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}
