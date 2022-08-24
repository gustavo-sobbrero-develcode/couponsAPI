import { IOrder } from "../interfaces/order.interface";
import { Order } from "../models/order.model";

export class OrdersRepository {
  public findAllOrders(): Promise<IOrder[]> {
    return Order.find({}).exec();
  }



  public addOrder(order: IOrder): Promise<IOrder> {
    const newOrder = new Order(order);
    return newOrder.save();
  }

  public async deleteOrder(id: string) {
    const deletedOrder: IOrder | null = await Order.findByIdAndDelete(
      id
    ).exec();
    if (!deletedOrder) {
      throw new Error(`Order with id ${id} not found`);
    }
    return deletedOrder;
  }

  public async updateOrder(id: string, order: IOrder) {
    const updatedOrder: IOrder | null = await Order.findByIdAndUpdate(
      id,
      order
    ).exec();

    if (!updatedOrder) {
      throw new Error(`Order with id '${id}' not found`);
    }
    return updatedOrder;
  }
}
