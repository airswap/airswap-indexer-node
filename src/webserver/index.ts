import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { OrderController } from '../controller/OrderController.js';
import { RootController } from './../controller/RootController.js';
import { PeersController } from './../controller/PeersController.js';

const router = express.Router();

export class Webserver {
  private port: number
  private orderController: OrderController;
  private peersController: PeersController;
  private rootController: RootController;

  constructor(port: number,
    orderController: OrderController,
    peersController: PeersController,
    rootController: RootController) {
    this.port = port;
    this.orderController = orderController;
    this.peersController = peersController;
    this.rootController = rootController;
  }

  run() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    router.route("/orders/:orderHash?")
      .get(this.orderController.getOrders)
      .post(this.orderController.addOrder)
      .delete(this.orderController.deleteOrder) // only available when debug mode is enabled
    router.route("/peers/:peerUrl?")
      .get(this.peersController.getPeers)
      .post(this.peersController.addPeers)
      .delete(this.peersController.removePeer)
    router.route("/")
      .get(this.rootController.get)

    app.use(router);

    app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  };
}
