import express from "express";
import { HttpError } from "./error";
import { HttpStatus } from "../configs/httpCodes";

/**
 * @description Handles express errors
 * - If the error is an instance of HttpError, it will return the error message and status code (default: 500). If the error has a payload, it will be returned as well
 * - Any other error will be logged in db and running logs and a generic error message will be returned
 * - If the error is a mongoose error, it will attempt to Normalize the error and return the appropriate status code and message. Ex: 110000 Conflict
 * - else it will return a 500 status code and a generic message
 * @param {express.Application} app - express app
 * @returns {express.Application} express app with error handler (To be chained with createExpressServer)
 */
export function handleExpressError(
  app: express.Application
): express.Application {
  app.use(
    async (
      err: {
        code: number;
        errors: Record<string, unknown>;
      } & Error,
      req: express.Request,
      res: express.Response<Record<string, unknown>>,
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      _next: express.NextFunction
    ) => {
      if (err instanceof HttpError) {
        return res
          .status(err.status)
          .json({ message: err.message, error: true, ...err.payload });
      } else {
        const ip =
          req.headers["fastly-client-ip"] ||
          req.headers["x-forwarded-for"] ||
          req.ip;
        const errorObj = {
          ip,
          errorName: err.name,
          message: err.message,
          code: err.code,
          // stack: err.stack || "no stack defined",
        };
        console.error(errorObj);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorObj);
      }
    }
  );
  return app;
}
