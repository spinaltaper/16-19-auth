'use strict';

import express from 'express';
import mongoose from 'mongoose';
import logger from './logger';
import authRoutes from '../route/auth-router';
import profileRoutes from '../route/profile-route';
import loggerMiddleware from './logger-middleware';
import errorMiddleware from './error-middleware';
import { WSAELOOP } from 'constants';

const app=express();
let server=null;

app.use(loggerMiddleware);
app.use(authRoutes);
app.use(profileRoutes);

app.all('*',(request,response)=>{
    logger.log(logger.INFO,'Returning 404 from catch all route');
    return response.sendStatus(404);
});

app.use(errorMiddleware);

const startServer=()=>{
    return mongoose.connect(process.env.MONGOFB_URI)
    .then(()=>{
        server=app.listen(process.env.PORT,()=>{
            logger.log(logger.INFO,`Server is listening on port ${process.env.PORT}`);
        });
    });
};

const stopServer={}=>{
    return mongoose.disconnect()
    .then(()=>{
        server.close(()=>{
            logger.log(logger.INFO,'Server is off');
        });
    });
};

export {startServer,stopServer};