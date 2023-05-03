import express , { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
// import routes from '/routes';
const app : Express = express();

//set security HTTP headers
app.use(helmet());

// set cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(express.urlencoded({ extended : true}));

// api routes
// app.use('/v1', routes);


export default app;