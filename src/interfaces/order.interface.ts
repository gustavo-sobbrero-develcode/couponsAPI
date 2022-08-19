import { Document } from "mongoose";

export interface IOrder extends Document {
  counter: number;
  restaurantId: string;
  userId: string;
  createdAt: Date;
}
