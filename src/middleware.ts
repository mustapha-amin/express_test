import type { Request, Response } from "express";

function logger(req: Request, res: Response, next: Function) {
  console.log(`${req.method} ${req.url} at ${Date.now()}`);
  next();
}

function invalidRoute(_: Request, res: Response) {
  res.status(404).json({ "message": "invalid route"})
}


export { logger, invalidRoute }