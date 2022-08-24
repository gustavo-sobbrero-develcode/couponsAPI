import { Request, Response, Router } from "express";

import { CouponsRepository } from "../repositories/coupons.repository";

export class CouponsController {
  public router = Router();

  constructor(private couponsRepository: CouponsRepository) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").post(this.addCoupon);
    this.router.route("/all").get(this.findAllCoupons);
    this.router.route("/:userId").get(this.findUserCoupons);
    this.router.route("/:id").delete(this.deleteCoupon).put(this.updateCoupon);
    this.router
      .route("/order/:userId/:restaurantId")
      .get(this.findUserOrdersByRestaurantId);
    this.router
      .route("/order/:userId/:restaurantId/:restaurantName/:code")
      .get(this.createLoyaltyCoupon);
  }

  private findAllCoupons = async (_: Request, res: Response) => {
    try {
      const coupon = await this.couponsRepository.findAll();
      res.send(coupon);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private findUserCoupons = async (req: Request, res: Response) => {
    try {
      const userCouponsResult = await this.couponsRepository.findUserCoupons(
        req.params.userId
      );
      res.send(userCouponsResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private addCoupon = async (req: Request, res: Response) => {
    try {
      const addCouponResult = await this.couponsRepository.add(req.body);
      res.send(addCouponResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private deleteCoupon = async (req: Request, res: Response) => {
    try {
      const deleteCouponResult = await this.couponsRepository.delete(
        req.params.id
      );
      res.send(deleteCouponResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private updateCoupon = async (req: Request, res: Response) => {
    try {
      const updateCouponResult = await this.couponsRepository.update(
        req.params.id,
        req.body
      );
      res.send(updateCouponResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private findUserOrdersByRestaurantId = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userOrdersResult =
        await this.couponsRepository.findUserOrdersByRestaurantId(
          req.params.userId,
          req.params.restaurantId
        );
      res.send(userOrdersResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private createLoyaltyCoupon = async (req: Request, res: Response) => {
    try {
      const userOrdersResult = await this.couponsRepository.createLoyaltyCoupon(
        req.params.userId,
        req.params.restaurantId,
        req.params.restaurantName,
        req.params.code
      );
      res.send(userOrdersResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };
}
