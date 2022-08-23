import { Document } from "mongoose";

export interface IOrder extends Document {
  restaurantId: string;
  userId: string;
  createdAt: Date;
}
