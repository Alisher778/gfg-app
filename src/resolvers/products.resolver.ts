import { IProduct, IProductInput } from '../utils/interfaces';
import { readFromJson, writeToJson } from '../utils/jsonFileManager';
import { v4 as uuidv4 } from 'uuid';

export const getProductsResolver = async (
  args: GQL.IGetProductsOnQueryArguments
) => {
  try {
    const { ids = [] } = args;
    const data: IProduct[] = await readFromJson({ db: 'PRODUCTS' });

    if (ids && ids.length) {
      return data.filter(i => ids.includes(String(i.id)));
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const searchProductsResolver = async (name: string) => {
  try {
    const data: IProduct[] = await readFromJson({ db: 'PRODUCTS' });

    if (!name.trim()) {
      throw new Error(`Product not found with the name: ${name}`);
    }

    return data.filter(i => i.name.toLowerCase().includes(name.toLowerCase()));
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createProductResolver = async (product: IProductInput) => {
  try {
    const data: IProduct[] = await readFromJson({ db: 'PRODUCTS' });
    const newProduct: IProduct = {
      id: uuidv4(),
      ...product,
    };
    data.push(newProduct);
    await writeToJson({ db: 'PRODUCTS', data });

    return newProduct;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const editProductResolver = async (args: {
  payload: GQL.IEditProductOnMutationArguments;
  productId: string;
}) => {
  try {
    const { productId, payload } = args;
    const data: IProduct[] = await readFromJson({ db: 'PRODUCTS' });

    const findProduct = data.find(i => i.id == productId);
    if (!findProduct) {
      throw new Error(`Product not found with the id: ${productId}`);
    }

    const editedProduct: IProduct = {
      ...findProduct,
      ...payload,
    };

    const updatedList = data.map(product => {
      if (product.id == productId) {
        return editedProduct;
      }
      return product;
    });

    await writeToJson({ db: 'PRODUCTS', data: updatedList });

    return editedProduct;
  } catch (error: any) {
    throw new Error(error);
  }
};
