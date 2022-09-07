import {
  ICategory,
  ICreateCategoryInput,
  IEditCategoryInput,
} from '../utils/interfaces';
import { readFromJson, writeToJson } from '../utils/jsonFileManager';
import { v4 as uuidv4 } from 'uuid';

export const getCategoriesResolver = async (args: ICreateCategoryInput) => {
  try {
    const { name } = args;
    const data: ICategory[] = await readFromJson({ db: 'CATEGORIES' });

    if (name && name.length) {
      return data.filter(i =>
        i.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createCategoryResolver = async (order: ICreateCategoryInput) => {
  try {
    const { name } = order;

    if (!name.length) {
      throw new Error('Please add category name');
    }

    const data: ICategory[] = await readFromJson({ db: 'CATEGORIES' });
    const categoryNameExist = data.find(
      i => i.name?.toLowerCase() == name?.toLowerCase()
    );
    if (categoryNameExist) {
      throw new Error(`Category ${name} is already exist`);
    }

    const newCategory: ICategory = {
      id: uuidv4(),
      name,
    };

    data.push(newCategory);
    await writeToJson({ db: 'CATEGORIES', data });

    return newCategory;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const editCategoryResolver = async (args: IEditCategoryInput) => {
  try {
    const { categoryId, name } = args;
    const data: ICategory[] = await readFromJson({ db: 'CATEGORIES' });

    const findOrder = data.find(i => i.id == categoryId);
    if (!findOrder) {
      throw new Error(`Category not found with the name: ${name}`);
    }

    const categoryNameExist = data.find(
      i => i.name?.toLowerCase() == name?.toLowerCase() && i.id != categoryId
    );

    if (categoryNameExist) {
      throw new Error(`Category ${name} is already exist`);
    }

    const editedOrder: ICategory = {
      ...findOrder,
      name,
    };

    const updatedList = data.map(category => {
      if (category.id == categoryId) {
        return editedOrder;
      }
      return category;
    });

    await writeToJson({ db: 'CATEGORIES', data: updatedList });

    return editedOrder;
  } catch (error: any) {
    throw new Error(error);
  }
};

function isCategoryExist({ categories, name }) {
  const categoryNameExist = categories.find(
    i => i.name?.toLowerCase() == name?.toLowerCase()
  );
  if (categoryNameExist) {
    throw new Error(`Category ${name} is already exist`);
  }
}
