import { NextFunction, Request, Response } from 'express';

export const validateResource = (resourceSchema: any) => async (req: Request, res: Response, next: NextFunction) => {
  const resource = req.body;
  try {
    await resourceSchema.validate(resource);
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors.join(', ') });
  }
};
