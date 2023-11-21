
//This file contains all the routes file
import userRouter from "./user-router.js";
import expenseRouter from "./expense-router.js";
import groupRouter from "./group-router.js";

export default (app) => {
    app.use("/users", userRouter);
    app.use("/expense", expenseRouter);
    app.use("/group",groupRouter);
}