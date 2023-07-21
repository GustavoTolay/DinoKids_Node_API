import { Response } from "express";

export function handleError(error: unknown, res: Response) {
  let errorMessage = "unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.log(errorMessage);
  return res.status(500).send(errorMessage);
}