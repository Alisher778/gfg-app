import { IProduct } from '../utils/interfaces';
import { readJson } from '../utils/jsonFileManager';

export const getProductsResolver = async(args: GQL.IGetProductsOnQueryArguments) => {
  try {
    const {ids = []} = args;
    const data: IProduct[] = await readJson();

    if(ids && ids.length) {
      return data.filter(i => ids.includes(String(i.id)))
    }

    return data;
  } catch (error:any) {
    throw new Error(error);
  }
};