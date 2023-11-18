import express from 'express';
import { imageProcess, tes } from './controllers.js';

const trafficRouter = express.Router();

trafficRouter.post('/traffic', imageProcess);
trafficRouter.get('/', tes);

export default trafficRouter;