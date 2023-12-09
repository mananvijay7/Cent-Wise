import express from 'express';
import passport from 'passport';
import * as dashboardController from '../controllers/dashboardController';
const router = express.router();

router.get('/', dashboardController.fetchAllData);
