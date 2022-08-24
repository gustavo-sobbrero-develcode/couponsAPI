import { Router, Request, Response } from "express";
import { OrdersRepository } from "../repositories/orders.repository";

export class OrdersController {
  public router = Router();

  constructor(private ordersRepository: OrdersRepository) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/order").post(this.addOrder);
    this.router.route("/order/all").get(this.findAllOrders);
    
    this.router
      .route("/order/:id")
      .delete(this.deleteOrder)
      .put(this.updateOrder);
  }

  private findAllOrders = async (_: Request, res: Response) => {
    try {
      const order = await this.ordersRepository.findAllOrders();
      res.send(order);
    } catch (e) {
      res.status(500).send(e);
    }
  };


  private addOrder = async (req: Request, res: Response) => {
    try {
      const addOrderResult = await this.ordersRepository.addOrder(req.body);
      res.send(addOrderResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private deleteOrder = async (req: Request, res: Response) => {
    try {
      const deleteOrderResult = await this.ordersRepository.deleteOrder(
        req.params.id
      );
      res.send(deleteOrderResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  private updateOrder = async (req: Request, res: Response) => {
    try {
      const updateOrderResult = await this.ordersRepository.updateOrder(
        req.params.id,
        req.body
      );
      res.send(updateOrderResult);
    } catch (e) {
      res.status(500).send(e);
    }
  };
}
