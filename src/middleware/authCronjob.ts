import { OPS_TOKEN } from '@/config/settings';
import { NextFunction, Request, Response } from 'express';

export const checkTokenCronJob = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : '';

  if (!token) {
    return res.status(403).json({
      error: 'Invalid token'
    });
  }

  if (token !== OPS_TOKEN) {
    return res.status(403).json({
      error: 'Invalid token'
    });
  }

  next();
};
