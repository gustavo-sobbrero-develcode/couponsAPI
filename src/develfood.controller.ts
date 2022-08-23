import { Request, Response, Router } from "express";

import { DevelfoodRepository } from "./repositories/develfood.repository";

export class DevelfoodController {
  public router = Router();

  constructor(private develfoodRepository: DevelfoodRepository) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").post(this.addCoupon);
    this.router.route("/all").get(this.findAllCoupons);
    this.router.route("/:id").delete(this.deleteCoupon).put(this.updateCoupon);
    this.router.route("/order").post(this.addOrder);
    this.router.route("/order/all").get(this.findAllOrders);
    this.router
      .route("/order/:userId/:restaurantId")
      .get(this.findUserOrdersByRestaurantId);
    this.router
      .route("/order/:id")
      .delete(this.deleteOrder)
      .put(this.updateOrder);
  }

  private findAllCoupons = async (_: Request, res: Response) => {
    try {
      const coupon = await this.develfoodRepository.findAll();
      res.send(coupon);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private addCoupon = async (req: Request, res: Response) => {
    try {
      const addCouponResult = await this.develfoodRepository.add(req.body);
      res.send(addCouponResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private deleteCoupon = async (req: Request, res: Response) => {
    try {
      const deleteCouponResult = await this.develfoodRepository.delete(
        req.params.id
      );
      res.send(deleteCouponResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private updateCoupon = async (req: Request, res: Response) => {
    try {
      const updateCouponResult = await this.develfoodRepository.update(
        req.params.id,
        req.body
      );
      res.send(updateCouponResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private findAllOrders = async (_: Request, res: Response) => {
    try {
      const order = await this.develfoodRepository.findAllOrders();
      res.send(order);
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
        await this.develfoodRepository.findUserOrdersByRestaurantId(
          req.params.userId,
          req.params.restaurantId
        );
      res.send(userOrdersResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private addOrder = async (req: Request, res: Response) => {
    try {
      const addOrderResult = await this.develfoodRepository.addOrder(req.body);
      res.send(addOrderResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private deleteOrder = async (req: Request, res: Response) => {
    try {
      const deleteOrderResult = await this.develfoodRepository.deleteOrder(
        req.params.id
      );
      res.send(deleteOrderResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private updateOrder = async (req: Request, res: Response) => {
    try {
      const updateOrderResult = await this.develfoodRepository.updateOrder(
        req.params.id,
        req.body
      );
      res.send(updateOrderResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };
}
