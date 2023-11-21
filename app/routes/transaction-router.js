import express from "express";
import * as transactionController from "../controllers/transaction-controller.js";

const router = express.Router();

router.route('/')
    .get(transactionController.findByParams) //invokes when http req is GET (Find By Parameters)
    .post(transactionController.post); //invokes when http req is POST

router.route('/:id')
    .get(transactionController.findById) //invokes when http req is GET (Find By ID)
    .put(transactionController.put) //invokes when http req is PUT
    .delete(transactionController.remove) //invokes when http req is DELETE
    .patch(transactionController.patch);


export default router;