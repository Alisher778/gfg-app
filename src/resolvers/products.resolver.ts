import { IProduct, IProductInput } from '../utils/interfaces';
import { readFromJson, writeToJson } from '../utils/jsonFileManager';
import { v4 as uuidv4 } from 'uuid';

export const getProductsResolver = async (
  args: GQL.IGetProductsOnQueryArguments
) => {
  try {
    const { ids = [] } = args;
    const data: IProduct[] = await readFromJson();

    if (ids && ids.length) {
      return data.filter(i => ids.includes(String(i.id)));
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createProductsResolver = async (product: IProductInput) => {
  try {
    const data: IProduct[] = await readFromJson();
    const newProduct: IProduct = {
      id: uuidv4(),
      ...product,
    };
    data.push(newProduct);
    await writeToJson(data);

    return newProduct;
  } catch (error: any) {
    throw new Error(error);
  }
};
