import express from 'express';
import { prioritizer } from './controllers.js';

const trafficRouter = express.Router();

trafficRouter.get('/traffic', prioritizer);

export default trafficRouter;