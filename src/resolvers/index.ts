import { IProductInput } from '../utils/interfaces';
import {
  createProductResolver,
  editProductResolver,
  getProductsResolver,
} from './products.resolver';

interface ResolverMap {
  [key: string]: {
    [key: string]: (parent: any, args: any, context: any, info: any) => any;
  };
}

export const RootResolvers: ResolverMap = {
  Query: {
    GetProducts(_, args: GQL.IGetProductsOnQueryArguments) {
      return getProductsResolver(args || []);
    },
    // SearchProducts(payload: SearchProductsRequest): ProductStreamResponse
    // GetCategories(payload: EmptyRequest): Category
    // GetOrders(payload: EmptyRequest): Order
  },
  Mutation: {
    CreateProduct(_, args: { payload: IProductInput }) {
      return createProductResolver(args.payload);
    },
    EditProduct(
      _,
      args: { payload: GQL.IEditProductOnMutationArguments; productId: string }
    ) {
      return editProductResolver(args);
    },
    // EditProduct(payload: ProductRequest): Product
    // CreateOrder(payload: CreateOrderRequest): Order
    // ChangeOrderStatus(payload: ChangeOrderStatusRequest): Order
  },
};
