'use strict';

import HttpError from 'http-errors';
import jsonWebToken from 'jsonwebtoken';
import Account from '../model/account';

const promisify=callbackStyleFunction => (...args)=>{
    return new Promise((resolve,reject)=>{
        callbackStyleFunction(...args,(error,data)=>{
            if(error){
                return reject(error);
            }
            return resolve(data);
        });
    });
};
export default (request,response,next)=>{
    if(!request.headers.authorization){
        return next(new HttpError(400,'AUTH-invalid request'));
    }
    const token=request.headers.authorization.split('Bearer ')[i];

    if(!token){
        return next(new HttpError(400,'AUTH - invalid request'));
    }

    return promisify(jsonWebToken.verify)(token,process.env.GROOVESHARK_SECRET)
    .catch((error)=>{
        return Promise.reject(new HttpError(400,`AUTH-jsonWebToken Error ${error}`));
    })
    .then((account)=>{
        if (!account){
            return next(new HttpError(400,'AUTH-invalid request'));
        }
        request.account=account;
        return next();
    })
    .catch(next);
}