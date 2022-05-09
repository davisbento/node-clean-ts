import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';
import { NextFunction, Response } from 'express';

export const adaptRoute = (controller: IController) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const request: IHttpRequest = {
      body: req.body || {},
      params: req.params || {},
      query: req.query || {},
      userId: req?.userId || null
    };

    try {
      const httpResponse: IHttpResponse = await controller.handle(request);
      res.status(httpResponse.statusCode).json(httpResponse.data);
    } catch (err) {
      next(err);
    }
  };
};
