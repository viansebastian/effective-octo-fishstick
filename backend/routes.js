import express from 'express';
import { imageProcessUpload, imageProcessURL, tes } from './controllers.js';

const trafficRouter = express.Router();

// trafficRouter.post('/traffic-upload', imageProcessUpload);
trafficRouter.post('/traffic-url', imageProcessURL);

trafficRouter.get('/', tes);

export default trafficRouter;