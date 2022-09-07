// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    GetProducts: Array<IProduct | null> | null;
  }

  interface IGetProductsOnQueryArguments {
    ids?: Array<string | null> | null;
  }

  interface IProduct {
    __typename: 'Product';
    id: string | null;
    name: string | null;
    color: string | null;
    price: number | null;
    category_id: string | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    CreateProduct: IProduct | null;
    EditProduct: IProduct | null;
  }

  interface ICreateProductOnMutationArguments {
    payload?: ICreateProductRequest | null;
  }

  interface IEditProductOnMutationArguments {
    payload?: IProductInput | null;
    productId: string;
  }

  interface ICreateProductRequest {
    apiKey: string;
    name: string;
    color: string;
    price: number;
    category_id: string;
  }

  interface IProductInput {
    id?: string | null;
    name?: string | null;
    color?: string | null;
    price?: number | null;
    category_id?: string | null;
  }

  interface ICategory {
    __typename: 'Category';
    id: string | null;
    name: string | null;
  }

  interface IOrder {
    __typename: 'Order';
    id: string | null;
    status: OrderStatus | null;
    items: Array<number | null> | null;
  }

  const enum OrderStatus {
    CREATED = 'CREATED',
    READY_TO_SHIP = 'READY_TO_SHIP',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
  }

  interface IProductRequest {
    apiKey?: string | null;
    product?: IProductInput | null;
  }

  interface IGetProductsRequest {
    apiKey?: string | null;
    ids?: Array<string | null> | null;
  }

  interface ISearchProductsRequest {
    apiKey?: string | null;
    name?: string | null;
  }

  interface IEmptyRequest {
    apiKey?: string | null;
  }

  interface ICreateOrderRequest {
    apiKey?: string | null;
    items?: Array<number | null> | null;
  }

  interface IChangeOrderStatusRequest {
    apiKey?: string | null;
    order_id?: string | null;
    status?: OrderStatus | null;
  }
}

// tslint:enable
