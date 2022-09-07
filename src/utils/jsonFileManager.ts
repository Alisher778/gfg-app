import jsonfile from 'jsonfile';
import path from 'path';
import { IJsonReadFileProps, IJsonWriteFileProps } from './interfaces';

const DB = {
  PRODUCTS: path.join(__dirname, '../db/products.json'),
  ORDERS: path.join(__dirname, '../db/orders.json'),
  CATEGORIES: path.join(__dirname, '../db/categories.json'),
};

export const readFromJson = async ({ db = 'PRODUCTS' }: IJsonReadFileProps) => {
  try {
    const file = await jsonfile.readFile(DB[db], 'utf8');
    return file;
  } catch (error) {
    return error;
  }
};

export const writeToJson = async ({
  db = 'PRODUCTS',
  data,
}: IJsonWriteFileProps) => {
  try {
    const file = await jsonfile.writeFile(DB[db], data, { spaces: 2 });
    return file;
  } catch (error) {
    return error;
  }
};
