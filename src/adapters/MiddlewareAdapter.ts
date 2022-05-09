import { IMiddleware } from '@/interfaces/IMiddleware';
import { NextFunction, Request, Response } from 'express';

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : ''
    };
    const httpResponse = await middleware.handle(request);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, { userId: httpResponse.data });
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.data.message
      });
    }
  };
};
