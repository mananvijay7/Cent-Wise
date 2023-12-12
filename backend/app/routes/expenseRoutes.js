import express from 'express';
import * as expenseController from '../controllers/expenseController.js';
const router = express.Router();

router.post('/addExpense', expenseController.addExpense);
router.get('/FriendData', expenseController.fetchFriend);
router.get('/GroupData', expenseController.fetchGroup);


export default router; 