import { ICoupon } from "../interfaces/coupon.interface";
import { IOrder } from "../interfaces/order.interface";
import { Coupon } from "../models/coupon.model";
import { Order } from "../models/order.model";

export class CouponsRepository {
  public findAll(): Promise<ICoupon[]> {
    return Coupon.find({}).exec();
  }

  public async findUserCoupons(userId: string): Promise<ICoupon[] | []> {
    const couponsByUserId: ICoupon[] | [] = await Coupon.find({
      userId: userId,
    }).exec();

    return couponsByUserId;
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

  public async findUserOrdersByRestaurantId(
    userId: string,
    restaurantId: string
  ): Promise<IOrder[] | []> {
    const ordersById: IOrder[] | [] = await Order.find({
      userId: userId,
      restaurantId: restaurantId,
    }).exec();

    return ordersById;
  }

  public async createLoyaltyCoupon(
    userId: string,
    restaurantId: string,
    restaurantName: string,
    code: string
  ): Promise<IOrder[] | []> {
    const ordersById: IOrder[] | [] = await Order.find({
      userId: userId,
      restaurantId: restaurantId,
    }).exec();
    if (ordersById.length > 0 && ordersById.length % 3 === 0) {
      this.add({
        percentage: Math.floor(Math.random() * 100),
        userId: userId,
        restaurantId: restaurantId,
        restaurantName: restaurantName,
        code: code,
        createdAt: new Date(),
      });
    }
    return ordersById;
  }
}
