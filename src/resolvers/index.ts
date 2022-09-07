import {
  IChangeOrderStatusInput,
  ICreateCategoryInput,
  ICreateOrderInput,
  IEditCategoryInput,
  IOrdersInput,
  IProductInput,
} from '../utils/interfaces';
import {
  createCategoryResolver,
  editCategoryResolver,
  getCategoriesResolver,
} from './categories.resolver';
import {
  changeOrderStatusResolver,
  createOrderResolver,
  getOrdersResolver,
} from './orders.resolver';
import {
  createProductResolver,
  editProductResolver,
  getProductsResolver,
  searchProductsResolver,
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
    SearchProducts(_, args: GQL.ISearchProductsOnQueryArguments) {
      return searchProductsResolver(args.name);
    },
    GetCategories(_, args: ICreateCategoryInput) {
      return getCategoriesResolver(args);
    },
    GetOrders(_, args: IOrdersInput) {
      return getOrdersResolver(args);
    },
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
    CreateOrder(_, args: { payload: ICreateOrderInput }) {
      console.log('----', args.payload);
      return createOrderResolver(args.payload);
    },
    ChangeOrderStatus(_, args: IChangeOrderStatusInput) {
      return changeOrderStatusResolver(args);
    },
    CreateCategory(_, args: ICreateCategoryInput) {
      return createCategoryResolver(args);
    },
    EditCategory(_, args: IEditCategoryInput) {
      return editCategoryResolver(args);
    },
  },
};
