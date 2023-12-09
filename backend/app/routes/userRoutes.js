import express from 'express';
import passport from 'passport';
import * as userController from '../controllers/userControllers.js';
const router = express.Router();

router.get('/signin', userController.signin);
router.post('/signup', userController.create);
router.post('/create-session', passport.authenticate(
      'local',
      {failureRedirect: '/api/user/signin'}, 
  ), userController.createSession);

//router.get('/dashboard', userController.showDashboard);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/api/user/signin'}), userController.createSession);

export default router;
