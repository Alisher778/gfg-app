import {
  EOrderStatus,
  IChangeOrderStatusInput,
  ICreateOrderInput,
  IOrder,
  IOrdersInput,
  IProduct,
} from '../utils/interfaces';
import { readFromJson, writeToJson } from '../utils/jsonFileManager';
import { v4 as uuidv4 } from 'uuid';

export const getOrdersResolver = async (args: IOrdersInput) => {
  try {
    const { orderIds } = args;
    const data: IProduct[] = await readFromJson({ db: 'ORDERS' });

    if (orderIds && orderIds.length) {
      return data.filter(i => orderIds.includes(String(i.id)));
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createOrderResolver = async (order: ICreateOrderInput) => {
  try {
    const { items } = order;
    if (!items.length) {
      throw new Error('Please add one or more products');
    }

    const data: IOrder[] = await readFromJson({ db: 'ORDERS' });
    const newOrder: IOrder = {
      id: uuidv4(),
      status: EOrderStatus.CREATED,
      items,
    };

    data.push(newOrder);
    await writeToJson({ db: 'ORDERS', data });

    return newOrder;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const changeOrderStatusResolver = async (
  args: IChangeOrderStatusInput
) => {
  try {
    const { status, order_id } = args;
    const data: IOrder[] = await readFromJson({ db: 'ORDERS' });

    const findOrder = data.find(i => i.id == order_id);
    if (!findOrder) {
      throw new Error(`Order not found with the id: ${order_id}`);
    }

    const editedOrder: IOrder = {
      ...findOrder,
      status,
    };

    const updatedList = data.map(order => {
      if (order.id == order_id) {
        return editedOrder;
      }
      return order;
    });

    await writeToJson({ db: 'ORDERS', data: updatedList });

    return editedOrder;
  } catch (error: any) {
    throw new Error(error);
  }
};
