import { Request, Response } from 'express';

export const serverInfoControllerHandler = (req: Request, res: Response) => {
  const response = {
    version: process.env.APP_VERSION || "0.1.0",
    date: new Date().getTime(),
    service: "Block Indexer"
  }
  res.status(200).send(response);
};
