import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let response = await fn(req, res, next);
      res.status(response.statusCode || 200).json(response).end();
    } catch (error: any) {
      console.error('Caught error in asyncHandler:', error);
      res.status(error.statusCode || 500).json(error).end();
      next(error);
    }
  };
};

export default asyncHandler;
