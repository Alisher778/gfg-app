import jsonfile from 'jsonfile';
import path from 'path';

const DB = {
  PRODUCTS: path.join(__dirname, '../db/products.json'),
  ORDERS: path.join(__dirname, '../db/orders.json'),
  CATEGORIES: path.join(__dirname, '../db/categories.json'),
};

type TDbNames = 'PRODUCTS' | 'ORDERS' | 'CATEGORIES';

export const readFromJson = async ({ db = 'PRODUCTS' }: { db?: TDbNames }) => {
  try {
    const file = await jsonfile.readFile(DB[db], 'utf8');
    return file;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return error;
  }
};

export const writeToJson = async ({
  db = 'PRODUCTS',
  data,
}: {
  db?: TDbNames;
  data: any;
}) => {
  try {
    console.log(DB[db]);
    const file = await jsonfile.writeFile(DB[db], data, { spaces: 2 });
    return file;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return error;
  }
};
