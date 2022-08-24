import { Document } from "mongoose";

export interface ICoupon {
  code: string;
  percentage: number;
  restaurantId: string;
  restaurantName: string;
  userId: string;
  createdAt: Date;
}
