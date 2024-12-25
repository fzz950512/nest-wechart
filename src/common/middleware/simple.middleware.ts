import { NextFunction, Request, Response } from "express";

export function SimpleMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Simple Middleware', req.body);
  next();
}