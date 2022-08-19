import { Document } from "mongoose";

export interface ICoupon extends Document {
  percentage: number;
  restaurantId: string;
  restaurantName: string;
  userId: string;
  createdAt: Date;
}
