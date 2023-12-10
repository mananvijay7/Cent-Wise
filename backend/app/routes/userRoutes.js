import express from 'express';
import passport from 'passport';
import * as userController from '../controllers/userControllers.js';
const router = express.Router();

router.get('/signin', userController.signin);
router.post('/create-session', passport.authenticate(
      'local',
      {failureRedirect: '/user/signin'}, 
  ), userController.createSession);

  router.post('/localLogin', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'}, 
), userController.localLogin);

router.post('/create', userController.create);

router.get('/signout', userController.sessionDestroy);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/api/user/signin'}), userController.createSession);

export default router;