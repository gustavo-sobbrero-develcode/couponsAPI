import { IOrder } from "../interfaces/order.interface";
import { model, Schema } from "mongoose";

const OrderSchema = new Schema({
  restaurantId: { type: String, required: [true, "Field is required"] },
  userId: { type: String, required: [true, "Field is required"] },
  createdAt: { type: Date, required: [true, "Field is required"] },
});

export const Order = model<IOrder>("Order", OrderSchema);
