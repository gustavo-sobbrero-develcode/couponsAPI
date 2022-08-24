import { ICoupon } from "../interfaces/coupon.interface";
import { model, Schema } from "mongoose";

const CouponSchema = new Schema({
  code: { type: String, required: [true, "Field is required"] },
  percentage: { type: Number, required: [true, "Field is required"] },
  restaurantId: { type: String, required: [true, "Field is required"] },
  restaurantName: { type: String, required: [true, "Field is required"] },
  userId: { type: String, required: [true, "Field is required"] },
  createdAt: { type: Date, required: [true, "Field is required"] },
});

export const Coupon = model<ICoupon>("Coupon", CouponSchema);
