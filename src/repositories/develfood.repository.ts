import { ICoupon } from "../interfaces/coupon.interface";
import { Coupon } from "../models/coupon.model";
import { IOrder } from "../interfaces/order.interface";
import { Order } from "../models/order.model";

export class DevelfoodRepository {
  public findAll(): Promise<ICoupon[]> {
    return Coupon.find({}).exec();
  }

  public add(coupon: ICoupon): Promise<ICoupon> {
    const newCoupon = new Coupon(coupon);
    return newCoupon.save();
  }

  public async delete(id: string) {
    const deletedCoupon: ICoupon | null = await Coupon.findByIdAndDelete(
      id
    ).exec();
    if (!deletedCoupon) {
      throw new Error(`Coupon with id ${id} not found`);
    }
    return deletedCoupon;
  }

  public async update(id: string, coupon: ICoupon) {
    const updatedCoupon: ICoupon | null = await Coupon.findByIdAndUpdate(
      id,
      coupon
    ).exec();

    if (!updatedCoupon) {
      throw new Error(`Coupon with id '${id}' not found`);
    }
    return updatedCoupon;
  }

  public findAllOrders(): Promise<IOrder[]> {
    return Order.find({}).exec();
  }

  public async findUserOrdersByRestaurantId(
    userId: string,
    restaurantId: string
  ): Promise<IOrder[] | []> {
    const ordersById: IOrder[] | [] = await Order.find(
      {
        userId: userId,
        restaurantId: restaurantId,
      },
      (error: Error, data: IOrder[]) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
      }
    ).exec();

    return ordersById;
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
