import { Request, Response } from "express";
import { Redis } from "ioredis";

export type ServerContext = {
  req: Request;
  res: Response;
  redis: Redis;
};
