import { Request, Response, Router } from "express";

import { DevelfoodService } from "./services/develfood.service";

export class DevelfoodController {
  public router = Router();

  constructor(private develfoodService: DevelfoodService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").post(this.addCoupon);
    this.router.route("/all").get(this.findAllCoupons);
    this.router.route("/:id").delete(this.deleteCoupon).put(this.updateCoupon);
    this.router.route("/order").post(this.addOrder);
    this.router.route("/order/all").get(this.findAllOrders);
    this.router.route("/order/:id").delete(this.deleteOrder).put(this.updateOrder);
  }

  private findAllCoupons = async (_: Request, res: Response) => {
    try {
      const coupon = await this.develfoodService.findAll();
      res.send(coupon);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private addCoupon = async (req: Request, res: Response) => {
    try {
      const addCouponResult = await this.develfoodService.add(req.body);
      res.send(addCouponResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private deleteCoupon = async (req: Request, res: Response) => {
    try {
      const deleteCouponResult = await this.develfoodService.delete(
        req.params.id
      );
      res.send(deleteCouponResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private updateCoupon = async (req: Request, res: Response) => {
    try {
      const updateCouponResult = await this.develfoodService.update(
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
      const order = await this.develfoodService.findAllOrders();
      res.send(order);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private addOrder = async (req: Request, res: Response) => {
    try {
      const addOrderResult = await this.develfoodService.addOrder(req.body);
      res.send(addOrderResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private deleteOrder = async (req: Request, res: Response) => {
    try {
      const deleteOrderResult = await this.develfoodService.deleteOrder(
        req.params.id
      );
      res.send(deleteOrderResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private updateOrder = async (req: Request, res: Response) => {
    try {
      const updateOrderResult = await this.develfoodService.updateOrder(
        req.params.id,
        req.body
      );
      res.send(updateOrderResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };
}
