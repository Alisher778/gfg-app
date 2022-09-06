import jsonfile from 'jsonfile';
import path from 'path';

const DB = {
  PRODUCTS: path.join(__dirname, '../db/products.json')
};

export const readJson =  async () => {
  try {
    const file = await jsonfile.readFile(DB.PRODUCTS,"utf8");
    return file;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return error;
  }
}

