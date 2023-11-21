import express from "express";                  //importing express
import * as expenseController from "../controllers/expense-controller.js";          //importing controller

const router = express.Router();          //initialzing router object

router.route('/')             //defining path and it's http methods
      .post(expenseController.post);

router.route('/:id')          //Path with specific ID to perform some HTTP request specfic to expense ID
      .get(expenseController.get)
      .put(expenseController.updateAll)
      .patch(expenseController.update)
      .delete(expenseController.deleteExpense);

export default router;