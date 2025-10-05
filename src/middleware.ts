import type { Request, Response } from "express";

function logger(req:Request, res:Response, next: Function) {
  console.log(`${req.method} ${req.url}`);
  next(); 
}

export default logger