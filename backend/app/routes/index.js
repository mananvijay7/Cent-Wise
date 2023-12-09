import express from 'express';
import userRouter from './userRoutes.js';
const router = express.Router();

router.get('/api', (req, res) => {
      console.log("Manan is here api router");
      if (req.isAuthenticated()) {
        return res.json({ isAuthenticated: true, user: req.user });
      } else {
        return res.json({ isAuthenticated: false, user: null });
      }
});
    

export default (app) => {
      app.use('/api/user', userRouter);
}