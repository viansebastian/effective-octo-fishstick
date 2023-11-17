import express from 'express';
import { imageProcess } from './controllers.js';

const trafficRouter = express.Router();

trafficRouter.post('/traffic', imageProcess);

export default trafficRouter;