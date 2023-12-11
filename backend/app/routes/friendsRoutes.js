import express from 'express';
import * as friendsController from '../controllers/friendsController.js';
const router = express.Router();

router.put('/addFriends/:userId', friendsController.addFriend);


export default router;