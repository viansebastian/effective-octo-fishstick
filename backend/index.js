import express from 'express'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import trafficRouter from './routes.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); 

app.use('/', trafficRouter);

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Port: ${port}`));